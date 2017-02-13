'use strict'

import { ADD_MESSAGE, CLEAR_MESSAGES } from '../actionCreators/groupMessage';

const initialState = { messages: [] };

export default function userReducer(state = initialState, action) {

  let newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_MESSAGE:
      let room = action.room
      let message = action.message

      if (newState[room]) {
        newState[room].messages = newState[room].messages.concat([message]);
      } else {
        newState[room] = { messages: [message] }
      }
      break;
    default:
      return state;
  }
  return newState;

}
