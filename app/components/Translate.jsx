
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
    this.setState (
      {
        text: e.target.value
      }
    )

    let googleTranslate = this.props.googleTranslate
    let text = this.state.text

    googleTranslate(1, 'en', text)
  }

  render () {
    let text = this.state.text
    let handleChange = this.handleChange

    return (
      <input name="input" type='textarea' value={text} onChange={handleChange}></input>

    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    googleTranslate: (id, translateFrom, text) => dispatch(googleTranslate(id, translateFrom, text))
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Translate)
