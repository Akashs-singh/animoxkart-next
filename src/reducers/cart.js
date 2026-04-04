import {
    ADD_TO_CART,
    ADD_TO_CART_HOME,
    REMOVE_FROM_CART,
    INCREMENT_QTY,
    DECREMENT_QTY,
    REMOVE_FROM_CART_HOME,
    DECREMENT_QTY_HOME,
    EMPTY_CART
} from "../constants/ActionTypes";


export default function cartReducer(state = {
    cart: []
}, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const productId = action.product.id
            if (state.cart.findIndex(product => product.id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.id === productId) {
                        cartAcc.push({ ...product, qty: product.qty + 1, sum: product.discount != 0 ? product.price * (product.qty + 1) : product.price * (product.qty + 1) }) // Increment qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }
            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.discount != 0 ? action.product.price * action.qty : action.product.price * action.qty }] }

        case ADD_TO_CART_HOME:
            const productIds = action.product.id
            // console.log(action.product)
            if (state.cart.findIndex(product => product.id === productIds && product.productCode === action.variantCode ) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    
                    if (product.id === productIds && product.productCode === action.variantCode) {
                        cartAcc.push({ ...product,productCode: action.variantCode, qty: product.qty + 1, sum: product.discount != 0 ? (product.price) * (product.qty + 1) : product.price * (product.qty + 1) }) // Increment qty
                    } else {
                        cartAcc.push(product)
                    }
                    return cartAcc
                }, [])

                return { ...state, cart }
            }
            return { ...state, cart: [...state.cart, { ...action.product,productCode:action.variantCode, qty: action.qty, sum: action.product.discount != 0 ? action.product.price * action.qty : action.product.price * action.qty }] }

        case DECREMENT_QTY:

            if (state.cart.findIndex(product => product.id === action.productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.id === action.productId && product.qty > 1) {
                        cartAcc.push({ ...product, qty: product.qty - 1, sum: product.discount != 0 ? product.price * (product.qty - 1) : product.price * (product.qty - 1) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.price * action.qty }] }
            case DECREMENT_QTY_HOME:

            if (state.cart.findIndex(product => product.productCode === action.variantCode) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.productCode === action.variantCode && product.qty > 1) {
                        cartAcc.push({ ...product, qty: product.qty - 1, sum: product.discount != 0 ? (product.price) * (product.qty - 1) : product.price * (product.qty - 1) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product,productCode:action.variantCode, qty: action.qty, sum: (action.product.price) * action.qty }] }

        case REMOVE_FROM_CART:
            return {
                cart: state.cart.filter(item => item.id !== action.product_id.id)
            }
        case REMOVE_FROM_CART_HOME:
            return {
                cart: state.cart.filter(item => item.productCode !== action.product.productCode)
            }
        case EMPTY_CART:
            return {
                cart: []
            }
        default:
    }
    return state;
}
