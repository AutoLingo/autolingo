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
			<div className="browser-landing">
			  <div className="compact marquee">
			    <div id="info">
			      <p id="info_start">
			        Click on the microphone icon and begin speaking for as long as you like.
			      </p>
			      <p id="info_speak_now" style={diplayNone}>
			        Speak now.
			      </p>
			      <p id="info_no_speech" style={diplayNone}>
			        No speech was detected. You may need to adjust your <a href=
			        "//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone
			        settings</a>.
			      </p>
			      <p id="info_no_microphone" style={diplayNone}>
			        No microphone was found. Ensure that a microphone is installed and that
			        <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">
			        microphone settings</a> are configured correctly.
			      </p>
			      <p id="info_allow" style={diplayNone}>
			        Click the "Allow" button above to enable your microphone.
			      </p>
			      <p id="info_denied" style={diplayNone}>
			        Permission to use microphone was denied.
			      </p>
			      <p id="info_blocked" style={diplayNone}>
			        Permission to use microphone is blocked. To change, go to
			        chrome://settings/contentExceptions#media-stream
			      </p>
			      <p id="info_upgrade" style={diplayNone}>
			        Web Speech API is not supported by this browser. Upgrade to <a href=
			        "//www.google.com/chrome">Chrome</a> version 25 or later.
			      </p>
			    </div>
			    <div id="div_start">
			      <button id="start_button" onClick={startButton(event)}><img alt="Start" id="start_img"
			      src="./mic.gif" /></button>
			    </div>
			    <div id="results">
			      <span className="final" id="final_span"></span> <span className="interim" id=
			      "interim_span"></span>
			    </div>

			    <div className="compact marquee" id="div_language">
			      <select id="select_language" onChange={updateCountry()}>
			        </select>&nbsp;&nbsp; <select id="select_dialect">
			        </select>
			    </div>
			  </div>
			</div>
		)	
	}
}

export default SpeechRecognition
