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
    // this.repositionMap = this.repositionMap.bind(this);
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
    // map.setMaxBounds([
    //     [83, 190],
    //     [-83, -210]
    //   ])
      
    
    this.map = map;
    // Use styleLayer to add a Mapbox style created in Mapbox Studio
    L.mapbox.styleLayer('mapbox://styles/adam2222/ciyucouor002e2rpl7gut7p81').addTo(map);

    // map.dragging.disable();
    // map.touchZoom.disable();
    // map.doubleClickZoom.disable();
    // map.scrollWheelZoom.disable();
    // map.zoomControl.remove();

     geojson = L.geoJSON(countriesLayer, {
      onEachFeature: this.countriesOnEachFeature
    }).addTo(map);
      

    geojson.setStyle({opacity: 0, fillOpacity: 0})
  

    

    // Map click function to show coordinates of the place when the mpa is clicked
    // Don't erase this function, we might need this for future modification
   
    //Need to change below click event when refactoring into react component
    // map.on('click', onMapClick);

    //Add country markers
    // this.usaIcon = L.icon({
    //   iconUrl: 'APP/public/img/united-states.png'
    // });

    // this.chinaIcon = L.icon({
    //   iconUrl: 'APP/public/img/china.png'
    // });

    // this.franceIcon = L.icon({
    //   iconUrl: 'APP/public/img/france.png'
    // });

    // this.spainIcon = L.icon({
    //   iconUrl: 'APP/public/img/spain.png'
    // });

    // this.koreaIcon = L.icon({
    //   iconUrl: 'APP/public/img/south-korea.png'
    // })

    // this.usaMarker = L.marker([45.6981, -104.36035], {icon: this.usaIcon}).addTo(map);
    // this.chinaMarker = L.marker([42.23727, 98.84277], {icon: this.chinaIcon}).addTo(map);
    // this.franceMarker = L.marker([52.69116, -2.43896], {icon: this.franceIcon}).addTo(map);
    // this.spainMarker = L.marker([47.54952, -8.69141], {icon: this.spainIcon}).addTo(map);
    // this.koreaMarker = L.marker([45.07518, 122.11494], {icon: this.koreaIcon}).addTo(map);

    //*****************************************

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






