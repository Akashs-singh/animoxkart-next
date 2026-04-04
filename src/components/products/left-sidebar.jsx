'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import '../common/index.scss';
import { connect } from "react-redux";
// import custom Components
import Service from "./common/service";
import BrandBlock from "./common/brand-block";
import NewProduct from "../common/new-product";
import RelatedProduct from "../common/related-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartHome, addToCartUnsafeHome, addToWishlist } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'



class LeftSideBar extends Component {

    constructor() {
        super();

        this.state = {
            isMounted: false,
            open: false,
            nav1: null,
            nav2: null,
            variantCode: '',
            image: '',
            productId: '',
            product: []
        };

    }
    onClickHandle = value => {
        this.setState({ variantCode: value });
    }
    componentDidMount() {
        this.setState({ isMounted: true });
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
       
    }
    filterClick() {
        document.getElementById("filter").style.left = "-15px";
    }
    backClick() {
        document.getElementById("filter").style.left = "-365px";
    }

    render() {
        const { symbol, item, addToCart, addToCartHome, addToCartUnsafeHome, addToWishlist } = this.props
        if (this.state.variantCode != item.variantCode && this.state.variantCode == '') {
            this.state.variantCode = item.variantCode
            this.state.product = item
        }
        if (this.state.productId == ''){
         this.state.productId= item.id 
        }
        else{
            if(this.state.productId != item.id){
                this.state.productId= item.id
                this.state.product= item
                this.state.variantCode= item.variantCode
            }
        }
        var products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div>
                {/*SEO Support*/}
                {/*SEO Support End */}

                <Breadcrumb parent={'Product'} title={item.name} />

                {/*Section Start*/}
                {(item) ?
                    <section className="section-b-space">
                        <div className="collection-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-3 collection-filter" id="filter">
                                        <div className="collection-mobile-back pl-5">
                                            <span onClick={this.backClick} className="filter-back">
                                                <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                            </span>
                                        </div>

                                        {/* <BrandBlock/> */}
                                        <Service />
                                        {/*side-bar single product slider start*/}
                                        <NewProduct />
                                        {/*side-bar single product slider end*/}
                                    </div>
                                    <div className="col-lg-9 col-sm-12 col-xs-12">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="filter-main-btn mb-2">
                                                        <span onClick={this.filterClick} className="filter-btn" >
                                                            <i className="fa fa-info" aria-hidden="true"></i> Info</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 product-thumbnail">
                                                    {this.state.isMounted && (
                            <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                                        {item.variants?
                                                            item.variants.filter(variant => variant.productCode === this.state.variantCode).map((vari, i) =>
                                                                vari.pictures.map((pic, index) =>
                                                                    <div key={index}>
                                                                        <ImageZoom image={pic.image} />
                                                                    </div>
                                                                )
                                                            ) :
                                                            item.pictures.map((vari, index) =>

                                                                <div >
                                                                    <ImageZoom image={vari} />
                                                                </div>
                                                            )}
                                                    </Slider>
                            )}
                                                    <SmallImages item={item} settings={productsnav} variantCode={this.state.variantCode} navOne={this.state.nav1} />
                                                </div>
                                                <DetailsWithPrice symbol={symbol} variantCode={this.state.variantCode} onClickHandle={this.onClickHandle} item={item} navOne={this.state.nav1} addToCartClicked={addToCartHome} BuynowClicked={addToCartUnsafeHome} addToWishlistClicked={addToWishlist} />
                                            </div>
                                        </div>
                                        <DetailsTopTabs item={item} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : ''}
                {/*Section End*/}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let productId = ownProps.match.params.id;
    return {
        item: state.data.products.find(el => el.id == productId),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, { addToCart, addToCartHome, addToCartUnsafeHome, addToWishlist })(LeftSideBar);