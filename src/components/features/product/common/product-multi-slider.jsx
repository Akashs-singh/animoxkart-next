'use client';

import React, {Component} from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import Link from 'next/link'

import {getImage} from './../../../common/utils'

class ProductMultiSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }

    
    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render (){
        const {items, symbol, NoOfProducts} = this.props;

        var arrays = [];
        while (items.length > 0) {
            arrays.push(items.splice(0, NoOfProducts));
        }

        return (
                {this.state.isMounted && (
                            <Slider className="offer-slider slide-1">
                    {arrays.map((products, index) =>
                        <div key={index}>
                            {products.map((product, i) =>
                                <div className="media" key={i}>
                                    <Link href="/view/product/${product.id}">
                                        <img className="img-fluid" src={
                                            product.variants?
                                                getImage(product.variants[0].images)
                                                :getImage(product.images)
                                        } alt="" />
                                    </Link>
                                    <div className="media-body align-self-center">
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <Link href="/view/product/${product.id}"><h6>{product.displayName}</h6></Link>
                                        <h4>{symbol}{product.price}
                                            <del><span className="money">{symbol}{product.mrpPrice}</span></del></h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Slider>
                            )}
        )
    }
}

export default ProductMultiSlider;
