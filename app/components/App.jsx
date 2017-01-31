import React, { Component } from 'react';

export default function (props) {
    return (
    	<div>
    		
	      {
	       props.children && React.cloneElement(props.children, props)
	      }
    	</div>
    )
}
