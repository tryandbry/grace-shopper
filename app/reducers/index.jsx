import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./auth').default,
    products: require('./catalog').default
})

export default rootReducer
