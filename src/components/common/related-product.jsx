'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import { connect } from 'react-redux';
import Link from 'next/link';
import {settings} from '../../services/script'
import { getBestSeller } from "../../services";
import { addToCart, addToCartHome, addToWishlist, addToCompare } from "../../actions";
import ProductItem from '../layouts/common/product-item.jsx';
class RelatedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }

    
    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const { items, symbol, addToCart, addToCartHome, addToWishlist, addToCompare } = this.props;


        return (
            <section className="section-b-space">
                <div className="container">
               
                    <div className="row">
                        <div className="col-12 product-related">
                            <h2>related products</h2>
                        </div>
                    </div>
                    <div className="row">
                    {this.state.isMounted && (
                            <Slider {...settings} className="" >
                                    { items.map((product, index ) =>
                                        <div key={index} className="col-xl-2 col-md-4 col-sm-6">
                                            <ProductItem product={product} symbol={symbol}
                                                         onAddToCompareClicked={() => addToCompare(product)}
                                                         onAddToWishlistClicked={() => addToWishlist(product)}
                                                         onAddToCartClicked={(product,qty,variantCode) => addToCartHome(product, qty,variantCode)} key={index} /> 
                                        </div>)
                                    }
                                </Slider>
                            )}
                                </div>
                    {/* <div className="row search-product">
                    {this.state.isMounted && (
                            <Slider {...Product4} className="product-4 product-m no-arrow" >
                        {items.slice(0, 6).map((product, index) =>
                            <div key={index} className="col-xl-2 col-md-4 col-sm-6">
                                <ProductItem product={product} symbol={symbol}
                                    onAddToCompareClicked={() => addToCompare(product)}
                                    onAddToWishlistClicked={() => addToWishlist(product)}
                                    onAddToCartClicked={(product, qty, variantCode) => addToCartHome(product, 1, variantCode)} key={index} />
                            </div>)
                        }
                        </Slider>
                            )}
                    </div> */}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: getBestSeller(state.data.products),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, { addToCart, addToCartHome, addToWishlist, addToCompare })(RelatedProduct);
