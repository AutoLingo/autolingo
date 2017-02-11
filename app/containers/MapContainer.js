'use strict';

import { connect } from 'react-redux';
import Map from '../components/Map';
import { setCountry } from '../actionCreators/map';

function mapStateToProps (state, ownProps) {
  const america = { name: 'USA', fitBounds: [38.68551, -99.49219], zoomNum: 5 }
  const china = { name: 'China', fitBounds: [37.23033, 105.77637], zoomNum: 3 }
  const spain = { name: 'Spain', fitBounds: [40.66397, -3.40576], zoomNum: 6 }
  const france = { name: 'France', fitBounds: [46.83013, 2.59277], zoomNum: 6 }
  const korea = { name: 'Korea', fitBounds: [35.88015, 127.97974], zoomNum: 7 }
  const zoomOut = { name: 'Globe', fitBounds: [16.541430, 7.558594], zoomNum: 3 }

  function findCountry(bounds) {
    let country = {};
    switch (bounds._northEast.lat) {
      case 49.439556:
        country = america;
        break;
      case 53.540307:
        country = china;
        break;
      case 43.739352:
        country = spain;
        break;
      case 51.124212:
        country = france;
        break;
      case 38.634036:
        country = korea;
        break;
      default:
        return country;
    }
    return country
  }

  return { america, china, spain, france, korea, zoomOut, findCountry };
}

function mapDispatchToProps (dispatch, ownProps) {
  function selectCountry(selectedCountry) {
    dispatch(setCountry(selectedCountry))
  }

  return { selectCountry };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
