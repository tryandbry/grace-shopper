import axios from 'axios';

// actions
const SET_BOM = 'SET_BOM';
const UNSET_BOM = 'UNSET_BOM';

// action-creators
const setBom = bom=>({type: SET_BOM,bom});
const unsetBom = bom=>({type: UNSET_BOM});

// initial state
const initialState = {
  shipping: "",
  status: "",
  items: [],
};

// reducer
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case (SET_BOM):
	    console.log("Bom reducer, SET_BOM:",action);
            newState.shipping = action.shipping;
            newState.status = action.status;
            newState.items = action.items.slice();
            break;
        case (UNSET_BOM):
            newState.shipping = null;
            newState.status = null;
            newState.items = [];
            break;
        default:
            return state;
    }
    return newState;
}

// dispatchers
export const fetchBom = id=>{
    return dispatch=>{
      axios.get(`/api/bom/${id}`)
      .then(bom=>{
	console.log('fetchBom result: ',bom);
	dispatch(setBom(bom));
      })
      .catch(console.error);
    }
}





      /*
      .post(`/api/user/${userId}/cart`, {
	  product,
	  quantity
      })
      .then(res => res.data)
      .then(item => dispatch(addItem(item)))
      .catch(console.error.bind(console));
      */
