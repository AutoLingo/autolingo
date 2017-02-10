'use strict'

import { ADD_MESSAGE } from '../actionCreators/groupMessage';

const initialState = { messages: [] };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_MESSAGE:
      newState.messages = newState.messages.concat([action.message]);
      break;
    default:
      return state;
  }
  return newState;
}
