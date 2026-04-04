'use client';

import React, {Component} from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import {getImage} from './../common/utils'

import Breadcrumb from '../common/breadcrumb';
import {addToCartHomeAndRemoveWishlist, removeFromWishlist} from '../../actions'

class wishList extends Component {


    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){

        const {Items, symbol} = this.props;

        return (
            <div>
                <Breadcrumb title={'Wishlist'} />
                {Items.length>0 ?
                <section className="wishlist-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                    <tr className="table-head">
                                        <th scope="col">image</th>
                                        <th scope="col">product name</th>
                                        <th scope="col">price</th>
                                        <th scope="col">availability</th>
                                        <th scope="col">action</th>
                                    </tr>
                                    </thead>
                                    {Items.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <Link href={`/view/product/${item.id}/${item.name}`}>
                                                        <img src={item.variants?
                                                                    getImage(item.variants[0].images)
                                                                    :getImage(item.images)} alt="" />
                                                    </Link>
                                                </td>
                                                <td><Link href={`/view/product/${item.id}/${item.name}`}>{item.name}</Link>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <p>in stock</p>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">{symbol}{item.price}
                                                            <del><span className="money">{symbol}{item.mrpPrice}</span></del></h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a href="javascript:void(0)" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                                <a href="javascript:void(0)" className="cart" onClick={() => this.props.addToCartHomeAndRemoveWishlist(item, 1,item.variantCode)}>
                                                                    <i className="fa fa-shopping-cart"></i>
                                                                </a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><h2>{symbol}{item.price}
                                                     <del><span className="money">{symbol}{item.mrpPrice}</span></del></h2></td>
                                                <td >
                                                    <p>in stock</p>
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0)" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                        <i className="fa fa-times"></i>
                                                    </a>
                                                    <a href="javascript:void(0)" className="cart" onClick={() => this.props.addToCartHomeAndRemoveWishlist(item, 1,item.variantCode)}>
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody> )
                                    })}
                                </table>
                            </div>
                        </div>
                        <div className="row wishlist-buttons">
                            <div className="col-12">
                                <Link href="/" className="btn btn-solid">continue shopping</Link>
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
                                        <img src={`/assets/images/empty-wishlist.png`} className="img-fluid mb-4" alt="" />
                                        <h3>
                                            <strong>WhishList is Empty</strong>
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
    Items: state.wishlist.list,
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps,
    {addToCartHomeAndRemoveWishlist, removeFromWishlist}
)(wishList)