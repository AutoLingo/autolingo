'use strict'

import { SET_USER, ADD_USER, REMOVE_USER } from '../actionCreators/user';

const initialState = { selectedUser: {firstName: '', lastName: '', email: '', primaryLanguage: 'en', dialect: 'en-US', country: 'America'} };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_USER:
		newState.selectedUser = action.selectedUser;
		break;
    case ADD_USER:
		newState.users = newState.users ? newState.users.concat([action.user]) : [action.user]
		break;
    case REMOVE_USER:
    	let index = newState.users.indexOf(action.user)
    	newState.users.splice(index,1)
	    break;
    default:
      return state;
  }
  return newState;
}
