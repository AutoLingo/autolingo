'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import 'rxjs';

import store from './store'
import App from './components/App'
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'
import MapContainer from './containers/MapContainer'
import NavbarContainer from './containers/NavbarContainer'
import ChatAppGroup from './components/ChatAppGroup'
import ChatAppVideo from './components/ChatAppVideo'
import InstructionMessage from './components/Instructions.jsx'
import CountryTransition from './components/CountryTransition.jsx'

// generated hash is used to match 2 users in a private chatroom for LiveChat
const generateHash = () => {
  if(!location.hash.replace('#', '').length) {
      location.href = location.href.split('#')[0] + '#' + (Math.random() * 100).toString().replace('.', '');
  }
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/group-chat" component={ChatAppGroup} />
        <Route path="/video-chat" component={ChatAppVideo} onEnter={generateHash} />
        <Route path="/instructions" component={InstructionMessage} />
        <Route path="/country-transition" component={CountryTransition} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
