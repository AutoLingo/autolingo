import React from 'react';
import { browserHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'

class CountryTransition extends React.Component {
  componentDidMount() {
    const timeoutID = window.setTimeout(changeReactComponent, 2000);

    function changeReactComponent() {
      browserHistory.push('/group-chat');
      window.clearTimeout(timeoutID);
    }
  }
  render() {
    let selectedCountry = this.props.selectedCountry

    return (
      <div className="countryTransitionMsg">

        <div className="progress progress-striped active">
          <div className="progress-bar"></div>
        </div>

        <ReactCSSTransitionGroup
          transitionName="countryTransition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
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
