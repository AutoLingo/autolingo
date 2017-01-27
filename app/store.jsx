import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import {whoami} from './reducers/auth'
import { createEpicMiddleware } from 'redux-observable'
import { googleTranslateEpic } from './reducers/translate'

const epicMiddleware = createEpicMiddleware(googleTranslateEpic)

const store = createStore(rootReducer, applyMiddleware(createLogger(), epicMiddleware))

export default store

// Set the auth info at start
// store.dispatch(whoami())
