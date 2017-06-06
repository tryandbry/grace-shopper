import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./auth').default,
    catalog: require('./catalog').default
})

export default rootReducer
