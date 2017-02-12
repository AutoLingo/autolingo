import React from 'react';
import { browserHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'

class CountryTransition extends React.Component {
  componentDidMount() {
    const timeoutID = window.setTimeout(changeReactComponent, 4000);

    function changeReactComponent() {
      browserHistory.push('/group-chat');
      window.clearTimeout(timeoutID);
    }
  }
  render() {
    let selectedCountry = this.props.selectedCountry

    return (
      <div className="countryTransitionMsg">

        <ReactCSSTransitionGroup
          transitionName="countryTransition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <img src={`img/paperplane.gif?a=` + Math.random()} />
          <h1 className="lingo-grey">Entering {selectedCountry}</h1>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const selectedCountry = state.map.selectedCountry
  return {
    selectedCountry
  }
}
export default connect(mapStateToProps) (CountryTransition)
