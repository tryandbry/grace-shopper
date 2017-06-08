import axios from 'axios';

// actions
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const SET_CART = 'SET_CART';

// action-creators
const setItems = items => ({
    type: SET_ITEMS,
    items
});
const addItem = item => ({
    type: ADD_ITEM,
    item
})
// const setCart = () => ({
//     type:
// });


// reducer
const initialState = {
    item: {},
    items: [],
};
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case (SET_ITEMS):
            newState.items = action.items;
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

// // action-dispatcher
// export const getItems = () => {
//     return dispatch => axios
//     .get('/api/');
// }

export const getItem = (userId, product, quantity) => {
    return dispatch => axios
        .post(`/api/user/${userId}/cart`, {
            product,
            quantity
        })
        .then(res => res.data)
        .then(item => dispatch(addItem(item)))
        .catch(console.error.bind(console));

}