import React from 'react';
import {browserHistory} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CountryTransition extends React.Component {
  componentDidMount() {
    timeoutID = window.setTimeout(changeReactComponent, 2000);

    function changeReactComponent() {
      browserHistory.push('/video-chat');
      window.clearTimeout(timeoutID);
    }
  }
  render() {
    return (<div className="countryTransitionMsg">
      <ReactCSSTransitionGroup
        transitionName="countryTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <h1>Entering Chat Room...</h1>
      </ReactCSSTransitionGroup>
    </div>
    );
  }
}

export default CountryTransition
