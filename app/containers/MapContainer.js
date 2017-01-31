'use strict';

import { connect } from 'react-redux';
import Map from '../components/Map';
import { setCountry } from '../actionCreators/map';

function mapStateToProps (state, ownProps) {
  const america = { name: 'america', fitBounds: [38.68551, -99.49219], zoomNum: 5 }
  const china = { name: 'china', fitBounds: [37.23033, 105.77637], zoomNum: 5 }
  const spain = { name: 'spain', fitBounds: [40.66397, -3.40576], zoomNum: 6 }
  const france = { name: 'france', fitBounds: [46.83013, 2.59277], zoomNum: 6 }
  const korea = { name: 'korea', fitBounds: [35.88015, 127.97974], zoomNum: 7 }
  const zoomOut = { name: 'globe', fitBounds: [16.541430, 7.558594], zoomNum: 3 }
  // function findCountry(bounds) {
  //   let country = {};
  //   switch (bonds._northEast.lat) {
  //     case 53.540307:
  //       country = america
  //       break;
  //     default:
  //       return country;
  //   }
  //   return country
  // }
  return { setCountry, america, china, spain, france, korea, zoomOut,
    // findCountry
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  function selectCountry(selectedCountry, mapFitBounds, zoomNum) {
    dispatch(setCountry(selectedCountry, mapFitBounds, zoomNum))
  }
  return { selectCountry };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
