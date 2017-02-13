'use strict';

import { connect } from 'react-redux';
import React from 'react';
import VoiceRecognition from '../components/VoiceRecognition';

import store from '../store'; //this is an antipattern but this container is special

const VoiceRecognitionContainer = (props) => {
  if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    } else {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onstart = function() {
        recognizing = true;
        showInfo('info_speak_now');
        start_img.src = 'mic-animate.gif';
      };
      recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
          start_img.src = 'mic.gif';
          showInfo('info_no_speech');
          ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
          start_img.src = 'mic.gif';
          showInfo('info_no_microphone');
          ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
          if (event.timeStamp - start_timestamp < 100) {
            showInfo('info_blocked');
          } else {
            showInfo('info_denied');
          }
          ignore_onend = true;
        }
      };
      recognition.onend = function() {

        recognizing = false;
        if (ignore_onend) {
          return;
        }
        start_img.src = 'mic.gif';
        if (!final_transcript) {
          showInfo('info_start');
          return;
        }
        showInfo('');
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
          var range = document.createRange();
          range.selectNode(document.getElementById('final_span'));
          window.getSelection().addRange(range);
        }
      };
      recognition.onresult = function(event) {
        let emitFinalTranscript = props.emitFinalTranscript
        let emitInterimTranscript = props.emitInterimTranscript
        let setInterimTranscript = props.setInterimTranscript
        let addFinalTranscript = props.addFinalTranscript
        let userLanguage = props.userLanguage
        var interim_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript = event.results[i][0].transcript;
            emitFinalTranscript(final_transcript, userLanguage)
          } else {
            interim_transcript += event.results[i][0].transcript;
            emitInterimTranscript(interim_transcript, userLanguage)
          }
        }
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
        if (final_transcript || interim_transcript) {
          showButtons('inline-block');
        }

      };
    }

    // ******************* end of recognition object *******************

  // ******************* start of speech functions object *******************

  var final_transcript = '';
  var recognizing = false;
  var ignore_onend;
  var start_timestamp;

  function upgrade() {
    start_button.style.visibility = 'hidden';
    showInfo('info_upgrade');
  }
  var two_line = /\n\n/g;
  var one_line = /\n/g;

  function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }
    var first_char = /\S/;

  function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
  }

  function startButton(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';

    // **********************SELECTING LANGUAGE FOR SPEECH RECOGNITION *****************************
    // GETTING DIALECT STRAIGHT FROM THE STORE BECAUSE THIS IS A STATELESS COMPONENT THAT REDUX CAN'T RERENDER
    recognition.lang = store.getState().user.primaryUser.dialect

    // *****************************

    recognition.start();
    ignore_onend = false;
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
    start_img.src = 'mic-slash.gif';
    showInfo('info_allow');
    showButtons('none');
    start_timestamp = event.timeStamp;
  }

  function showInfo(s) {
    if (s) {
      for (var child = info.firstChild; child; child = child.nextSibling) {
        if (child.style) {
          child.style.display = child.id == s ? 'inline' : 'none';
        }
      }
      info.style.visibility = 'visible';
    } else {
      info.style.visibility = 'hidden';
    }
  }

  var current_style;
  function showButtons(style) {
    if (style == current_style) {
      return;
    }
    current_style = style;
  }

  return (
    <VoiceRecognition showInfo={showInfo} startButton={startButton} />
  )

}


// ******************************************************

import { setInterimTranscript, addFinalTranscript } from '../actionCreators/speech';

function mapStateToProps (state, ownProps) {
  return { userDialect: state.user.primaryUser.dialect }
}

export default connect(mapStateToProps, {setInterimTranscript, addFinalTranscript})(VoiceRecognitionContainer);
