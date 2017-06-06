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
const initialState = [];
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case (SET_PRODUCTS): 
            return action.products;
            break;
        case (SET_CATEGORIES):
            return action.categories;
            break;
        default:
            return state
    }
}

// action-dispatcher
export const getProducts = () => {
    return dispatch => axios
        .get('/api/catalog')
        .then(res => res.data)
        .then(products => dispatch(setProducts(products)))
        .catch(console.error.bind(console));
}
export const getCategories = () => {
    return dispatch => axios
        .get('/api/catalog/category')
        .then(res => res.data)
        .then(categories => dispatch(setCategories(categories)))
        .catch(console.error.bind(console));
}