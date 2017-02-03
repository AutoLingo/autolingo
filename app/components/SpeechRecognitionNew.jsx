import React, { Component } from 'react'
import SpeechRecognitionExternals from '../externals/SpeechRecognitionExternals'

class SpeechRecognition extends Component {
	componentDidMount() {
		SpeechRecognitionExternals()
	}

	render() {
		const diplayNone = {
			display: 'none'
		}

		return (	
			<div>
				
			</div>
		)	
	}
}

export default SpeechRecognition
