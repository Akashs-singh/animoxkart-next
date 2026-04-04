'use client';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import {getImage} from './../common/utils'

import Breadcrumb from "../common/breadcrumb";
import { getCartTotal } from "../../services";
import { removeFromCart, removeFromCartHome, incrementQty, decrementQty, decrementQtyHome, incrementQtyHome } from '../../actions'

class cartComponent extends Component {

    constructor(props) {
        super(props)
        // console.log(this.props.cartItems)
    }

    render() {

        const { cartItems, symbol, total } = this.props;
        return (
            <div>
                {/*SEO Support*/}
                {/*SEO Support End */}

                <Breadcrumb title={'Cart Page'} />

                {cartItems.length > 0 ?
                    <section className="cart-section section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table cart-table table-responsive-xs">
                                        <thead>
                                            <tr className="table-head">
                                                <th scope="col">image</th>
                                                <th scope="col">product name</th>
                                                <th scope="col">price</th>
                                                <th scope="col">quantity</th>
                                                <th scope="col">action</th>
                                                <th scope="col">total</th>
                                            </tr>
                                        </thead>
                                        {cartItems.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>
                                                            <Link href={`/view/product/${item.id}/${item.name}`}>
                                                                <img src={`${item.variants ? getImage(item.variants.filter((variant) => variant.productCode == item.productCode)[0].images) : getImage(item.images)}`} alt="" />
                                                            </Link>
                                                        </td>
                                                        <td><Link href={`/view/product/${item.id}/${item.name}`}>{item.displayName}</Link>
                                                            <div className="mobile-cart-content row">
                                                                <div className="col-xs-2">
                                                                    <div className="qty-box">
                                                                        <div className="input-group">
                                                                            <span className="input-group-prepend">
                                                                                <button type="button" className="btn quantity-left-minus" onClick={() => this.props.decrementQtyHome(item.id, item.productCode)} data-type="minus" data-field="">
                                                                                    <i className="fa fa-angle-left"></i>
                                                                                </button>
                                                                            </span>
                                                                            <input type="text" name="quantity" value={item.qty} readOnly={true} className="form-control input-number" />
                                                                            <span className="input-group-prepend">
                                                                                <button className="btn quantity-right-plus" onClick={() => this.props.incrementQtyHome(item, 1, item.productCode)} data-type="plus" disabled={(item.qty >= item.stock) ? true : false}>
                                                                                    <i className="fa fa-angle-right"></i>
                                                                                </button>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xs-3">
                                                                    <h2 className="td-color">{symbol}{item.price}</h2>
                                                                </div>
                                                                <div className="col-xs-1" style={{"marginTop":"auto","marginBottom":"auto"}}>
                                                                    <h2 >
                                                                        <a href={null} style={{"color":"red"}} className="icon" onClick={() => this.props.removeFromCartHome(item, item.productCode)}>
                                                                        <i className="fa fa-times"></i>
                                                                        </a>
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><h2>{symbol}{item.price }</h2></td>
                                                        <td>
                                                            <div className="qty-box">
                                                                <div className="input-group">
                                                                    <span className="input-group-prepend">
                                                                        <button type="button" className="btn quantity-left-minus" onClick={() => this.props.decrementQtyHome(item.id, item.productCode)} data-type="minus" data-field="">
                                                                            <i className="fa fa-angle-left"></i>
                                                                        </button>
                                                                    </span>
                                                                    <input type="text" name="quantity" value={item.qty} readOnly={true} className="form-control input-number" />
                                                                    <span className="input-group-prepend">
                                                                        <button className="btn quantity-right-plus" onClick={() => this.props.incrementQtyHome(item, 1, item.productCode)} data-type="plus" disabled={(item.qty >= item.stock) ? true : false}>
                                                                            <i className="fa fa-angle-right"></i>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>{(item.qty >= item.stock) ? 'out of Stock' : ''}
                                                        </td>
                                                        <td>
                                                            <a href={null} className="icon" onClick={() => this.props.removeFromCartHome(item, item.productCode)}>
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                        <td><h2 className="td-color">{symbol}{item.sum}</h2></td>
                                                    </tr>
                                                </tbody>)
                                        })}
                                    </table>
                                    <table className="table cart-table table-responsive-md">
                                        <tfoot>
                                            <tr>
                                                <td>total price :</td>
                                                <td><h2>{symbol} {total} </h2></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="row cart-buttons">
                                <div className="col-6">
                                    <Link href="/" className="btn btn-solid">continue shopping</Link>
                                </div>
                                <div className="col-6">
                                    <Link href="/checkout" className="btn btn-solid">check out</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <section className="cart-section section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div >
                                        <div className="col-sm-12 empty-cart-cls text-center">
                                            <img src={`/assets/images/icon-empty-cart.png`} className="img-fluid mb-4" alt="" />
                                            <h3>
                                                <strong>Your Cart is Empty</strong>
                                            </h3>
                                            <h4>Explore more shortlist some items.</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart)
})

export default connect(
    mapStateToProps,
    { removeFromCart, removeFromCartHome, incrementQty, incrementQtyHome, decrementQty, decrementQtyHome }
)(cartComponent)