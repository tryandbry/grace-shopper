import axios from 'axios';

//actions
const SET_PRODUCT = 'SET_PRODUCT';
let ADD_REVIEW = 'ADD_REVIEW';
const REVIEW_RATING = 'REVIEW_RATING';
//action-creators

const setProduct = product => ({
    type: SET_PRODUCT,
    product
});

const addReview = review => ({
    type: ADD_REVIEW,
    review
})

const getRating = rating => ({
    type: REVIEW_RATING,
    rating
})
// reducer

const initialState = {
    product: {},
    review: [],
    rating: 0,
};

export default function reducer(state = initialState, action) {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case (SET_PRODUCT):
            newState.product = action.product;
            break;
        case (ADD_REVIEW):
            newState.review.push(action.review);
            break;
        case (REVIEW_RATING):
            console.log('review rating hit? ', action)
            newState.rating = action.rating;
            break;
        default:
            return state
    }
    console.log('what is new State? ', newState);
    return newState;
}

// action-dispatcher

export const getProduct = productId => {
    return dispatch => axios
        .get(`/api/product/${productId}`)
        .then(res => res.data)
        .then(product => dispatch(setProduct(product)))
        .catch(console.error.bind(console));
}

export const createReview = (rating, text, userId, productId) => {
    console.log('did we make it?')
    return dispatch => {
        return axios
            .post(`/api/user/${userId}/review`, {
                rating,
                text,
                user_id: userId,
                product_id: productId
            })
            .then(res => res.data)
            .then(review => dispatch(addReview(review)))
            .catch(console.error.bind(console))
    }
}

export const averageRating = productId => {
    return dispatch => axios
        .get(`/api/product/${productId}/reviews`)
        .then(res => res.data)
        .then(rating => {
            console.log('rating is????? ', rating);
            dispatch(getRating(rating))})
        .catch(console.error.bind(console));
}



