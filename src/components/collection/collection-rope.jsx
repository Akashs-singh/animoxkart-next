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

class CollectionRope extends Component {

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

                <Breadcrumb title={'Collection'} parent={'Rope'}/>

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
                                                <h2 style={{"fontSize":"24px"}}>Dog Ropes</h2>
                                                <h5>Tug, pull, and play with our durable dog ropes.</h5>
                                                <h6>We know that dogs love to play and exercise, and what better way to do that than with a durable dog rope? Our selection of dog ropes are perfect for interactive playtime and are built to withstand even the toughest of chewers.</h6>
                                            </div>
                                        </div>
                                        <div className="collection-product-wrapper">
                                            <div className="section-t-space port-col">
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
                                        <h6>We know that dogs love to play and exercise, and what better way to do that than with a durable dog rope? Our selection of dog ropes are perfect for interactive playtime and are built to withstand even the toughest of chewers. Whether you're playing tug-of-war or just letting your dog pull and chew to their heart's content, our dog ropes are up to the task. Made from strong and durable materials, our ropes are designed to be long-lasting and safe for your dog to play with. They come in different shapes, sizes, and colors to suit your dog's preferences. Our dog ropes are perfect for dogs of all ages and sizes, and they are sure to provide hours of entertainment for both you and your furry friend.</h6>
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
    products: getCategoryTagCollections(state.data, "wearable","rope"),
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps, {addToCartHome, addToWishlist, addToCompare}
)(CollectionRope)