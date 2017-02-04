'use strict';

export const SET_INTERIM_TRANSCRIPT = 'SET_INTERIM_TRANSCRIPT';
export const ADD_FINAL_TRANSCRIPT = 'ADD_FINAL_TRANSCRIPT';

export const setInterimTranscript = (interimTranscript) => {
  return { type: SET_INTERIM_TRANSCRIPT, interimTranscript }
}
export const addFinalTranscript = (finalTranscript) => {
  return { type: ADD_FINAL_TRANSCRIPT, finalTranscript }
}
