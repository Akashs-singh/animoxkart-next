'use client';

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addToCart,addToCartHome, addToWishlist, addToCompare} from "../../actions/index";
import ProductItem from './product-item';
import ProductStyleNine from "./../layouts/common/product-style-nine";
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import Link from 'next/link';
import { getTrendingCollection} from '../../services'
import {Product4} from '../../services/script'
import {settings} from '../../services/script'
import ProductNew from '../layouts/common/product-new';
class SimilarProducts extends Component {
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
        const {items, symbol, addToCartHome, addToWishlist, addToCompare, title, subtitle} = this.props;
        return (
            <div>
                <section className="ratio_asos section-b-space p-t-0 s-box">
                    <div className="title2">
                        <h2 className="title-inner2">Similar Products</h2>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {this.state.isMounted && (
                            <Slider {...settings} className="product-4 product-m no-arrow">
                                    { items.map((product, index) =>
                                        <div className="" key={index}>
                                            <ProductNew product={product} symbol={symbol}
                                                             onAddToCompareClicked={() => addToCompare(product)}
                                                             onAddToWishlistClicked={() => addToWishlist(product)}
                                                             onAddToCartClicked={addToCartHome} key={index}/>
                                        </div>)}
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

export default connect(mapStateToProps, {addToCartHome, addToWishlist, addToCompare}) (SimilarProducts);