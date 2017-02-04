'use strict'

import { INTERIM_TRANSCRIPT } from '../actionCreators/speech';

const initialState = { interimTranscript: '' };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case INTERIM_TRANSCRIPT:
      newState.interimTranscript = action.interimTranscript;
      break;
    default:
      return state;
  }
  return newState;
}
