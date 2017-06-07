import axios from 'axios';

//actions
const SET_PRODUCT = 'SET_PRODUCT';

//action-creators

const setProduct = product => ({
    type: SET_PRODUCT,
    product
});

// reducer

const initialState = {
    product: {}
};

export default function reducer(state = initialState, action) {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case (SET_PRODUCT):
            newState.product = action.product;
            break;
        default:
            return state
    }
    return newState;
}

// action-dispatcher

export const getProduct = productId => {
    return dispatch => axios
        .get(`/api/product/${productId}`)
        .then(res => res.data)
        .then(product => dispatch(setProduct(product)))
        .catch(console.error.bind(console));
}
