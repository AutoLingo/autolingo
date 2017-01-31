'use strict';

import React, { Component } from 'react';
import L from 'mapbox.js';
import countriesLayer from '../data/countryCoordinates.json'
console.log(countriesLayer);

export default class Map extends Component {
  componentDidMount() {
    console.log(L.mapbox)
    
    L.mapbox.accessToken = 'pk.eyJ1IjoidGhsZWUxMTIyIiwiYSI6ImNpeWdyd2tycDAzZTUzMm12eDcybjJocTgifQ.r1njnGgI95MNlwVBTm1slw'
    var map = L.mapbox.map('map').setView([16.541430, 7.558594], 3);

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

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds())
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

    //functions for fit buttons
    document.getElementById('fit-america').addEventListener('click', function() {
          map.fitBounds([[
              38.68551, -99.49219
          ]], {maxZoom: 5});
          map.dragging.enable();
      }
    );

    document.getElementById('fit-china').addEventListener('click', function() {
          map.fitBounds([[
              37.23033, 105.77637
          ]], {maxZoom: 5});
          map.dragging.enable();
      }
    );

    document.getElementById('fit-spain').addEventListener('click', function() {
          map.fitBounds([[
              40.66397, -3.40576
          ]], {maxZoom: 6});
          map.dragging.enable();
      }
    );

    document.getElementById('fit-france').addEventListener('click', function() {
          map.fitBounds([[
              46.83013, 2.59277
          ]], {maxZoom: 6});
          map.dragging.enable();
      }
    );

    document.getElementById('fit-korea').addEventListener('click', function() {
          map.fitBounds([[
              35.88015, 127.97974
          ]], {maxZoom: 7});
          map.dragging.enable();
      }
    );

    document.getElementById('zoomout').addEventListener('click', function() {
          map.fitBounds([[
              16.541430, 7.558594
          ]], {maxZoom: 3});
          map.dragging.enable();
      }
    );
  }

  render() {
    
    return (
      <div>
        <div id="country-buttons">
          <button id="fit-america">Go to United States of America</button>
          <button id='fit-china'>Go to China</button>
          <button id='fit-spain'>Go to Spain</button>
          <button id='fit-france'>Go to France</button>
          <button id='fit-korea'>Go to Korea</button>
          <button id='zoomout'>Zoom out</button>
        </div>
      </div>
    )
  }
//
}
