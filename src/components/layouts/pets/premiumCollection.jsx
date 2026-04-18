'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import Link from 'next/link';
import {connect} from 'react-redux'
import { getPremiumTagCollection} from '../../../services'
import {Product4} from '../../../services/script'
import {addToCartHome, addToWishlist, addToCompare} from "../../../actions";
import ProductNew from './../common/product-new';


class PremiumCollection extends Component {
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
        const {items, symbol, addToCartHome, addToWishlist, addToCompare, title, subtitle} = this.props;
        if(items.length === 0) return (<div></div>);
        return (
            <div>
                {/*Paragraph*/}
                <section className="section-b-space p-t-0 s-box">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="title1 title5">
                                    {subtitle?<h4>{subtitle}</h4>:''}
                                    <h2 className="title-inner1">{title}</h2>
                                    <hr role="tournament6" />
                                </div>
                                {this.state.isMounted && (
                            <Slider {...Product4} className="product-4 product-m no-arrow">
                                    { items.map((product, index ) =>
                                        <div key={index}>
                                            <ProductNew product={product} symbol={symbol}
                                                         onAddToCompareClicked={() => addToCompare(product)}
                                                         onAddToWishlistClicked={() => addToWishlist(product)}
                                                         onAddToCartClicked={(product,qty,variantCode) => addToCartHome(product, 1,variantCode)} key={index} /> 
                                        </div>)
                                    }
                                </Slider>
                            )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    items: getPremiumTagCollection(state.data.products, ownProps.type, "premium"),
    symbol: state.data.symbol
})

export default connect(mapStateToProps, {addToCartHome, addToWishlist, addToCompare}) (PremiumCollection);