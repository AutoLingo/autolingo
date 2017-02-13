'use strict';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const addMessage = (message, room) => {
  return { type: ADD_MESSAGE, message, room }
}
export const clearMessages = (messages) => {
	return { type: CLEAR_MESSAGES, messages }
}
export const clearMessages = (messages) => {
	return { type: CLEAR_MESSAGES, messages }
}
