'use client';

import React, { Component } from 'react';
import Link from 'next/link'
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { getImage, getSizeChartImage } from './../../../common/utils'

class DetailsWithPrice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isMounted: false,
            open: false,
            quantity: 1,
            stock: 'InStock',
            nav3: null
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.setState({ isMounted: true });
        this.setState({
            nav3: this.slider3
        });
    }

    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({ stock: 'InStock' })
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }

    plusQty = () => {
        if (this.props.item.stock >= this.state.quantity) {
            this.setState({ quantity: this.state.quantity + 1 })
        } else {
            this.setState({ stock: 'Out of Stock !' })
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render() {
        const { symbol, variantCode, onClickHandle, onClickHandleUnset, item, addToCartClicked, BuynowClicked, addToWishlistClicked } = this.props

        var colorsnav = {
            slidesToShow: 6,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div className="col-lg-6 rtl-text">
                <div className="product-right">
                    <h2> {item.displayName} </h2>
                    <h3>{symbol}{item.price} </h3>
                    <h4>
                        MRP : <del>{symbol}{item.mrpPrice}</del>
                        <span>{item.discount}% off</span></h4>

                    {item.variants ?
                        <ul >
                            {this.state.isMounted && (
                                <Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)} className="color-variant">
                                    {item.variants.map((vari, i) => {
                                        return <li className={vari.color} key={i + vari.productCode} title={vari.color} onClick={() => this.props.onClickHandle(vari.productCode)}></li>
                                    })}
                                    {/* {product.variants.map((vari, i) => {
                                    return (
                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images,vari.productCode)}></li>)
                                })} */}
                                </Slider>
                            )}
                        </ul> : ''}
                    <div className="product-description border-product">
                        {item.sizes && item.sizes.length > 0 ?
                            <div>
                                <h6 className="product-title size-text">select size
                                    <span><a href="#" data-toggle="modal"
                                        data-target="#sizemodal" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => { e.preventDefault(); this.onOpenModal(); }}> size chart</a></span></h6>
                                <div className="size-box">
                                    <ul className="size-variant-detail">
                                        {item.sizes.map((vari, i) => {
                                            // Display "Free Size" for 'none' sizes
                                            const displaySize = vari.size && vari.size.toLowerCase() === 'none'
                                                ? 'Free Size'
                                                : vari.size;
                                            
                                            // Check if it's free size
                                            const isFreeSize = vari.size && vari.size.toLowerCase() === 'none';
                                            
                                            // For free size, ALWAYS show as non-selected (only free-size-item class)
                                            if (isFreeSize) {
                                                return (
                                                    <li key={i} className="free-size-item">
                                                        <Link href={`/view/product/${vari.productCode}/${item.name}`}>
                                                            <span>{displaySize}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            
                                            // For regular sizes, show selected state
                                            if (vari.productCode.includes(item.id)) {
                                                return (
                                                    <li key={i} className="size-selected-detail">
                                                        <Link href={`/view/product/${vari.productCode}/${item.name}`}>
                                                            <span>{displaySize}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li key={i}>
                                                        <Link href={`/view/product/${vari.productCode}/${item.name}`}>
                                                            <span>{displaySize}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div> : ''}
                        <span className="instock-cls">{this.state.stock}</span>
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
                    <div className="product-buttons" >
                        <a className="btn btn-solid" onClick={() => addToCartClicked(item, this.state.quantity, this.props.variantCode)}>add to cart</a>
                        <Link href="/checkout" className="btn btn-solid" onClick={() => BuynowClicked(item, this.state.quantity, this.props.variantCode)} >buy now</Link>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">product details</h6>
                        <p>{item.shortDetails}</p>
                        <span>Before making a purchase, kindly measure your pet's size and compare it with the <a href="#" data-toggle="modal" data-target="#sizemodal" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => { e.preventDefault(); this.onOpenModal(); }}>size chart</a>.</span>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">share it</h6>
                        <div className="product-icon">
                            <ul className="product-social">
                                <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                            <button className="wishlist-btn" onClick={() => addToWishlistClicked(item)}><i
                                className="fa fa-heart"></i><span
                                    className="title-font">Add To WishList</span>
                            </button>
                        </div>
                    </div>
                    {/* <div className="border-product">
                        <h6 className="product-title">Time Reminder</h6>
                        <div className="timer">
                            <p id="demo">
                                <span>25
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Days</span>
                                </span>
                                <span>22
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Hrs</span>
                                </span>
                                <span>13
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Min</span>
                                </span>
                                <span>57
                                    <span className="timer-cal">Sec</span>
                                </span>
                            </p>
                        </div>
                    </div> */}
                </div>
                <Modal
                    open={this.state.open}
                    onClose={this.onCloseModal}
                    center
                    classNames={{
                        modal: 'size-chart-modal'
                    }}
                >
                    <div className="modal-header">
                        <h5 className="modal-title">{item.displayName} - Size Chart</h5>
                    </div>
                    <div className="modal-body">
                        <img src={getSizeChartImage(item.main_sku_id)} alt="Size Chart" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </Modal>
                <style jsx global>{`
                    ul.size-variant-detail li.free-size-item {
                        width: auto;
                        min-width: 90px;
                        height: auto;
                        line-height: normal;
                        border: none;
                        margin: 5px;
                        padding: 8px 12px;
                        background: transparent;
                    }
                    
                    ul.size-variant-detail li.free-size-item a {
                        color: #333;
                        font-size: 13px;
                        font-weight: 400;
                        padding: 5px;
                        display: inline;
                        text-decoration: none;
                    }
                    
                    .size-chart-modal {
                        max-width: 800px;
                        width: 90%;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    .size-chart-modal .modal-header {
                        margin-bottom: 15px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .size-chart-modal .modal-title {
                        font-size: 18px;
                        font-weight: 600;
                        margin: 0;
                        color: #333;
                    }
                    .size-chart-modal .modal-body {
                        padding: 0;
                        text-align: center;
                    }
                    .react-responsive-modal-closeButton {
                        cursor: pointer;
                        fill: #333;
                    }
                    .react-responsive-modal-closeButton:hover {
                        fill: #000;
                    }
                `}</style>
            </div>
        )
    }
}


export default DetailsWithPrice;
