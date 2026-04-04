'use client';

import React, {Component} from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';

import CartPage from '../components/common/headers/common/cart-header'
import {removeFromCart,removeFromCartHome} from '../actions'
import {getCartTotal} from '../services'

class CartContainer extends Component {
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
        const { cartList, total, symbol, removeFromCartHome } = this.props;
        const { isMounted } = this.state;

        return (
            <li className="onhover-div mobile-cart">
                <div className="cart-qty-cls">{isMounted ? cartList.length : 0}</div>
                <Link href="/cart">
                    <img src="/assets/images/icon/cart.png" className="img-fluid" alt=""/>
                    <i className="fa fa-shopping-cart"></i>
                </Link>
                <ul className="show-div shopping-cart">
                    {isMounted && cartList.map((item, index) => (
                        <CartPage key={index} item={item} total={total} symbol={symbol} removeFromCartHome={() => removeFromCartHome(item)} />
                    ))}
                    {isMounted && (cartList.length > 0) ? (
                        <div>
                            <li>
                                <div className="total">
                                    <h5>subtotal : <span>{symbol}{total}</span></h5>
                                </div>
                            </li>
                            <li>
                                <div className="buttons">
                                    <Link href="/cart" className="view-cart">view cart</Link>
                                    <Link href="/checkout" className="checkout">checkout</Link>
                                </div>
                            </li>
                        </div>
                    ) : isMounted ? (
                        <li><h5>Your cart is currently empty.</h5></li>
                    ) : null}
                </ul>
            </li>
        );
    }
}


function mapStateToProps(state) {
    return {
        cartList: state.cartList.cart,
        total: getCartTotal(state.cartList.cart),
        symbol: state.data.symbol,
    }
}

export default connect(mapStateToProps, {removeFromCart,removeFromCartHome})(CartContainer);
