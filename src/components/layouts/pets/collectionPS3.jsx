import React, {Component} from 'react';
import {connect} from "react-redux";
import Slider from "react-slick"

// import Custom Components
import Breadcrumb from "../../common/breadcrumb";
import ProductStyleThree from "./../../features/product/common/product-style-three";
import {getVisibleproducts} from "../../../services";
import {addToCart, addToCompare, addToWishlist} from "../../../actions";
import { getTrendingCollection} from '../../../services'
import {Product4, Product5} from '../../../services/script';
class CollectionPS1 extends Component {
        render (){
            const {items, products, addToCart, symbol, addToWishlist, addToCompare, title, subtitle} = this.props;
            return (
                <div>
                    <section className=" ratio_asos section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                <div className="title1 title5">
                                    {subtitle?<h4>{subtitle}</h4>:''}
                                    <h2 className="title-inner1">{title}</h2>
                                    <hr role="tournament6" />
                                </div>
                                    <Slider {...Product4} className="product-4 product-m no-arrow">
                                    { products.map((product, index) =>
                                        <div className="col-xl-3 col-md-6 col-grid-box">
                                        <ProductStyleThree product={product} symbol={symbol}
                                                         onAddToCompareClicked={() => addToCompare(product)}
                                                         onAddToWishlistClicked={() => addToWishlist(product)}
                                                         onAddToCartClicked={addToCart} key={index}/>
                                        </div>)}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </section>
                    </div>
            )
        }
    }
    
    const mapStateToProps = (state) => ({
        products: getVisibleproducts(state.data, state.filters),
        symbol: state.data.symbol,
    })
    
    export default connect(
        mapStateToProps, {addToCart, addToWishlist, addToCompare}
    )(CollectionPS1)