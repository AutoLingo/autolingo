'use strict'

import { SET_INTERIM_TRANSCRIPT, ADD_FINAL_TRANSCRIPT } from '../actionCreators/speech';

const initialState = { interimTranscript: '', finalTranscripts: [] };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_INTERIM_TRANSCRIPT:
      newState.interimTranscript = action.interimTranscript;
      break;
    case ADD_FINAL_TRANSCRIPT:
      newState.finalTranscripts = state.finalTranscripts.concat([action.finalTranscript]);
      break;
    default:
      return state;
  }
  return newState;
}
