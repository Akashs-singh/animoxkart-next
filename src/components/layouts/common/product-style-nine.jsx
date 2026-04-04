'use client';

import React, {Component} from 'react';
import Link from 'next/link';
import Modal from 'react-responsive-modal';

import {getImage} from './../../common/utils'
class ProductStyleNine extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: '',
            variantCode: '',
            product: []
        }
    }

    onClickHandle(img, productCode) {
        this.setState({ image: img });
        this.setState({ variantCode: productCode });
    }
    addCart(product, qty, variantCode) {
        this.props.onAddToCartClicked(product, qty, variantCode)
    }
    onClickHandlePic(img) {
        this.setState({ image: img });
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({ stock: 'InStock' })
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }

    plusQty = () => {
        if (this.props.product.stock >= this.state.quantity) {
            this.setState({ quantity: this.state.quantity + 1 })
        } else {
            this.setState({ stock: 'Out of Stock !' })
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }



    render() {
        const { product, symbol, onAddToCartClicked, onAddToWishlistClicked, onAddToCompareClicked } = this.props;
        if (this.state.variantCode == '') {
            this.state.variantCode = product.variantCode
            this.state.image = product.images
            this.state.product = product
        }
        let RatingStars = []
        for (var i = 0; i < product.rating; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }

        return (

            <div className="product-box">
                <div className="img-wrapper">
                    <div className="front">
                        <Link href="/view/product/${product.id}/${product.name}" ><img
                            src={`${
                                product.variants ?
                                    getImage(this.state.image) ? getImage(this.state.image) : getImage(product.variants.filter((variant) => variant.productCode == this.state.variantCode)[0].images)
                                    : getImage(product.images)
                                }`}
                            className="img-fluid"
                            alt={`${product.displayName}`} /></Link>
                    </div>
                </div>
                <div className="product-detail">
                    <div>
                        <div className="rating">
                            {RatingStars}
                        </div>
                        <Link href="/view/product/${product.id}">
                            <h6>{product.displayName}</h6>
                        </Link>
                        <h4>{symbol}{product.price}
                            <del><span className="money">{symbol}{product.mrpPrice}</span></del>
                        </h4>
                            {product.variants ?
                            <ul className="color-variant">
                                {product.variants.map((vari, i) => {
                                    return (
                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images, vari.productCode)}></li>)
                                })}

                            </ul> : ''}
                        <div className="cart-bottom">
                            <button title="Add to cart" onClick={() => this.addCart(this.props.product, 1, this.state.variantCode)}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </button>
                            <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <Link href="/compare" title="Compare" onClick={onAddToCompareClicked}>
                                <i className="fa fa-refresh" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductStyleNine;