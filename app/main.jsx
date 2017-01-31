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

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/map" />
        <Route path="/translate" component={Translate} />
        <Route path="/language" component={LanguageMessage} />
        <Route path="/map" component={MapContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
