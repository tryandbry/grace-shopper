import axios from 'axios';

// actions
const BUY = 'BUY';

// action-creators
const addOrder = order => ({
    type : BUY,
    order
});

// initial state
const initialState = {
    order : [] // array of objects { orderInfo, cartItems }
};

// reducer
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, initialState)
    switch (action.type) {
        case (BUY):
            newState.order.push(action.order)
            break;
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
export const postOrder = (order, cart, userId) => dispatch => axios
    .post(backendRoute(userId), { order, cart })
    .then(resToData)
    .then(order => dispatch(addOrder(order)))
    .catch(() => console.log('error in buy'))