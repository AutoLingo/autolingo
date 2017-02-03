'use strict';

export const INTERIM_TRANSCRIPT = 'INTERIM_TRANSCRIPT';

export const setInterimTranscript = (intermTranscript) => {
  return { type: INTERIM_TRANSCRIPT, intermTranscript }
}
