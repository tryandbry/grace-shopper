import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./auth').default,
    catalog: require('./catalog').default,
    product: require('./product').default,
})

export default rootReducer
