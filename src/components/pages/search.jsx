'use client';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "../common/breadcrumb";
import ProductItem from '../common/product-item';
import ProductNew from '../layouts/common/product-new';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: props.searchParams?.get('q') || '',
            filteredProducts: []
        };
    }

    componentDidMount() {
        this.filterProducts(this.state.searchQuery);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.filterProducts(this.state.searchQuery);
        }
    }

    filterProducts = (query) => {
        if (!query || query.trim() === '') {
            this.setState({ filteredProducts: [] });
            return;
        }

        const { products } = this.props;
        const searchTerm = query.toLowerCase().trim();
        
        const filtered = products.filter(product => {
            // Check name and displayName
            if (product.name?.toLowerCase().includes(searchTerm)) return true;
            if (product.displayName?.toLowerCase().includes(searchTerm)) return true;
            
            // Check category (handle both string and array)
            if (product.category) {
                if (Array.isArray(product.category)) {
                    if (product.category.some(cat => cat?.toLowerCase().includes(searchTerm))) return true;
                } else if (typeof product.category === 'string') {
                    if (product.category.toLowerCase().includes(searchTerm)) return true;
                }
            }
            
            // Check tags (handle both string and array)
            if (product.tags) {
                if (Array.isArray(product.tags)) {
                    if (product.tags.some(tag => tag?.toLowerCase().includes(searchTerm))) return true;
                } else if (typeof product.tags === 'string') {
                    if (product.tags.toLowerCase().includes(searchTerm)) return true;
                }
            }
            
            return false;
        });

        this.setState({ filteredProducts: filtered });
    };

    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();
        const { searchQuery } = this.state;
        if (searchQuery.trim()) {
            this.props.router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            this.filterProducts(searchQuery);
        }
    };

    render() {
        const { searchQuery, filteredProducts } = this.state;
        const { symbol } = this.props;

        return (
            <div>
                <Breadcrumb title={'Search'} />

                {/*Search section*/}
                <section className="authentication-page section-b-space">
                    <div className="container">
                        <section className="search-block">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <form className="form-header" onSubmit={this.handleSearchSubmit}>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    aria-label="Search products"
                                                    placeholder="Search Products......"
                                                    value={searchQuery}
                                                    onChange={this.handleSearchChange}
                                                />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-solid">
                                                        <i className="fa fa-search"></i>Search
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Search Results */}
                        {searchQuery && (
                            <section className="section-b-space">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4 className="mb-4">
                                                {filteredProducts.length > 0
                                                    ? `Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
                                                    : `No results found for "${searchQuery}"`
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {filteredProducts.map((product, index) => (
                                            <div className="col-xl-3 col-md-4 col-6" key={index}>
                                                <ProductNew
                                                    product={product}
                                                    symbol={symbol}
                                                    onAddToCartClicked={() => {}}
                                                    onAddToWishlistClicked={() => {}}
                                                    onAddToCompareClicked={() => {}}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.data.products,
    symbol: state.data.symbol
});

// Wrapper component to use Next.js hooks
function SearchWithRouter(props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    return <Search {...props} router={router} searchParams={searchParams} />;
}

export default connect(mapStateToProps)(SearchWithRouter);