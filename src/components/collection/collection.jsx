'use client';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { addToCartHome, addToWishlist, addToCompare } from '../../actions/index';
import { getCategoryTagCollections } from '../../services/index';
import ProductNew from '../layouts/common/product-new';
import Breadcrumb from "../common/breadcrumb";
import ProductTypes from './common/product-types';
import { getImage,formatTag } from './../common/utils';

class Collection extends Component {
    constructor(props) {
        super(props);

        // Get category_name from Next.js params instead of match.params
        const categoryName = props.params?.category_name || '';
        const categoryTag = props.initialCategoryTag || props.productTags.find(
            tag => tag.name.toLowerCase() === categoryName.toLowerCase()
        ) || {};

        this.state = {
            limit: 6,
            filteredProducts: [],
            hasMoreItems: true,
            category_tag_name: categoryName,
            type_name: "all",
            category_tag: categoryTag,
            priceRange: { min: 0, max: Infinity },
            sortBy: 'default', // default, price-asc, price-desc
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
        this.initializeFilteredProducts(this.props.initialProducts);
    }

    componentDidUpdate(prevProps, prevState) {
        // If products changed due to redux update (rare), re-filter
        if (prevProps.products !== this.props.products) {
            this.initializeFilteredProducts();
        }
        // If type changed, re-filter
        if (prevState.type_name !== this.state.type_name) {
            this.applyTypeFilter();
        }
    }

    initializeFilteredProducts = (products = this.props.products) => {
        let filteredProducts = this.getTypeFilteredList(
            products,
            this.state.type_name
        );
        
        // Sort by price (ascending)
        filteredProducts = filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.price) || 0;
            const priceB = parseFloat(b.price) || 0;
            return priceA - priceB;
        });
        
        this.setState({
            filteredProducts,
            limit: 6,
            hasMoreItems: filteredProducts.length > 6
        });
    };

    /** Generic reusable filtering function **/
    getTypeFilteredList = (products, type) => {
        if (!products) return [];

        if (type === "all") return [...products];

        return products.filter(p => {
            // Check if p.types exists and is an array
            if (!p.types || !Array.isArray(p.types)) return false;
            // Check if any type in the array matches the filter
            return p.types.some(t =>
                (t || "").toLowerCase() === type.toLowerCase()
            );
        });
    };

    /** Fetch next items for infinite scroll **/
    fetchMoreItems = () => {
        const { filteredProducts, limit } = this.state;

        if (limit >= filteredProducts.length) {
            this.setState({ hasMoreItems: false });
            return;
        }

        setTimeout(() => {
            this.setState(prev => ({
                limit: prev.limit + 6
            }));
        }, 400);
    };

    /** Called when user selects a type */
    onTypeSelect = (type_name) => {
        this.setState({
            type_name,
            limit: 6,
            hasMoreItems: true
        });
    };

    /** Apply filter when type changes */
    applyTypeFilter = () => {
        let filteredProducts = this.getTypeFilteredList(
            this.props.initialProducts?.length ? this.props.initialProducts : this.props.products,
            this.state.type_name
        );
        
        // Sort by price (ascending)
        filteredProducts = filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.price) || 0;
            const priceB = parseFloat(b.price) || 0;
            return priceA - priceB;
        });
        
        this.setState({
            filteredProducts,
            limit: 6,
            hasMoreItems: filteredProducts.length > 6
        });
    };

    render() {
        const { addToCartHome, symbol, addToWishlist, addToCompare } = this.props;
        const { category_name } = this.props.params || {};
        const { filteredProducts, category_tag, limit } = this.state;

        return (
            <div>
                <Breadcrumb title="Collection" parent={category_name} />

                {/* Product Types Slider */}
                <ProductTypes
                    categoryTag={category_tag}
                    onTypeSelect={this.onTypeSelect}
                />

                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col">
                                    <div className="page-main-content">

                                        {/* Banner */}
                                        <div className="top-banner-wrapper">
                                            {this.state.isMounted && category_tag.show_image === 1 && (
                                                <img
                                                    src={category_tag.image && category_tag.image !== ""
                                                        ? getImage(category_tag.image)
                                                        : "/assets/images/mega-menu/2.jpg"
                                                    }
                                                    // src="/assets/images/mega-menu/2.jpg"
                                                    className="img-fluid blur-up lazyload"
                                                    alt={category_name}
                                                />
                                            )}

                                            <div className="top-banner-content small-section pt-1 pb-0">
                                                <h2 style={{ fontSize: "20px" }}>{formatTag(category_name)}</h2>
                                                {/* <h5>Explore the best {category_tag?.name || ""} for your furry friend.</h5>
                                                <h6>{category_name} are an essential accessory for any pet owner.</h6> */}
                                            </div>
                                        </div>

                                        {/* Product List */}
                                        <div className="collection-product-wrapper">
                                            <div className="section-t-space port-col">

                                                {filteredProducts.length > 0 ? (
                                                    <InfiniteScroll
                                                        dataLength={limit}
                                                        next={this.fetchMoreItems}
                                                        hasMore={this.state.hasMoreItems}
                                                        loader={<div className="loading-cls"></div>}
                                                        endMessage={
                                                            <p className="seen-cls seen-it-cls"><b>Yay! You have seen it all</b></p>
                                                        }
                                                    >
                                                        <div className="isotopeContainer row">
                                                            {filteredProducts.slice(0, limit).map((product, index) => (
                                                                <div className="col-xl-3 col-sm-6 isotopeSelector" key={`${product.id}-${product.name}-${index}`}>
                                                                    <ProductNew
                                                                        product={product}
                                                                        symbol={symbol}
                                                                        onAddToCompareClicked={() => addToCompare(product)}
                                                                        onAddToWishlistClicked={() => addToWishlist(product)}
                                                                        onAddToCartClicked={(p, qty, variant) =>
                                                                            addToCartHome(p, 1, variant)
                                                                        }
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </InfiniteScroll>
                                                ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                                                            <img
                                                                src={`/assets/images/empty-search.jpg`}
                                                                className="img-fluid mb-4"
                                                                alt="Not found"
                                                            />
                                                            <h3>Sorry! Couldn't find products for {formatTag(this.state.type_name != 'all' ? this.state.type_name : '')} {formatTag(category_name)}.</h3>
                                                            <p>Please try selecting a different type or explore other categories.</p>
                                                            <Link href="/" className="btn btn-solid">
                                                                continue shopping
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="top-banner-content small-section pb-0">
                                            {/* <h2 style={{ fontSize: "20px" }}>{this.formatTagSingle(category_name)}</h2> */}
                                            <h5>Explore the best {category_tag?.name || ""}{" "}for your furry friend.</h5>
                                            <h6>{category_name}{" "}are an essential accessory for any pet owner.</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // Get category from Next.js params instead of match.params
    const category = ownProps.params?.category_name?.toLowerCase() || '';

    return {
        products: getCategoryTagCollections(state.data, "wearable", category),
        productTags: state.tags.tags,
        symbol: state.data.symbol,
        initialProducts: ownProps.initialProducts || [],
        initialCategoryTag: ownProps.initialCategoryTag || null,
    };
};

export default connect(
    mapStateToProps,
    { addToCartHome, addToWishlist, addToCompare }
)(Collection);
