'use strict';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const addMessage = (message, room) => {
  return { type: ADD_MESSAGE, message, room }
}
