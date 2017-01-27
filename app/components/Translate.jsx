
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
    this.setState ({ text: input })
  }




  render () {
    let text = this.state.text
    let handleChange = this.handleChange
    let googleTranslate = this.props.googleTranslate
    let fr = this.props.translations[1] ? this.props.translations[1].fr : null
    console.log('THIS.PROPS.TRANSLATIONS', this.props.translations)


    console.log('FR', fr)

    return (
      <div>
        <input name="input" type='textarea' onChange={handleChange}></input>

        <h2> {fr}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let translations = state.translations
  console.log('TRANSLATIONS', translations)

  return {
    translations
  }
}

import { translateActionCreator } from '../reducers/translate'

export default connect(mapStateToProps, {translateActionCreator})(Translate)
