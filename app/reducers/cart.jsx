import axios from 'axios';

// actions
const SET_CART = 'SET_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

// action-creators
const setCart = cart => ({
    type: SET_CART,
    cart
});
const addItem = item => ({
    type: ADD_ITEM,
    item
})
const removeItem = item => ({
    type: REMOVE_ITEM,
    item
});
const updateItem = (productId, quantity) => ({
    type: UPDATE_ITEM, 
    productId,
    quantity
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
        case (REMOVE_ITEM):
            const productId = action.item.product.id;
            // newState.item = action.item;
            newState.items = state
                .items
                .filter(item => item.product.id !== productId);
            break;
        case (UPDATE_ITEM):
            newState
                .items
                .filter(item => (item.product.id == action.productId))[0]
                .quantity = action.quantity
            break;
        default:
            return state;
    }
    return newState;
}

// user: gets cart from db, saves to store
// guest: saves empty cart to session and store
const backendRoute = (userId) => 
    isNaN(userId)
    ? '/api/guest/cart'
    : `/api/user/${userId}/cart`

const resToData = (res) => res.data

// action-dispatcher
export const getCart = (userId) => dispatch => axios
    .get(backendRoute(userId))
    .then(resToData)
    .then(cart => dispatch(setCart(cart)))
    .catch(console.error.bind(console));

export const postItem = (product, quantity, userId) => dispatch => axios
    .post(backendRoute(userId), { product, quantity })
    .then(resToData)
    .then(item => dispatch(addItem(item)))
    .catch(() => console.log('error in getItem'));

export const deleteItem = (item, userId) => dispatch => axios
    .delete(backendRoute(userId) + `/${item.product.id}`)
    .then(() => dispatch(removeItem(item)))
    .catch(() => console.log('error in deleteItem'));

export const putItem = (productId, quantity, userId) => dispatch => axios
    .put(backendRoute(userId) + `/${productId}`, { quantity })
    .then(resToData)
    .then(item => dispatch(updateItem(productId, quantity)))
    .catch(() => console.log('error in putItem'))




