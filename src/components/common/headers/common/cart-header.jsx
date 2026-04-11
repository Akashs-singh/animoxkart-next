import React, {Component} from 'react';
import Link from 'next/link'
import {getImage} from './../../../common/utils'

const CartHeader  = ({item, total, symbol,removeFromCartHome}) => {
    // Safely get the image source
    const getImageSrc = () => {
        if (item.variants && item.productCode) {
            const matchingVariant = item.variants.find((variant) => variant.productCode === item.productCode);
            if (matchingVariant && matchingVariant.images) {
                return getImage(matchingVariant.images);
            }
        }
        if (item.images) {
            return getImage(item.images);
        }
        return '';
    };

    return (
        <li >
            <div className="media">
                <Link href={`/view/product/${item.id}/${item.name}`}>
                    <img alt="" className="mr-3" src={getImageSrc()} />
                </Link>
                <div className="media-body">
                    <Link href={`/view/product/${item.id}/${item.name}`}><h4>{item.displayName}</h4></Link>
                    <h4><span>{item.qty} x {symbol} {item.price}</span></h4>
                </div>
            </div>
            {/*<span>{cart}</span>*/}
            <div className="close-circle">
                <a href={null} onClick={removeFromCartHome}><i className="fa fa-times" aria-hidden="true"></i></a>
            </div>
        </li>
    );
};

export default CartHeader;
