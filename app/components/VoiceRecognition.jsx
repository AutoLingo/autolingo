import React, { Component } from 'react';
import { langs } from '../data/languages';

export default class VoiceRecognition extends Component {
  constructor (props) {
    super(props);
    this.state = { didMount: false }
  }

  componentDidMount() {
    const showInfo = this.props.showInfo;

    showInfo('info_start');
  }

  render() {
    const startButton = this.props.startButton;

    return (
      <div>
        <div id="info">
          <p id="info_start">Click on the microphone icon and begin speaking.</p>
          <p id="info_speak_now">Speak now.</p>
          <p id="info_no_speech">No speech was detected. You may need to adjust your
            <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">
              microphone settings</a>.</p>
          <p id="info_no_microphone" style={{display:"none"}}>
            No microphone was found. Ensure that a microphone is installed and that
            <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">
            microphone settings</a> are configured correctly.</p>
          <p id="info_allow">Click the "Allow" button above to enable your microphone.</p>
          <p id="info_denied">Permission to use microphone was denied.</p>
          <p id="info_blocked">Permission to use microphone is blocked. To change,
            go to chrome://settings/contentExceptions#media-stream</p>
          <p id="info_upgrade">Web Speech API is not supported by this browser.
             Upgrade to <a href="//www.google.com/chrome">Chrome</a>
             version 25 or later.</p>
        </div>
        <div className="right">
          <button id="start_button" onClick={startButton}>
            <img id="start_img" src="mic.gif" alt="Start" />
          </button>
        </div>
        <div id="results">
          <span id="final_span" className="final"></span>
          <span id="interim_span" className="interim"></span>
          <p></p>
        </div>
      </div>
    )
  }
}
