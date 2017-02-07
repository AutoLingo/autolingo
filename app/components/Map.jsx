'use strict';

import React, { Component } from 'react';
import L from 'mapbox.js';
import countriesLayer from '../data/countryCoordinates.json'
import LanguageMessage from './LanguageMessage';
import { Link } from 'react-router';
import repositionMap from './utilities.jsx';

var geojson;

export default class Map extends Component {
  constructor (props) {
    super(props);
    this.map;
    this.repositionMap = this.repositionMap.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.countriesOnEachFeature = this.countriesOnEachFeature.bind(this);
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

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.zoomControl.remove();

    geojson = L.geoJSON(countriesLayer, {
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

      onEachFeature: this.countriesOnEachFeature
    }).addTo(map);

    //Map click function to show coordinates of the place when the mpa is clicked
    //Don't erase this function, we might need this for future modification
    // var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }

    //Need to change below click event when refactoring into react component
    // map.on('click', onMapClick);

    //Add country markers
    this.usaIcon = L.icon({
      iconUrl: 'APP/public/img/united-states.png'
    });

    this.chinaIcon = L.icon({
      iconUrl: 'APP/public/img/china.png'
    });

    this.franceIcon = L.icon({
      iconUrl: 'APP/public/img/france.png'
    });

    this.spainIcon = L.icon({
      iconUrl: 'APP/public/img/spain.png'
    });

    this.koreaIcon = L.icon({
      iconUrl: 'APP/public/img/south-korea.png'
    })

    this.usaMarker = L.marker([45.6981, -104.36035], {icon: this.usaIcon}).addTo(map);
    this.chinaMarker = L.marker([42.23727, 98.84277], {icon: this.chinaIcon}).addTo(map);
    this.franceMarker = L.marker([52.69116, -2.43896], {icon: this.franceIcon}).addTo(map);
    this.spainMarker = L.marker([47.54952, -8.69141], {icon: this.spainIcon}).addTo(map);
    this.koreaMarker = L.marker([45.07518, 122.11494], {icon: this.koreaIcon}).addTo(map);

    //*****************************************

    this.L = L
  }

    highlightFeature(e) {
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

    resetHighlight(e) {
      geojson.resetStyle(e.target)
    }

    // let mapThis = this;


    countriesOnEachFeature(feature, layer) {
      layer.on(
        {
          mouseover: this.highlightFeature,
          mouseout: this.resetHighlight,
          click: this.zoomToFeature
        }
      )
    }

    zoomToFeature(e) {
      this.map.fitBounds(e.target.getBounds())
      const country = this.props.findCountry(e.target.getBounds());
      this.props.selectCountry(country.name, [country.fitBounds], country.zoomNum);
      // this.props.removeLayer(this.usaMarker);
      console.log(this);
      // this.removeLayer(this.usaMarker);

      this.map.removeLayer(this.usaMarker)
      this.map.removeLayer(this.spainMarker)
      this.map.removeLayer(this.chinaMarker)
      this.map.removeLayer(this.koreaMarker)
      this.map.removeLayer(this.franceMarker)
    }

  repositionMap(country, map) {
    // console.log('map', map)
    // return (event) => {
      // console.log('this', this)
      // console.log('this.map', this.map);
      // if(!this.map) return "";
      console.log(this);
      this.map.fitBounds([country.fitBounds], {maxZoom: country.zoomNum});
      this.map.dragging.enable();
      this.props.selectCountry(country.name, [country.fitBounds], country.zoomNum)

      if (country.name === 'globe') {
        //then put them back to right coordinates
        this.usaMarker = L.marker([45.6981, -104.36035], {icon: this.usaIcon}).addTo(this.map);
        this.chinaMarker = L.marker([42.23727, 98.84277], {icon: this.chinaIcon}).addTo(this.map);
        this.franceMarker = L.marker([52.69116, -2.43896], {icon: this.franceIcon}).addTo(this.map);
        this.spainMarker = L.marker([47.54952, -8.69141], {icon: this.spainIcon}).addTo(this.map);
        this.koreaMarker = L.marker([45.07518, 122.11494], {icon: this.koreaIcon}).addTo(this.map);

      }

      if(country.name=== 'america' || country.name==="china" || country.name==="spain" || country.name==="france" || country.name==="korea") {
        this.map.removeLayer(this.usaMarker)
        this.map.removeLayer(this.spainMarker)
        this.map.removeLayer(this.chinaMarker)
        this.map.removeLayer(this.koreaMarker)
        this.map.removeLayer(this.franceMarker)
        // console.log(this.map)
    }
  }

  render() {

   // console.log('hello~~~~')
   //  const zoomIn = this.repositionMap(this.props.country, this.map);
   //  zoomIn();
    return (
      <div>
        <div className="container" id='map'></div>
        <div id="country-buttons">
          <Link to={"/country-transition"}>
            <button id="fit-america" onClick={ ()=>this.repositionMap(this.props.america, this.map) }>Go to U.S.A</button>
          </Link>
          
          <Link to={"/country-transition"}>
            <button id='fit-china' onClick={ ()=>this.repositionMap(this.props.china, this.map) }>Go to China</button>
          </Link>
          
          <Link to={"/country-transition"}>
            <button id='fit-spain' onClick={ ()=>this.repositionMap(this.props.spain, this.map) }>Go to Spain</button>
          </Link>

          <Link to={"/country-transition"}>
            <button id='fit-france' onClick={ ()=>this.repositionMap(this.props.france, this.map) }>Go to France</button>
          </Link>

          <Link to={"/country-transition"}>
            <button id='fit-korea' onClick={ ()=>this.repositionMap(this.props.korea, this.map) }>Go to Korea</button>
          </Link>

          <Link to={"/country-transition"}>
            <button id='zoomout' onClick={ ()=>this.repositionMap(this.props.zoomOut, this.map) }>Zoom out</button>
          </Link>
        </div>
      </div>
    )
  }
}

          // <Link to={"/video-chat"}><button id="fit-america">Go to U.S.A</button></Link>

