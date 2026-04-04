'use client';


import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import {getImage} from './../../../common/utils'
class SmallImages extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isMounted: false,
            nav2: null
        }
    }
    componentDidMount() {
        this.setState({ isMounted: true });
        this.setState({
            nav2: this.slider2
        });
    }

    render() {
        const { item, settings, variantCode } = this.props;

        var productsnav = settings;

        return (
            <div className="row">
                <div className="col-12 p-0">
                    {this.state.isMounted && (
                            <Slider {...productsnav} asNavFor={this.props.navOne} ref={slider => (this.slider2 = slider)} className="slider-nav">
                        {item.variants?
                        item.variants.filter(variant => variant.productCode === this.props.variantCode).map((vari, i) => 
                            vari.pictures.map((pic, index) =>
                            <div key={index}>
                                <img src={getImage(pic.image)} key={index} alt=""  className="img-fluid" />
                            </div>
                      
                            )
                            )
                       :
                            item.pictures.map((vari, index) =>
                                <div key={index}>
                                    <img src={getImage(vari)} key={index} alt=""  className="img-fluid" />
                                </div>
                            )}
                    </Slider>
                            )}
                </div>
            </div>
        );
    }
}

export default SmallImages;