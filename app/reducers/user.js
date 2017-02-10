'use strict'

import { SET_PRIMARY_USER_NAME, SET_SELECTED_USER_NAME, SET_DIALECT } from '../actionCreators/user';

const initialState = {
  primaryUser: {
    name: '',
    primaryLanguage: 'en',
    dialect: 'en-US',
    country: 'America'
  },
  selectedUser: {
    name: ''
  }
 };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_PRIMARY_USER_NAME:
		  newState.primaryUser.name = action.name;
	    break;
    case SET_SELECTED_USER_NAME:
      newState.selectedUser.name = action.name;
      newState.selectedUser.room = action.room;
      break;
    case SET_DIALECT:
      newState.primaryUser.dialect = action.dialect
      newState.primaryUser.primaryLanguage = action.primaryLanguage
      break;
    default:
      return state;
  }
  return newState;
}
