'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import Link from 'next/link';

import {Slider3} from "../../../services/script"

class BlogSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }

    
    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render (){

        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.isMounted && (
                            <Slider {...Slider3} className="slide-3 no-arrow ">
                                <div>
                                    <div className="col-md-12">
                                        <Link href="/blog/details" >
                                            <div className="classic-effect">
                                                <img src={`/assets/images/blog/1.jpg`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link href="/blog/details" >
                                                <p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1" />
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <Link href="/blog/details" >
                                            <div className="classic-effect">
                                                <img src={`/assets/images/blog/2.jpg`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link href="/blog/details" >
                                                <p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1"/>
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <Link href="/blog/details" >
                                            <div className="classic-effect">
                                                <img src={`/assets/images/blog/3.jpg`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link href="/blog/details" ><p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1"/>
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                    <Link href="/blog/details" >
                                        <div className="classic-effect">
                                            <img src={`/assets/images/blog/4.jpg`} className="img-fluid" alt="" />
                                                <span></span>
                                        </div>
                                    </Link>
                                    <div className="blog-details">
                                        <h4>25 January 2018</h4>
                                        <Link href="/blog/details" ><p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                        <hr className="style1"/>
                                            <h6>by: John Dio , 2 Comment</h6>
                                    </div>
                                </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <Link href="/blog/details" >
                                            <div className="classic-effect">
                                                <img src={`/assets/images/blog/5.jpg`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link href="/blog/details" ><p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1" />
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                            )}
                        </div>
                    </div>
                </div>
        )
    }
}

export default BlogSection;