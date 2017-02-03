'use strict'

import { FINAL_TRANSCRIPT } from '../actionCreators/speech';

const initialState = { final_transcript: '' };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case FINAL_TRANSCRIPT:
      newState.finalTranscript = action.finalTranscript;
      break;
    default:
      return state;
  }
  return newState;
}
