'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import Link from 'next/link';
import {connect} from 'react-redux'
import { getTrendingCollection} from '../../../services'
import {Product4} from '../../../services/script'
import {addToCart, addToWishlist, addToCompare} from "../../../actions";
import ProductItem from './product-item';


class Collection extends Component {
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
        const {items, symbol, addToCart, addToWishlist, addToCompare, title, subtitle} = this.props;
        return (
            <div>
                {/*Paragraph*/}
                <section className="section-b-space j-box pets-box ratio_square">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="title1 title5">
                                    {subtitle?<h4>{subtitle}</h4>:''}
                                    <h2 className="title-inner1">{title}</h2>
                                    <hr role="tournament6" />
                                </div>
                                {this.state.isMounted && (
                            <Slider {...Product4} className="product-4 product-m no-arrow">
                                    { items.map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem product={product} symbol={symbol}
                                                         onAddToCompareClicked={() => addToCompare(product)}
                                                         onAddToWishlistClicked={() => addToWishlist(product)}
                                                         onAddToCartClicked={() => addToCart(product, 1)} key={index} />
                                        </div>)
                                    }
                                </Slider>
                            )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    items: getTrendingCollection(state.data.products, ownProps.type),
    symbol: state.data.symbol
})

export default connect(mapStateToProps, {addToCart, addToWishlist, addToCompare}) (Collection);