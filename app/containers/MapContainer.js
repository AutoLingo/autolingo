'use strict';

import { connect } from 'react-redux';
import Map from '../components/Map';
var L = require('leaflet');
// var mapbox = require('mapbox');
// import L from 'leaflet';
// import mapbox from 'mapbox';

function mapStateToProps (state, ownProps) {
  // console.log('L',L)
  // console.log('mapbox', mapbox)

  return {};
}

function mapDispatchToProps (dispatch, ownProps) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
