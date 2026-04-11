'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import Modal from 'react-responsive-modal';
import StarRating from './../../products/common/star-rating';
import {getImage} from './../../common/utils'
class ProductItem extends Component {

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
        return (
            <div className="product-box">
                <div className="img-wrapper">
                    <div className="lable-block">
                        {(product.new == true) ? <span className="lable3">new</span> : ''}
                        {(product.sale == true) ? <span className="lable4">on sale</span> : ''}

                    </div>
                    <div className="front">
                        {/* {console.log(product)} */}
                        <Link href="/view/product/${product.id}/${product.name}" ><img
                            src={`${
                                // product.variants?product.variants.filter((variant) => variant.productCode == this.state.variantCode)[0].images:''
                                product.variants ?
                                    getImage(this.state.image) ? getImage(this.state.image) : getImage(product.variants.filter((variant) => variant.productCode == this.state.variantCode)[0].images)
                                    : getImage(product.images)
                                }`}
                            className="img-fluid"
                            alt={`${product.displayName}`} /></Link>

                    </div>
                    <div className="cart-info cart-wrap">
                        <button title="Add to cart" onClick={() => this.addCart(this.props.product, 1, this.state.variantCode)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </button>
                        <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked}>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </a>
                        {/* <a href="javascript:void(0)" data-toggle="modal"
                               data-target="#quick-view"
                               title="Quick View"
                               onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a> */}
                        <Link href="/compare" title="Compare" onClick={onAddToCompareClicked}>
                            <i className="fa fa-refresh" aria-hidden="true"></i></Link>
                    </div>
                    {product.variants ?
                        <ul className="product-thumb-list">
                            {product.variants.filter(variant => variant.productCode === this.state.variantCode).map((vari, i) =>
                                vari.pictures.map((pic, index) =>
                                    <li className={`grid_thumb_img ${(pic.image === this.state.image) ? 'active' : ''}`} key={index}>
                                        <a href="javascript:void(0)" title="Add to Wishlist">
                                            <img src={getImage(pic.image)} onClick={() => this.onClickHandlePic(pic.image)} />
                                        </a>
                                    </li>
                                )
                            )}
                        </ul> : ''}

                </div>
                <div className="product-detail">
                    <div>
                    <StarRating rating={product.gotRating ? product.gotRating : 4} />
                        <Link href="/view/product/${product.id}/${product.name}">
                            <h6>{product.displayName}</h6>
                        </Link>
                        <h4>{symbol}{product.price}
                            <del><span className="money">{symbol}{product.mrpPrice}</span></del>
                        </h4>
                        {product.variants ?
                            <ul className="color-variant">
                                {/* {product.variants.filter(variant => variant.productCode === product.variantCode).map((vari, i) => 
                                    // vari.pictures.map((pic, index) =>
                                    <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>
                                    // )

                                    )} */}
                                {product.variants.map((vari, i) => {
                                    return (
                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images, vari.productCode)}></li>)
                                })}

                            </ul> : ''}
                        {product.sizes ?
                            <ul className="size-variant">
                                {product.sizes
                                    .filter(vari => vari.size && vari.size.toLowerCase() !== 'none')
                                    .map((vari, i) => {

                                        if (vari.productCode.includes(product.id)) {
                                            return (
                                                <li className='ml-1 mr-1' key={i} style={{ textDecoration: "underline" }} ><Link href="/view/product/${vari.productCode}/${product.name}" ><span style={{ color: "black" }}>{vari.size}</span></Link></li>)
                                        } else {
                                            return (
                                                <li className='ml-1 mr-1' key={i} ><Link href="/view/product/${vari.productCode}/${product.name}" ><span style={{ color: "black" }}>{vari.size}</span></Link></li>)
                                        }
                                    })}
                            </ul> : ''}
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content quick-view-modal">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6  col-xs-12">
                                        <div className="quick-view-img">
                                            <img src={`${product.variants ?
                                                getImage(this.state.image) ? getImage(this.state.image) : getImage(product.variants[0].images)
                                                : getImage(product.images)
                                                }`} alt={`${product.displayName}`} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 rtl-text">
                                        <div className="product-right">
                                            <h2> {product.displayName} </h2>
                                            <h3>{symbol}{product.price}</h3>
                                            {product.variants ?
                                                <ul className="color-variant">
                                                    {product.variants.map((vari, i) =>
                                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                                    }
                                                </ul> : ''}
                                            <div className="border-product">
                                                <h6 className="product-title">product details</h6>
                                                <p>{product.shortDetails}</p>
                                                
                                            </div>
                                            <div className="product-description border-product">
                                                {product.size ?
                                                    <div className="size-box">
                                                        <ul>
                                                            {product.size.map((size, i) => {
                                                                return <li key={i}><a href="#">{size}</a></li>
                                                            })}
                                                        </ul>
                                                    </div> : ''}
                                                <h6 className="product-title">quantity</h6>
                                                <div className="qty-box">
                                                    <div className="input-group">
                                                        <span className="input-group-prepend">
                                                            <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                <i className="fa fa-angle-left"></i>
                                                            </button>
                                                        </span>
                                                        <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                                        <span className="input-group-prepend">
                                                            <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                <i className="fa fa-angle-right"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-buttons">
                                                <button className="btn btn-solid" onClick={() => onAddToCartClicked(product, 1, this.state.quantity)} >add to cart</button>
                                                <Link href="/view/product/${product.id}/${product.name}" className="btn btn-solid">view detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ProductItem;