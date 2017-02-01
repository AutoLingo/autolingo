'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import App from './components/App'
import 'rxjs';
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'
import Translate from './components/Translate'
import LanguageMessage from './components/LanguageMessage'
import MapContainer from './containers/MapContainer'
import ChatApp from './components/ChatApp'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/map" />
        <Route path="/translate" component={Translate} />
        <Route path="/language" component={LanguageMessage} />
        <Route path="/map" component={MapContainer} />
        <Route path="/chat" component={ChatApp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
