import axios from 'axios';

// actions
const SET_CART = 'SET_CART';
const ADD_ITEM = 'ADD_ITEM';

// action-creators
const setCart = cart => ({
    type: SET_CART,
    cart
});
const addItem = item => ({
    type: ADD_ITEM,
    item
})


// reducer
const initialState = {
    item: {},
    items: [],
};
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case (SET_CART):
            newState.items = action.cart;
            break;
        case (ADD_ITEM):
            newState.item = action.item;
            newState.items = [...state.items, action.item];
            break;
        default:
            return state;
    }
    return newState;
}

// action-dispatcher
// user: gets cart from db, saves it to session and to store
// guest: saves empty cart to store
export const getCart = (userId) => {
    if (isNaN(userId)) return dispatch => dispatch(setCart([]));
    else return dispatch => axios
        .get(`/api/user/${userId}/cart`)
        .then(res => res.data)
        .then(cart => dispatch(setCart(cart)))
        .catch(console.error.bind(console));
}

// user: posts item to db, saves to session and to store
// guest: saves to store
export const getItem = (product, quantity, userId) => {
    if (isNaN(userId)) return dispatch(addItem({product, quantity}));
    return dispatch => axios
        .post(`/api/user/${userId}/cart`, {
            product,
            quantity
        })
        .then(res => res.data)
        .then(item => dispatch(addItem(item)))
        .catch(console.error.bind(console));

}