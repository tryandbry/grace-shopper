import axios from 'axios';

// actions
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CATEGORIES = 'SET_CATEGORIES';

// action-creators
const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
});
const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    categories
});


// reducer
const initialState = {
    products: [],
    categories: []
};
export default function reducer (state=initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case (SET_PRODUCTS): 
            newState.products = action.products;
            break;
        case (SET_CATEGORIES):
            newState.categories = action.categories;
            break;
        default:
            return state
    }
    return newState;
}

// action-dispatcher
export const getProducts = () => {
    return dispatch => axios
        .get('/api/catalog')
        .then(res => res.data)
        .then(products => {
            console.log(products)
            dispatch(setProducts(products))})
        .catch(console.error.bind(console));
}
export const getCategories = () => {
    return dispatch => axios
        .get('/api/catalog/category')
        .then(res => res.data)
        .then(categories => dispatch(setCategories(categories)))
        .catch(console.error.bind(console));
}