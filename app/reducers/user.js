'use strict'

import { SET_USER } from '../actionCreators/user';

const initialState = { selectedUser: {firstName: '', lastName: '', email: '', primaryLanguage: 'en', country: 'America'} };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_USER:
      newState.selectedUser = action.selectedUser;
      break;
    default:
      return state;
  }
  return newState;
}
