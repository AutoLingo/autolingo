import React, { Component } from 'react';

export default function (props) {
    return (
    	<div>
              <div id='map'></div>
	      {
	       props.children && React.cloneElement(props.children, props)
	      }
    	</div>
    )
}
