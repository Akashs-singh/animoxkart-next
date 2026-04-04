'use client';

import React, { Component } from 'react';
import Link from 'next/link';

import LogoImage from "../headers/common/footer-logo"
import { SlideUpDown } from "../../../services/script";

class FooterTwo extends Component {

    componentDidMount() {
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('footer-title');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function (elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }

    render() {

        return (
            <footer className="footer-light pet-layout-footer">
                <div className="white-layout">
                    <div className="container">
                        <section className="small-section">
                            <div className="row footer-theme2">
                                <div className="col">
                                    <div className="footer-link link-white">
                                        <div className="footer-brand-logo" >
                                            <LogoImage logo={this.props.logoName} />
                                        </div>
                                        <div className="social-white">
                                            <ul>
                                                <li>
                                                    <a href="https://www.instagram.com/animoxkart" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                                </li>
                                                <li>
                                                    <a href="https://www.facebook.com/profile.php?id=100083738233194" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                                </li>
                                                <li>
                                                    <a href="https://www.instagram.com/animoxkart" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                                </li>

                                                <li>
                                                    <a href="https://wa.me/+919204092049" target="_blank"><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
                                                </li>
                                                <li>
                                                    {/* <Link href={'https://rss.com/'}><i className="fa fa-rss" aria-hidden="true"></i></Link> */}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="footer-title footer-mobile-title">
                                            <h4>my account</h4>
                                        </div>
                                        <div className="footer-contant">
                                            <ul>
                                                {/* <li><Link href="/left-sidebar/collection" >womens</Link></li>
                                                <li><Link href="/left-sidebar/collection" >clothing</Link></li>
                                                <li><Link href="/left-sidebar/collection" >accessories</Link></li>
                                                <li><Link href="/left-sidebar/collection" >featured</Link></li>
                                                <li><Link href="/left-sidebar/collection" >service</Link></li> */}
                                                <li><Link href="/cart" >cart</Link></li>
                                                <li><Link href="/orders" >my orders</Link></li>
                                                {/* <li><Link href="/left-sidebar/collection" >order history</Link></li> */}
                                                <li><Link href="/shop/offers" >new offers</Link></li>
                                                <li><Link href="/shop/premium" >featured product</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="sub-footer black-subfooter">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-md-8 col-sm-12">
                                <div className="footer-end">
                                    <p ><i className="fa fa-copyright" aria-hidden="true"></i> 2025 Animoxkart all rights reserved.
                                        Powered by CloudDMS <Link href="/terms-of-use" ><span style={{color:"white"}}><u>Terms of use</u></span></Link>&nbsp;<Link href="/privacy-policy" ><span style={{color:"white"}}><u>Privacy policy</u></span></Link></p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 col-sm-12">
                                <div className="payment-card-bottom">
                                    <ul>
                                        <li>
                                            <a href="#"><img src={`/assets/images/icon/visa.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`/assets/images/icon/mastercard.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`/assets/images/icon/paypal.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`/assets/images/icon/american-express.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`/assets/images/icon/discover.png`} alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterTwo;