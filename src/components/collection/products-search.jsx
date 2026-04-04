'use client';

import React, {Component, use} from 'react';
import { connect } from 'react-redux'
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTotal, getCartProducts } from '../../reducers/index'
import { addToCartHome, addToWishlist, addToCompare } from '../../actions/index'
import {getSearchCollections} from '../../services/index';
import ProductListItem from "./common/product-list-item";
import ProductItem from '../layouts/common/product-item-search.jsx';
import Breadcrumb from "../common/breadcrumb";
import Search from '../pages/search';

class ProuctsSearch extends Component {

    constructor (props) {
        super (props)

        this.state = {
            limit: 4,
            hasMoreItems: true,
            allProducts: [],
            products: [],
            strValue: ''
        };
        
    }
    add = (event) => {
        this.setState({
            strValue: event.target.value
        }); 
      }
      
    search=()=>{
        //reload the page with the search value
        // console.log(this.state.strValue);
        window.location.href = "/search?search="+this.state.strValue;

        // const items= this.state.allProducts.filter(item => item.name.toLowerCase().includes(this.state.strValue.toLowerCase()));
        // this.setState({
        //     products: items
        // });
        // console.log(this.state.products);

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
                limit: this.state.limit + 4
            });
        }, 3000);
    }

    render (){
        const {products, addToCartHome, symbol, addToWishlist, addToCompare,getSearchCollections} = this.props;
        if(this.state.allProducts.length == 0){
            this.state.allProducts = products;
            this.state.products = products;
        }
        //get the search value from the url
        var url = window.location.href; 
        var search = url.split("search=")[1];
        // if(search != undefined){
        //     search = search.replace(/%20/g, " ");
        //     this.state.products = this.state.allProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        // }
        if (search !== undefined) {
            search = search.replace(/%20/g, " ");
            const searchQuery = search.toLowerCase();
        
            this.state.products = this.state.allProducts.filter(item => {
                const itemNameLower = item.name.toLowerCase();
    
                // Determine the minimum number of characters to match (e.g., 3)
                const minMatchChars = 3;
    
                // Check if the search query has at least minMatchChars characters
                if (searchQuery.length >= minMatchChars) {
                    // Check if at least minMatchChars characters from the search query are in the item name
                    for (let i = 0; i <= itemNameLower.length - minMatchChars; i++) {
                        if (searchQuery.includes(itemNameLower.substring(i, i + minMatchChars))) {
                            return true;
                        }
                    }
                }
                return false;
            })
        }
        return (
            <div>
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col">
                                    <div className="page-main-content">
                                    <div className="input-group">
                                                <input type="search" className="form-control"  onKeyUp={this.add.bind(this)}
                                                       aria-label="Items"
                                                       placeholder="What are you looking for?" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-solid" onClick={this.search}><i
                                                            className="fa fa-search"></i> Search
                                                        </button>
                                                    </div>
                                            </div>
                                        {/* search box */}
                                        <div className="collection-product-wrapper">
                                            <div className="section-t-space port-col" >
                                                {this.state.products.length > 0 ?this.state.products?
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
                                                        <div className="isotopeContainer row" id='searchArea'>
                                                            { this.state.products?this.state.products.slice(0, this.state.limit).map((product, index) =>
                                                                <div className="col-xl-3 col-sm-6 isotopeSelector" key={index}>
                                                                    <ProductItem product={product} symbol={symbol}
                                                                                 onAddToCompareClicked={() => addToCompare(product)}
                                                                                 onAddToWishlistClicked={() => addToWishlist(product)}
                                                                                 onAddToCartClicked={(product,qty,variantCode) => addToCartHome(product, 1,variantCode)} key={index}/>
                                                                </div>):''
                                                            }
                                                        </div>
                                                    </InfiniteScroll>
                                                    :<div></div>:
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
    products: getSearchCollections(state.data, "wearable"),
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps, {addToCartHome, addToWishlist, addToCompare, getSearchCollections}
)(ProuctsSearch)