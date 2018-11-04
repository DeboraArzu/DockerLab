// src/redux/reducers/product.js
const initialState = {
    products: [],
    product: {}
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_ARTICLES' :
        return {
            ...state,
            products: action.products
        }
        case 'VIEW_ARTICLE':
        return {
            ...state,
            product: action.product
        }
        case 'CLAP_ARTICLE':
        let product = Object.assign({}, state.product)
        product.claps++
        console.log(product)
        return {
            ...state,
            product: product
        }
        default:
            return state
    }
}