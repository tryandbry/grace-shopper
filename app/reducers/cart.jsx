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

// user: gets cart from db, saves it to session and to store
// guest: saves empty cart to session and store
const backendRoute = (userId) => 
    isNaN(userId)
    ? '/api/guest/cart'
    : `/api/user/${userId}/cart`

// action-dispatcher
export const getCart = (userId) => dispatch => axios
    .get(backendRoute(userId))
    .then(res => res.data)
    .then(cart => dispatch(setCart(cart)))
    .catch(console.error.bind(console));

export const getItem = (product, quantity, userId) => dispatch => axios
    .post(backendRoute(userId), { product, quantity })
    .then(res => res.data)
    .then(item => dispatch(addItem(item)))
    .catch(() => console.log('error in getItem'));

// export const editItem = (userId) => {
//
// }
// export const deleteItem
