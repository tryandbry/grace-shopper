import axios from 'axios';

//actions
const SET_PRODUCT = 'SET_PRODUCT';
let ADD_REVIEW = 'ADD_REVIEW';
//action-creators

const setProduct = product => ({
    type: SET_PRODUCT,
    product
});

const addReview = review => ({
    type: ADD_REVIEW,
    review
})
// reducer

const initialState = {
    product: {},
    review: {}
};

export default function reducer(state = initialState, action) {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case (SET_PRODUCT):
            newState.product = action.product;
            break;
        case (ADD_REVIEW):
            newState.review = action.review;
            break;
        default:
            return state
    }
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
    // return dispatch => {
    //     console.log('this ran?????????')
    //     return axios
    //         .post(`/api/user/${userId}/review`, {
    //             rating,
    //             text,
    //             user_id: userId,
    //             product_id: productId
    //         })
    //         .then(res => res.data)
    //         .then(review => dispatch(addReview(review)))
    //         .catch(console.error.bind(console))
    // }
}


// export const createReview = (rating, text, userId, productId) => dispatch => axios 
//     .post(`/api/user/${userId}/review`, {
//         rating,
//         text,
//         user_id: userId,
//         product_id: productId
//     })
//     .then(res => res.data)
//     .then(review => dispatch(addReview(review)))
//     .catch(console.error.bind(console))
