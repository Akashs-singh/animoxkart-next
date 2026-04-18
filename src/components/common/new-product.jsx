'use client';

import React, {Component} from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import {connect} from 'react-redux';
import Link from 'next/link'

import {getBestSeller} from "../../services";
import {getImage} from './utils'

class NewProduct extends Component {
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
        const {items, symbol} = this.props;

        var arrays = [];
        while (items.length > 0) {
            arrays.push(items.splice(0, 3));
        }

        return (
            <div className="theme-card">
                <h5 className="title-border">new product</h5>
                {this.state.isMounted && (
                            <Slider className="offer-slider slide-1">
                    {arrays.map((products, index) =>
                        <div key={index}>
                            {products.map((product, i) =>
                                <div className="media" key={i} style={{ borderBottom: i < products.length - 1 ? '1px solid #ddd' : 'none', paddingBottom: '15px', marginBottom: '15px' }}>
                                    <Link href={`/view/product/${product.id}`}><img className="img-fluid" src={getImage(product.images)} alt="" /></Link>
                                    <div className="media-body align-self-center">
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <Link href={`/view/product/${product.id}`}><h6>{product.displayName}</h6></Link>
                                        <h4>{symbol}{(product.price)}
                                            <del><span className="money">{symbol}{product.mrpPrice}</span></del></h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Slider>
                            )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: getBestSeller(state.data.products),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, null)(NewProduct);
