'use client';

import React, {Component} from 'react';
import Link from 'next/link';
import Modal from 'react-responsive-modal';

import {getImage} from './../../common/utils'
class SideImageItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            image: ''
        }
    }

    onClickHandle(img) {
        this.setState({ image : img} );
    }

    render() {
        const {product, symbol} = this.props;

        let RatingStars = []
        for(var i = 0; i < product.rating; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }
        return (
            <div className="product-box2">
                <div className="media">
                    <Link href="/view/product/${product.id}" ><img
                        src={`${
                            product.variants?
                                getImage(this.state.image)?getImage(this.state.image):getImage(product.variants[0].images)
                            :getImage(product.images)
                        }`}
                        className="img-fluid lazyload bg-img"
                        alt="" /></Link>
                    <div className="media-body align-self-center">
                        <div>
                            <div className="rating">
                                {RatingStars}
                            </div>
                            <Link href="/view/product/${product.id}">
                                <h6>{product.displayName}</h6>
                            </Link>
                            <h4>{symbol}{product.price}
                                <del><span className="money">{symbol}{product.mrpPrice}</span></del>
                            </h4>
                            {product.variants?
                                <ul className="color-variant">
                                    {product.variants.map((vari, i) => {
                                        return (
                                            <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                    })}
                                </ul>:''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideImageItem;