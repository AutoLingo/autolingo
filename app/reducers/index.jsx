import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  translations: require('./translate').default,
  map: require('./map').default
})

// auth: require('./auth').default,
export default rootReducer
