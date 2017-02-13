'use strict';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const addMessage = (message) => {
  return { type: ADD_MESSAGE, message }
}
export const clearMessages = (messages) => {
	return { type: CLEAR_MESSAGES, messages }
}
