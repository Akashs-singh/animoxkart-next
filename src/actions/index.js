import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import store from "../store";
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN
});

export const fetchTagsBegin = () => ({
    type: types.FETCH_TAGS_BEGIN
});

export const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const receiveTags = tags => ({
    type: types.RECEIVE_TAGS,
    tags
})

export const getAllProducts = () => dispatch => {
    dispatch(fetchProductsBegin());
    shop.getProducts(products => {
        dispatch(receiveProducts(products));
        return products;
    })
}

export const getAllTags = () => dispatch => {
    dispatch(fetchTagsBegin());
    shop.getTags(tags => {
        dispatch(receiveTags(tags));
        return tags;
    })
}

export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})




//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
        dispatch(addToCartUnsafe(product, qty))

}

export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}

export const addToCartHomeAndRemoveWishlist = (product,qty,variantCode) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafeHome(product, qty,variantCode));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});

export const removeFromCart = product_id => (dispatch) => {
    toast.error("Item Removed from Cart");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};
export const emptyCart = () => (dispatch) => {
    toast.error("Item Removed from Cart");
    dispatch({
        type: types.EMPTY_CART
    })
};
export const incrementQty = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))

}

export const decrementQty = productId => (dispatch) => {
    toast.warn("Item Decrement Qty to Cart");

    dispatch({
    type: types.DECREMENT_QTY,
    productId})
};
//function to handle variant code
export const addToCartHome = (product,qty,variantCode) => (dispatch) => {
        toast.success("Item Added to Cart");
        dispatch(addToCartUnsafeHome(product, qty,variantCode))

}
export const addToCartUnsafeHome = (product, qty,variantCode) => ({
    type: types.ADD_TO_CART_HOME,
    product,
    qty,
    variantCode
});
export const removeFromCartHome = (product) => (dispatch) => {
    toast.error("Item Removed from Cart");
    dispatch({
        type: types.REMOVE_FROM_CART_HOME,
        product
    })
};
export const incrementQtyHome = (product,qty,variantCode) => (dispatch) => {
    // console.log("incrementQtyHome");
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafeHome(product, qty,variantCode))

}
export const decrementQtyHome = (productId,variantCode) => (dispatch) => {
    toast.warn("Item Decrement Qty to Cart");
    dispatch({
    type: types.DECREMENT_QTY_HOME,
    productId,
    variantCode})
};

//function to handle variant code

//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
    toast.success("Item Added to Wishlist");
    dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});
export const removeFromWishlist = product_id => (dispatch) => {
    toast.error("Item Removed from Wishlist");
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};


//Compare Products
export const addToCompare = (product) => (dispatch) => {
    toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe= (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});


// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});
export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});

