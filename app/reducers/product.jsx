import axios from 'axios';

//actions
const SET_PRODUCT = 'SET_PRODUCT';
const SET_REVIEWS = 'SET_REVIEWS';

//action-creators

const setProduct = product => ({
    type: SET_PRODUCT,
    product
});
const setReviews = reviews => ({
    type: SET_REVIEWS,
    reviews
});

// reducer

const initialState = {
    product: {},
    reviews: []
};

export default function reducer(state = initialState, action) {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case (SET_PRODUCT):
            newState.product = action.product;
            break;
        case (SET_REVIEWS):
            newState.reviews = action.reviews;  // this might be wrong? I think it is correct though
            break;
        default:
            return state
    }
    return newState;
}

// action-dispatcher

export const getProduct = productId => {
    return dispatch => axios
        .get(`api/product/${productId}`)
        .then(res => res.data)
        .then(product => dispatch(setProduct(product)))
        .catch(console.error.bind(console));
}

export const getReviews = productId => {
    return dispatch => axios
        .get(`api/product/${productId}/reviews`)
        .then(res => res.data)
        .then(reviews => dispatch(setReviews(reviews)))
}
