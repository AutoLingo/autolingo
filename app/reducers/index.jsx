import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  translations: require('./translate').default,
  map: require('./map').default,
  user: require('./user').default,
  speech: require('./speech').default,
  groupMessage: require('./groupMessage').default
})

// auth: require('./auth').default,
export default rootReducer
