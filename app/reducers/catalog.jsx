import axios from 'axios';

// actions
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SELECT_CATEGORY = 'SELECT_CATEGORY';
const RESET_CATEGORIES = 'RESET_CATEGORIES';

// action-creators
const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
});
const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    categories
});
const selectCategory = (category) => ({
    type: SELECT_CATEGORY,
    category
});

// reducer
const initialState = {
    products: [],
    categories: [],
    selectedCategory: null
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
        case (SELECT_CATEGORY):
            newState.selectedCategory = action.category;
            break;
        case (RESET_CATEGORIES):
            newState.selectedCategory = null;
            break;
        default:
            return state
    }
    return newState;
}

const resToData = res => res.data;

// action-dispatcher
export const getProducts = () => {
    return dispatch => axios
        .get('/api/catalog')
        .then(resToData)
        .then(products => dispatch(setProducts(products)))
        .catch(console.error.bind(console));
}
export const getCategories = () => {
    return dispatch => axios
        .get('/api/catalog/category')
        .then(resToData)
        .then(categories => dispatch(setCategories(categories)))
        .catch(console.error.bind(console));
}
export const getSelectedCategory = (categoryId) => {
    
    ////// WOAH I NEED A CODE REVIEW
    if (categoryId === 'all')
        return (dispatch) => dispatch({ type: RESET_CATEGORIES });
    
    return dispatch => axios
        .get(`/api/catalog/category/${categoryId}`)
        .then(resToData)
        .then(category => dispatch(selectCategory(category)))
        .catch(console.error.bind(console));
}