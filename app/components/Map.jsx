'use strict';

import React, { Component } from 'react';
import L from 'mapbox.js';
import countriesLayer from '../data/countryCoordinates.json'
console.log(countriesLayer);

export default class Map extends Component {
  constructor (props) {
    super(props);
    this.map;
    this.repositionMap = this.repositionMap.bind(this);
  }

  componentDidMount() {
    // Since we are creating a new map instance, the code below within componentDidMount can only be run once. So, the code needs to remain here, and can't be in the MapContainer file (since each change in state would re-run the code).
    L.mapbox.accessToken = 'pk.eyJ1IjoidGhsZWUxMTIyIiwiYSI6ImNpeWdyd2tycDAzZTUzMm12eDcybjJocTgifQ.r1njnGgI95MNlwVBTm1slw'
    var map = L.mapbox.map('map').setView([16.541430, 7.558594], 3);
    this.map = map
    // Use styleLayer to add a Mapbox style created in Mapbox Studio
    L.mapbox.styleLayer('mapbox://styles/thlee1122/ciyhpbj15003d2sluqt6ylrqa').addTo(map);

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    var geojson = L.geoJSON(countriesLayer, {
      style: function(feature) {
        switch(feature.properties.title) {
          case 'France': return {
            color: "#3ca0d3"
          };
          case 'China': return {
            color: "#f86767"
          };
          case "Korea": return {
            // color: "#e7857f"
            color: "red"
          };
          case "Spain": return {
            color: "#fa946e"
          };
          case "United States of America": return {
            color: "#9c89cc"
          }
        }
      },

      onEachFeature: countriesOnEachFeature
    }).addTo(map);

    //Map click function to show coordinates of the place when the mpa is clicked
    // var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }

    // //Need to change below click event when refactoring into react component
    // map.on('click', onMapClick);

    function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle(
        {
          weight: 5,
          color: 'yellow',
          fillColor: 'grey',
          fillOpacity: 0.2
        }
      )

      if(!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    }

    function resetHighlight(e) {
      geojson.resetStyle(e.target)
    }

    let mapThis = this;
    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds())
      const country = mapThis.props.findCountry(e.target.getBounds());
      mapThis.props.selectCountry(country.name, [country.fitBounds], country.zoomNum)
    }

    function countriesOnEachFeature(feature, layer) {
      layer.on(
        {
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        }
      )
    }

  }
  repositionMap(country) {
    let self = this;
    return function (event) {
      self.map.fitBounds([country.fitBounds], {maxZoom: country.zoomNum});
      self.map.dragging.enable();
      self.props.selectCountry(country.name, [country.fitBounds], country.zoomNum)
    }
  }

  render() {
    return (
      <div>
        <div id="country-buttons">
          <button id="fit-america" onClick={ this.repositionMap(this.props.america) }>Go to United States of America</button>
          <button id='fit-china' onClick={ this.repositionMap(this.props.china)}>Go to China</button>
          <button id='fit-spain' onClick={ this.repositionMap(this.props.spain)}>Go to Spain</button>
          <button id='fit-france' onClick={ this.repositionMap(this.props.france)}>Go to France</button>
          <button id='fit-korea' onClick={ this.repositionMap(this.props.korea)}>Go to Korea</button>
          <button id='zoomout' onClick={ this.repositionMap(this.props.zoomOut)}>Zoom out</button>
        </div>
      </div>
    )
  }
}
