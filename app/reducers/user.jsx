import axios from 'axios';

// action

let GET_USER_ORDERS = 'GET_USER_ORDERS';
let ADD_REVIEW = 'ADD_REVIEW';

// action creators
const retrieveUserOrders = orders => ({
    type: GET_USER_ORDERS,
    orders
})

const addReview = review => ({
    type: ADD_REVIEW,
    review
})

// reducer

const initialState = {
    review: {},
    orders: [],
};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case (GET_USER_ORDERS):
            newState.orders = action.orders;
            break;
        case (ADD_REVIEW):
            newState.review = action.review;
            break;
        default:
            return state;
    }
    return newState;
}








// dispatchers

export const getUsersOrders = userId => {
    return dispatch => {
        axios.get(`/api/user/${userId}/orders`)
        .then(res => res.data)
        .then(orders => dispatch(retrieveUserOrders(orders)))
        .catch(console.error.bind(console));
    }
}

export const createReview = (rating, text, userId) => {
    return dispatch => axios
        .post(`/api/user/${userId}/reviews`, {
            rating,
            text
        })
        .then(res => res.data)
        .then(review => dispatch(createReview(review)))
        .catch(console.error.bind(console))
}