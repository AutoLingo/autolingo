
import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router'

class TranslateText extends Component {
  render () {
    return (
      <div>
        <input ref="translate-text" name="input" type='textarea'></input>
      </div>
    )
  }
}

export default TranslateText
