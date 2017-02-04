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
import LanguageMessage from './components/LanguageMessage'
import MapContainer from './containers/MapContainer'
import NavbarContainer from './containers/NavbarContainer'
import ChatAppGroup from './components/ChatAppGroup'
import ChatAppVideo from './components/ChatAppVideo'

// generated hash is used to match 2 users in a private chatroom for LiveChat
const generateHash = () => {
  if(!location.hash.replace('#', '').length) {
      location.href = location.href.split('#')[0] + '#' + (Math.random() * 100).toString().replace('.', '');
      location.reload();
  }
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/group-chat" component={ChatAppGroup} />
        <Route path="/video-chat" component={ChatAppVideo} onEnter={generateHash} />
        <Route path="/livechat" component={LiveChat} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
