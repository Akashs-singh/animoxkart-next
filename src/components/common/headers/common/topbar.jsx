'use client';

import React, {Component} from 'react';
import Link from 'next/link';
import { withTranslate } from 'react-redux-multilingual'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
class TopBar extends Component {

    constructor (props) {
        super (props)
        this.state = {
            account: false,
            isClient: false,
       }
    }

    componentDidMount() {
        // Check authentication only on client side
        this.setState({
            isClient: true,
            account: Cookies.get('token') !== undefined
        });
    }
    notify = () => toast('Account Logged Out!',{
        duration: 2000,
        position: 'top-center'
});
    logout = () => {
        Cookies.remove('token');
        this.notify();
        window.location.href = '/';

    }
    render() {
        const {translate} = this.props;
        return (
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>{translate('topbar_title', { theme_name: ' Multikart' })}</li>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{translate('call_us')}:  9204092049 </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
                                
                                <li className="mobile-wishlist compare-mobile"><Link href="/compare"><i className="fa fa-random" aria-hidden="true"></i>{translate('compare')}</Link></li>
                                <li className="mobile-wishlist"><Link href="/wishlist"><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
                                <li className="mobile-orders"><Link href="/orders"><i className="fa fa-archive" aria-hidden="true"></i>{translate('orders')}</Link></li>
                                
                                <li className="onhover-dropdown mobile-account">
                                    <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                                    {this.state.isClient && (
                                        this.state.account ? (
                                            <ul className="onhover-show-div">
                                                <li><a href="/dashboard" data-lng="en">Dashboard</a></li>
                                                <li><a href="/orders" data-lng="en">My Orders</a></li>
                                                <li><a href={null} onClick={this.logout} data-lng="en">Log out</a></li>
                                            </ul>
                                        ) : (
                                            <ul className="onhover-show-div">
                                                <li>
                                                    <Link href="/login" data-lng="en">Login</Link>
                                                </li>
                                                <li>
                                                    <Link href="/register" data-lng="en">Register</Link>
                                                </li>
                                            </ul>
                                        )
                                    )}
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTranslate(TopBar);