import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./auth').default,
    catalog: require('./catalog').default,
    product: require('./product').default,
    cart: require('./cart').default,
    bom: require('./bom').default,
    user: require('./user').default
})

export default rootReducer
