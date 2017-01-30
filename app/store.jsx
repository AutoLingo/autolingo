import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import {whoami} from './reducers/auth'
import { createEpicMiddleware } from 'redux-observable'
import { googleTranslateEpic } from './reducers/translate'

// const rootEpic = combineEpics(
//   googleTranslateEpic
// );

const epicMiddleware = createEpicMiddleware(googleTranslateEpic)

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(createLogger(), epicMiddleware)))
console.log('STORE', store)

export default store

// Set the auth info at start
// store.dispatch(whoami())
