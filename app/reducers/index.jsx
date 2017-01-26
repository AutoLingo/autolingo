import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  translations: require('./translate').default
})

export default rootReducer
