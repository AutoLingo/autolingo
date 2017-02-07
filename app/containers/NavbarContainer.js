'use strict';

import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { setUserLanguage } from '../actionCreators/user';

function mapStateToProps (state, ownProps) {
  return {};
}

// function mapDispatchToProps (dispatch, ownProps) {
//   return {
//   };
// }

export default connect(mapStateToProps, { setUserLanguage })(Navbar);
