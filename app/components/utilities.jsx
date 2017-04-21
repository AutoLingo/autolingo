'use strict';

import React, { Component } from 'react';
import L from 'mapbox.js';
import countriesLayer from '../data/countryCoordinates.json'
import { Link } from 'react-router'

function repositionMap (country, map) {
    return (event) => {
      this.map.fitBounds([country.fitBounds], {maxZoom: country.zoomNum});
      this.map.dragging.disable();
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
      }
    }
  }

  export default repositionMap;
