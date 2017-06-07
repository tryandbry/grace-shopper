import axios from 'axios';

// actions
const SET_ITEMS = 'SET_ITEMS';

// action-creators
const setItems = (items) => ({
    type: SET_ITEMS,
    items
});

// reducer
const initialState = {
    items : [],
};
export default function reducer (state=initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case (SET_ITEMS):
            newState.items = action.items;
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