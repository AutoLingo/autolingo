import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import {whoami} from './reducers/auth'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { googleTranslateEpic, googleTranslateEpic2, googleTranslateEpic3 } from './reducers/translate'


const rootEpic = combineEpics(
  googleTranslateEpic,
  googleTranslateEpic2,
  googleTranslateEpic3
)
const epicMiddleware = createEpicMiddleware(rootEpic)

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(createLogger(), epicMiddleware)))

export default store
