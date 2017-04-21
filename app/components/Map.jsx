'use strict';

import React, { Component } from 'react';
import L from 'mapbox.js';
import countriesLayer from '../data/world'
import { Link } from 'react-router';
import repositionMap from './utilities.jsx';
import {browserHistory} from 'react-router'

var geojson;

export default class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {
      highlightedCountry: ""
    }
    this.map;
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.countriesOnEachFeature = this.countriesOnEachFeature.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this)
    this.usaMarker;
    this.chinaMarker;
    this.franceMarker;
    this.spainMarker;
    this.koreaMarker;
  }


  componentDidMount() {

    // Since we are creating a new map instance, the code below within componentDidMount can only be run once. So, the code needs to remain here, and can't be in the MapContainer file (since each change in state would re-run the code).
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWRhbTIyMjIiLCJhIjoiY2l5dGJhaW96MDAwcDJ3bzM0MXk2aTB0bSJ9.kgHNRDiGEmq12toljp2-kA'
    var map = L.mapbox.map('map').setView([16.541430, 7.558594], 3);


    this.map = map;
    // Use styleLayer to add a Mapbox style created in Mapbox Studio
    L.mapbox.styleLayer('mapbox://styles/adam2222/ciyucouor002e2rpl7gut7p81').addTo(map);

     geojson = L.geoJSON(countriesLayer, {
      onEachFeature: this.countriesOnEachFeature
    }).addTo(map);


    geojson.setStyle({opacity: 0, fillOpacity: 0})

    this.L = L
  }

    highlightFeature(e) {
      var layer = e.target;
      let country = layer.feature.properties.name

      this.setState({
        highlightedCountry: country
      })

      layer.setStyle(
        {
          weight: 3,
          fillColor: '#0082E6',
          fillOpacity: 0.8
        }
      )
      if(!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    }

    resetHighlight(e) {

      geojson.setStyle({ fillOpacity: 0 })
    }

    countriesOnEachFeature(feature, layer) {
      layer.on(
        {
          mouseover: this.highlightFeature,
          mouseout: this.resetHighlight,
          click: this.zoomToFeature
        }
      )
    }

    zoomToFeature(clickEvent) {
      let countryObject = clickEvent.target
      let countryName = countryObject.feature.properties.name
      let countryBounds = (countryObject.getBounds())

      this.map.fitBounds(countryBounds)
      this.props.selectCountry(countryName)
      browserHistory.push('/country-transition')
    }


  render() {
    return (
      <div>
        <div className="countryName lingo-blue">{this.state.highlightedCountry}</div>
        <div className="container" id='map'></div>
      </div>
    )
  }
}
