import axios from 'axios';

// actions
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

// action-creators
const setItems = (items) => ({
    type: SET_ITEMS,
    items
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
        case (SET_ITEMS):
            newState.items = action.items;
            break;
        case (ADD_ITEM):
            newState.item = action.item;
            break;
        default:
            return state;
    }
    return newState;
}

// dispatcher

export const getItem = (product, quantity, userId) => {
    return dispatch => axios
        .post(`/api/user/${userId}/cart`, {
            product,
            quantity,
            userId
        })
        .then(res => res.data)
        .then(item => dispatch(addItem(item)))
        .catch(()=>console.log('error in getItem'));
}
