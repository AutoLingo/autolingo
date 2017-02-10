'use strict';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (message) => {
  return { type: ADD_MESSAGE, message }
}
