import axios from 'axios';

// actions
const BUY = 'BUY';
// const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

// action-creators
const addOrder = order => ({
    type : BUY,
    order
});
// const setCurrentOrder = o

// initial state
const initialState = {
    order : [],
    currentOrder : {}
};

// reducer
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, initialState)
    switch (action.type) {
        case (BUY):
            newState.order.push(action.order)
            break;
        // case ()
        default:
            return state;
    }
    return newState;
}

// user: from db
// guest: saves bom to session
const backendRoute = (userId) => 
    isNaN(userId)
    ? '/api/guest/order'
    : `/api/user/${userId}/orders`

const resToData = (res) => res.data

// dispatchers
export const postOrder = (order, userId) => dispatch => {
    console.log('postOrder in order reducer')
    axios
    .post(backendRoute(userId), order)
    .then(res => {
        console.log('postOrder in order reducer', res)
        return res.data
    })
    .then(order => dispatch(addOrder(order))) // this order != input order
    .catch(() => console.log('error in buy'))}