'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import App from './components/App'
import SingleChat from './components/SingleChat'
import 'rxjs';
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'
import Translate from './components/Translate'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/singlechat" component={SingleChat} />
      <Route path="/" component={App}>
        <IndexRedirect to="/translate" />
        <Route path="/translate" component={Translate} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
