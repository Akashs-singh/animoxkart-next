'use client';

import React, {Component} from 'react';
import Link from 'next/link';
import Modal from 'react-responsive-modal';

import {getImage} from './../../../common/utils'
class ProductStyleEight extends Component {

    render() {
        const {product, symbol, onAddToCartClicked, onAddToWishlistClicked, onAddToCompareClicked} = this.props;

        return (

            <div className="product-box">
                <div className="img-wrapper">
                    <div className="front">
                        <Link href="/view/product/${product.id}" ><img
                            src={product.variants?
                                getImage(product.variants[0].images)
                                :getImage(product.images)}
                            className="img-fluid"
                            alt="" /></Link>
                    </div>
                    <div className="cart-info cart-wrap">
                        <button title="Add to cart" onClick={() => onAddToCartClicked(product, 1)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </button>
                        <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </a>
                        <a href="javascript:void(0)" data-toggle="modal"
                           data-target="#quick-view"
                           title="Quick View">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </a>
                        <Link href="/compare" title="Compare" onClick={onAddToCompareClicked}>
                            <i className="fa fa-refresh" aria-hidden="true"></i></Link>
                    </div>
                </div>
                <div className="product-detail">
                    <Link href="/view/product/${product.id}">
                        <h6>{product.displayName}</h6>
                    </Link>
                    <h4>{symbol}{product.price}</h4>
                </div>
            </div>
        )
    }
}

export default ProductStyleEight;