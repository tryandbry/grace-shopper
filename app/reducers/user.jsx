import axios from 'axios';

// action

let GET_USER_ORDERS = 'GET_USER_ORDERS';

// action creators
const retrieveUserOrders = orders => ({
    type: GET_USER_ORDERS,
    orders
})


// reducer

const initialState = {
    orders: []
};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case (GET_USER_ORDERS):
            newState.orders = action.orders;
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