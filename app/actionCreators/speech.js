'use strict';

export const INTERIM_TRANSCRIPT = 'INTERIM_TRANSCRIPT';

export const setInterimTranscript = (interimTranscript) => {
  return { type: INTERIM_TRANSCRIPT, interimTranscript }
}
