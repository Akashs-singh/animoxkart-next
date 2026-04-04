'use client';
import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";

class Contact extends Component {

    constructor (props) {
        super (props)
    }

    render (){


        return (
            <div>
                <Breadcrumb title={'Contact Us'}/>
                
                
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row section-b-space">
                            <div className="col-lg-7 map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d58596.78546006052!2d85.2731467!3d23.3773949!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1673868969032!5m2!1sen!2sin" allowFullScreen></iframe>
                                {/* <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50059.12775918716!2d72.78534673554945!3d21.16564923510817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1533793756956"
                                    allowFullScreen></iframe> */}
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-right">
                                    <ul>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`/assets/images/icon/phone.png`} alt="Generic placeholder image" />
                                                    <h6>Contact Us</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>+91 9204092049</p>
                                                {/* <p>+91 7004518384</p> */}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <h6>Address</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Animoxkart, Ranchi, Jharkhand</p>
                                                <p>India 835222</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`/assets/images/icon/email.png`} alt="Generic placeholder image" />
                                                    <h6>Email</h6>
                                            </div>
                                            <div className="media-body">
                                                
                                                <a href="mailto:support@animoxkart.in" target="_blank"><p>support@animoxkart.in</p></a>
                                                <a href="mailto:info@animoxkart.in" target="_blank"><p>info@animoxkart.in</p></a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                {/* <i className="fa fa-whatsapp" aria-hidden="true"></i> */}
                                                
                                                <a href="https://wa.me/+919204092049" target="_blank"><i className="fa fa-whatsapp" aria-hidden="true"></i><h6>Whatsapp</h6></a>
                                            </div>
                                            <div className="media-body">
                                                <p>+91 9204092049</p>
                                                {/* <p>+91 7004518384</p> */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Enter Your name" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Last Name</label>
                                            <input type="text" className="form-control" id="last-name"
                                                   placeholder="Email" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="review">Phone number</label>
                                            <input type="text" className="form-control" id="review"
                                                   placeholder="Enter your number" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                                   required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Write Your Message</label>
                                            <textarea className="form-control" placeholder="Write Your Message"
                                                      id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Send Your Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Contact