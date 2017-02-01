'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import App from './components/App'
import LiveChat from './components/LiveChat'
import 'rxjs';
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'
import Translate from './components/Translate'
import LanguageMessage from './components/LanguageMessage'
import MapContainer from './containers/MapContainer'
import ChatApp from './components/ChatApp'

const generateHash = () => {
  if(!location.hash.replace('#', '').length) {
      location.href = location.href.split('#')[0] + '#' + (Math.random() * 100).toString().replace('.', '');
      location.reload();
  }
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/livechat" component={LiveChat} onEnter={generateHash}/>
      <Route path="/" component={App}>
      <IndexRedirect to="/map" />
        <Route path="/map" component={MapContainer} >
          <Route path="/map" component={LanguageMessage} />
        </Route>
        <Route path="/translate" component={Translate} />
        <Route path="/language" component={LanguageMessage} />
        <Route path="/chat" component={ChatApp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
