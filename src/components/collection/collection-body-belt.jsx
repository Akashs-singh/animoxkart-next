'use client';

import React, {Component} from 'react';
import { connect } from 'react-redux'
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTotal, getCartProducts } from '../../reducers/index'
import { addToCartHome, addToWishlist, addToCompare } from '../../actions/index'
import {getCategoryTagCollections} from '../../services/index';
import ProductListItem from "./common/product-list-item";
import ProductItem from '../layouts/common/product-item';
import Breadcrumb from "../common/breadcrumb";

class CollectionBodyBelt extends Component {

    constructor (props) {
        super (props)

        this.state = {
            limit: 5,
            hasMoreItems: true
        };
    }

    componentDidMount() {
        this.fetchMoreItems();
    }

    fetchMoreItems = () => {
        if (this.state.limit >= this.props.products.length) {
            this.setState({ hasMoreItems: false });
            return;
        }
        // a fake async api call
        setTimeout(() => {
            this.setState({
                limit: this.state.limit + 5
            });
        }, 3000);
    }

    render (){
        const {products, addToCartHome, symbol, addToWishlist, addToCompare} = this.props;

        return (
            <div>
                 {/*SEO Support*/}
                 {/*SEO Support End */}

                <Breadcrumb title={'Collection'} parent={'Body Belt'}/>

                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col">
                                    <div className="page-main-content">
                                        <div className="top-banner-wrapper">
                                            <a href="#">
                                                <img src="/assets/images/mega-menu/2.jpg" className="img-fluid blur-up lazyload" alt="" /></a>
                                            <div className="top-banner-content small-section pb-0">
                                                <h2 style={{"fontSize":"24px"}}>Dog Body Belts</h2>
                                                <h5>Giving your dog the freedom to roam, safely with dog body belt.</h5>
                                                <h6>Animoxkart's dog body belts are the perfect solution for pet owners who want to give their dogs the freedom to roam and explore while keeping them safe.</h6>
                                            </div>
                                        </div>
                                        <div className="collection-product-wrapper">
                                            <div className="section-t-space  port-col">
                                                {products.length > 0 ?
                                                    <InfiniteScroll
                                                        dataLength={this.state.limit} //This is important field to render the next data
                                                        next={this.fetchMoreItems}
                                                        hasMore={this.state.hasMoreItems}
                                                        loader={<div className="loading-cls"></div>}
                                                        endMessage={
                                                            <p className="seen-cls seen-it-cls">
                                                                <b>Yay! You have seen it all</b>
                                                            </p>
                                                        }
                                                    >
                                                        <div className="isotopeContainer row">
                                                            { products.slice(0, this.state.limit).map((product, index) =>
                                                                <div className="col-xl-3 col-sm-6 isotopeSelector" key={index}>
                                                                    <ProductItem product={product} symbol={symbol}
                                                                                 onAddToCompareClicked={() => addToCompare(product)}
                                                                                 onAddToWishlistClicked={() => addToWishlist(product)}
                                                                                 onAddToCartClicked={(product,qty,variantCode) => addToCartHome(product, 1,variantCode)} key={index}/>
                                                                </div>)
                                                            }
                                                        </div>
                                                    </InfiniteScroll>
                                                    :
                                                    <div className="row">
                                                        <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                                            <img src={`/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                                            <h3>Sorry! Couldn't find the product you were looking For!!!    </h3>
                                                            <p>Please check if you have misspelt something or try searching with other words.</p>
                                                            <Link href="/" className="btn btn-solid">continue shopping</Link>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                        <h6>Animoxkart's dog body belts are the perfect solution for pet owners who want to give their dogs the freedom to roam and explore while keeping them safe. These belts are designed to keep dogs secure and comfortable during walks, hikes, and other outdoor activities. Made from durable and long-lasting materials, these belts are built to withstand the rigors of everyday use. The belts come with adjustable straps that allow for a custom fit and are padded to ensure comfort for your dog. These belts also feature reflective strips for added visibility and safety during evening walks. With Animoxkart's dog body belts, pet owners can enjoy peace of mind knowing that their furry friend is safe and secure while exploring the great outdoors.</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    products: getCategoryTagCollections(state.data, "wearable","bodyBelt"),
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps, {addToCartHome, addToWishlist, addToCompare}
)(CollectionBodyBelt)