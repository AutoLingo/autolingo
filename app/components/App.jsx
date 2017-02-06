'use strict'
import React, { Component } from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import Map from '../containers/MapContainer';
import LanguageMessage from '../components/LanguageMessage';
// import InstructionMessage from '../components/Instructions.jsx';

export default function (props) {
    return (
    	<div>
        <NavbarContainer />
        <Map />
          {
           props.children && React.cloneElement(props.children, props)
          }
        </div>
    )
}
        // <LanguageMessage />
