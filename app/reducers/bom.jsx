import axios from 'axios';

// actions
const SET_BOM = 'SET_BOM';
const UNSET_BOM = 'UNSET_BOM';

// action-creators
const setBom = payload=>({
  type: SET_BOM,
  bom : payload.bom,
  products : payload.products,
});
const unsetBom = bom=>({type: UNSET_BOM});

// initial state
const initialState = {
  id: -1,
  shipping: "",
  status: "",
  items: [],
  products: [],
};

// reducer
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case (SET_BOM):
            newState.id = action.bom.id;
            newState.shipping = action.bom.shipping;
            newState.status = action.bom.status;
            newState.items = action.bom.items.slice();
            newState.products = action.products.slice();
            break;
        case (UNSET_BOM):
            newState.id = null;
            newState.shipping = null;
            newState.status = null;
            newState.items = null;
            newState.products = null;
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
	return dispatch(setBom(bom.data));
      })
      .catch(console.error);
    }
}
