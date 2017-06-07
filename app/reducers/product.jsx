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
            newState.reviews = action.reviews;
            break;
        default:
            return state
    }
    return newState;
}

// action-dispatcher

