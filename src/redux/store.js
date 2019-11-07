import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { createEpicMiddleware } from 'redux-observable'
import { createBrowserHistory } from 'history'

import logger from 'redux-logger'
import reducers from './reducers'
import rootEpic from './epics'

const history = createBrowserHistory()
const epicMiddleware = createEpicMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({
    ...reducers, 
    form: formReducer
  }),
  composeEnhancers(
    applyMiddleware(logger, epicMiddleware)
  )
)
epicMiddleware.run(rootEpic)

export {
  store,
  history
}