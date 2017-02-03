'use strict';

export const FINAL_TRANSCRIPT = 'FINAL_TRANSCRIPT';

export const setFinalTranscript = (finalTranscript) => {
  return { type: FINAL_TRANSCRIPT, finalTranscript }
}
