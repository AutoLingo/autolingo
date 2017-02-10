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
    this.map;
    // this.repositionMap = this.repositionMap.bind(this);
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
      onEachFeature: this.countriesOnEachFeature
    }).addTo(map);

    geojson.setStyle({color: '#404040', fillColor: '#eee'})
  

    

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
      layer.setStyle(
        {
          weight: 3,
          color: 'yellow',
          fillColor: '#00BFFF',
          fillOpacity: 0.8
        }
      )

      if(!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    }

    resetHighlight(e) {
      console.log('Hello~~~~~~~!~!')
      geojson.setStyle({color: '#404040', fillColor: '#eee'})
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

    zoomToFeature(clickEvent) {
      let countryObject = clickEvent.target
      let countryName = countryObject.feature.properties.name
      let countryBounds = (countryObject.getBounds())

      // var layer = clickEvent.target;
      // layer.setStyle(
      //   {
      //     weight: 3,
      //     color: 'yellow',
      //     fillColor: '#3bb2d0',
      //     fillOpacity: 1.5
      //   }
      // )

      this.map.fitBounds(countryBounds)
      this.props.selectCountry(countryName)
      
      // this.props.removeLayer(this.usaMarker);
      // this.removeLayer(this.usaMarker);

      // this.map.removeLayer(this.usaMarker)
      // this.map.removeLayer(this.spainMarker)
      // this.map.removeLayer(this.chinaMarker)
      // this.map.removeLayer(this.koreaMarker)
      // this.map.removeLayer(this.franceMarker)
      browserHistory.push('/country-transition')
    }

  // repositionMap(country, map) {
  //   // console.log('map', map)
  //   // return (event) => {
  //     // console.log('this', this)
  //     // console.log('this.map', this.map);
  //     // if(!this.map) return "";
  //     console.log(this);
  //     this.map.fitBounds([country.fitBounds], {maxZoom: country.zoomNum});
  //     this.map.dragging.enable();
  //     this.props.selectCountry(country.name, [country.fitBounds], country.zoomNum)

  //     if (country.name === 'Globe') {
  //       //then put them back to right coordinates
  //       this.usaMarker = L.marker([45.6981, -104.36035], {icon: this.usaIcon}).addTo(this.map);
  //       this.chinaMarker = L.marker([42.23727, 98.84277], {icon: this.chinaIcon}).addTo(this.map);
  //       this.franceMarker = L.marker([52.69116, -2.43896], {icon: this.franceIcon}).addTo(this.map);
  //       this.spainMarker = L.marker([47.54952, -8.69141], {icon: this.spainIcon}).addTo(this.map);
  //       this.koreaMarker = L.marker([45.07518, 122.11494], {icon: this.koreaIcon}).addTo(this.map);

  //     }

  //     if(country.name=== 'USA' || country.name==="China" || country.name==="Spain" || country.name==="France" || country.name==="Korea") {
  //       this.map.removeLayer(this.usaMarker)
  //       this.map.removeLayer(this.spainMarker)
  //       this.map.removeLayer(this.chinaMarker)
  //       this.map.removeLayer(this.koreaMarker)
  //       this.map.removeLayer(this.franceMarker)
  //       // console.log(this.map)
  //   }
  // }

  render() {

   // console.log('hello~~~~')
   //  const zoomIn = this.repositionMap(this.props.country, this.map);
   //  zoomIn();
    return (
        <div className="container" id='map'></div>
    )
  }
}

          // <Link to={"/video-chat"}><button id="fit-america">Go to U.S.A</button></Link>





