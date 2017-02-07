'use strict'

import { ADD_GROUP_MESSAGE, SET_GROUP_USER, ADD_TO_GROUP_USERS, REMOVE_GROUP_USER, GROUP_USER_NAME_CHANGE } from '../actionCreators/groupMessage';

const initialState = { messages: [], user: '', users: [] };

export default function userReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_GROUP_MESSAGE:
      newState.messages = newState.messages.concat([action.message]);
      break;
    case SET_GROUP_USER:
      newState.user = action.user;
      break;
    case ADD_TO_GROUP_USERS:
      newState.users = action.users;
      break;
    case REMOVE_GROUP_USER:
      const users = newState.users.slice(0);
      const userIndex = users.indexOf(action.user);
      users.splice(userIndex, 1);
      newState.users = users;
      break;
    case GROUP_USER_NAME_CHANGE:
      const usersList = newState.users.slice(0);
      console.log('usersList: ', usersList);
      const Idx = usersList.indexOf(action.oldName);
      console.log('oldName: ', action.oldName);
      console.log('Idx: ', Idx);
      usersList[Idx] = action.newName
      console.log('usersList after update', usersList);

      newState.users = usersList;
      break;
    default:
      return state;
  }
  return newState;
}
