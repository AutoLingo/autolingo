
import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'

class Translate extends Component {
  constructor (props) {
    super(props)
    let state = {
      text: ""
    }
  }

  handleChange(e){
    this.setState (
      {
        text: e.target.value
      }

  )}

  render(
    return (
      <input name="input" type='textarea' value={this.state.text} onChange={handleChange}></input>



    )
  )

}

const mapStateToProps = (state) => {}
const mapDispatchToProps = (dispatch) => {}

const export default connect(mapStateToProps, mapDispatchToProps)(Translate)
