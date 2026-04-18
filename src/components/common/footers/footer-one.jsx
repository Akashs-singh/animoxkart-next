'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { SlideUpDown } from "../../../services/script"
import LogoImage from "../headers/common/footer-logo"

class FooterOne extends Component {

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
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    
      }
    postData = async (datas) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/subscribeMail',datas,{
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                }
        });
        // console.log(response)
        if (response.data.status == true) {
            alert(response.data.message);
          }
          else {
            alert(response.data.message);
          }
      }
    subscribeMail=(e)=>{
        e.preventDefault();
        if (this.validator.allValid()) {
            this.postData(this.state);
            //empty this state
            document.getElementById("emailId").style.display="none";
            document.getElementById("subscribe").innerText= "Subscribed";
            //disable the button
            document.getElementById("subscribe").disabled=true;
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    constructor (props) {
        super (props)
        this.state = {
            email: ''
       }
       this.validator = new SimpleReactValidator();
    }

    render() {

        return (
            <footer className="footer-light">
                <div className="light-layout">
                    <div className="container">
                        <section className="small-section border-section border-top-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="subscribe">
                                        <div>
                                            <h4>KNOW IT ALL FIRST!</h4>
                                            <p>Never Miss Anything From Animoxkart By Signing Up To Our Newsletter. </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <form className="form-inline subscribe-form">
                                        <div className="form-group mx-sm-3">
                                        <input type="text" className="form-control" id="emailId"
                                                       placeholder="Enter Your Email" name="email"  value={this.state.email} onChange={this.setStateFromInput} required="" />
                                                       {this.validator.message('email', this.state.email, 'required|email')}
                                        </div>
                                        <button type="button" id="subscribe" onClick={(e)=>this.subscribeMail(e)} className="btn btn-solid">subscribe</button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row footer-theme partition-f">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-title footer-mobile-title">
                                    <h4>about</h4>
                                </div>
                                <div className="footer-contant">
                                    <div className="footer-logo" style={{textAlign:"center"}}>
                                        <LogoImage logo={this.props.logoName} />
                                    </div>
                                    <p style={{lineHeight:"1.5"}}>Our products include items such as collars, leashes, toys, and grooming supplies for a variety of pets. We likely have a wide range of options for customers to choose from and strive to provide high-quality products for pet owners. </p>
                                    <div className="footer-social">
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
                                </div>
                            </div>
                            <div className="col offset-xl-1">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>my account</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><Link href="/orders" >my order</Link></li>
                                            <li><Link href="/orders" >order history</Link></li>
                                            <li><Link href="/wishlist" >wishlist</Link></li>
                                            <li><Link href="/cart" >cart</Link></li>
                                            <li><Link href="/shop/offers" >New Offers</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>why we choose</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><Link href="/return-and-refunds" >Return & Refunds</Link></li>
                                            <li><a href="#">Secure Shopping</a></li>
                                            <li><Link href="/terms-of-use" >Terms Of Use</Link></li>
                                            <li><Link href="/privacy-policy" >Privacy Policy</Link></li>
                                            {/* <li><a href="#">Discount Price</a></li> */}
                                           
                                            <li><Link href="/contact" >contacts</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>information</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul className="contact-list">
                                            <li><i className="fa fa-map-marker"></i>Animoxkart, India
                                            </li>
                                            <li><i className="fa fa-phone"></i>Call Us: 9204092049</li>
                                            <li><i className="fa fa-envelope-o"></i>Email Us: <a
                                                href="mailto:support@animoxkart.in">support@animoxkart.in</a></li>
                                            <li><i className="fa fa-whatsapp"></i>Whatsapp: 9204092049</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="sub-footer ">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-md-8 col-sm-12">
                                <div className="footer-end">
                                <p><i className="fa fa-copyright" aria-hidden="true"></i> 2025 Animoxkart all rights reserved.
                                        Powered by CloudDMS <Link href="/terms-of-use" ><u>Terms of use</u></Link>&nbsp;<Link href="/privacy-policy" ><u>privacy policy</u></Link></p>
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
        )
    }
}

export default FooterOne;