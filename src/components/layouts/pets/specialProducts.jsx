import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'

import {getBestSeller} from '../../../services/index'
import {addToCart,addToCartHome, addToWishlist, addToCompare} from "../../../actions/index";
import ProductItem from './../common/product-new';

class SpecialProducts extends Component {
    render (){

        const {bestSeller, symbol,addToCartHome, addToWishlist, addToCompare} = this.props
        return (
            <div>
                <div className="title1 section-t-space" >
                    <h4>exclusive products</h4>
                    <h2 className="title-inner1">special products</h2>
                </div>
                <section className="s-box section-b-space p-t-0">
                    <div className="container">
                                <div className="no-slider">
                                    { bestSeller.map((product, index ) =>
                                        <ProductItem product={product} symbol={symbol}
                                                     onAddToCompareClicked={() => addToCompare(product)}
                                                     onAddToWishlistClicked={() => addToWishlist(product)}
                                                     onAddToCartClicked={(product,qty,variantCode) => addToCartHome(product, 1,variantCode)} key={index} /> )
                                    }
                                </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bestSeller: getBestSeller(state.data.products),
    symbol: state.data.symbol
})

export default connect(mapStateToProps, {addToCartHome, addToWishlist, addToCompare}) (SpecialProducts);