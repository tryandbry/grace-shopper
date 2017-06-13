import axios from 'axios';

// actions
const BUY = 'BUY';

// action-creators
const addOrder = order => ({
    type : BUY,
    order
});

// initial state
const initialState = {};

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case (BUY):
            return action.order;
            break;
        default:
            return state;
    }
}

// user: from db
// guest: saves bom to session
const backendRoute = (userId) => 
    isNaN(userId)
    ? '/api/guest/order'
    : `/api/user/${userId}/orders`

const resToData = (res) => res.data

// dispatchers
export const postOrder = (order, userId) => dispatch => axios
    .post(backendRoute(userId), order)
    .then(resToData)
    .then(order => dispatch(addOrder(order))) // this order != input order
    .catch(() => console.log('error in buy'))