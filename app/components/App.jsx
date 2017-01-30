import React, { Component } from 'react';

export default class App extends Component {

  render() {
    return (
      {
       this.props.children && React.cloneElement(this.props.children, this.props)
      }
    )
  }
}
