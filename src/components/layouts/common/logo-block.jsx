'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });

import {Slider6} from "../../../services/script";

class LogoBlock extends Component {
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
            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.isMounted && (
                            <Slider {...Slider6} className="slide-6 no-arrow">
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/1.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/2.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/3.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/4.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/5.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/6.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/7.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block">
                                        <a href={null}>
                                            <img src={`/assets/images/logos/8.png`} alt="" />
                                        </a>
                                    </div>
                                </div>
                            </Slider>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default LogoBlock;