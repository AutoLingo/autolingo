
import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'
import { googleTranslate } from '../reducers/translate'


class Translate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let input = e.target.value
    this.props.translateActionCreator(1, 'en', input)
  }




  render () {
    let text = this.state.text
    let handleChange = this.handleChange

    return (
      <div>
        <input name="input" type='textarea' onChange={handleChange}></input>

        <h2> {
                this.props.translations[1] && (
                <div>
                  <br /> {this.props.translations[1].en}
                  <br /> {this.props.translations[1].fr}
                  <br /> {this.props.translations[1].ko}
                </div>
              )
            } </h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let translations = state.translations

  return {
    translations
  }
}

import { translateActionCreator } from '../reducers/translate'

export default connect(mapStateToProps, {translateActionCreator})(Translate)
