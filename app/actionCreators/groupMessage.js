'use strict';

export const ADD_GROUP_MESSAGE = 'ADD_GROUP_MESSAGE';
export const SET_GROUP_USER = 'SET_GROUP_USER';
export const ADD_TO_GROUP_USERS = 'ADD_TO_GROUP_USERS';
export const REMOVE_GROUP_USER = 'REMOVE_GROUP_USER';
export const GROUP_USER_NAME_CHANGE = 'GROUP_USER_NAME_CHANGE';

export const addGroupMessage = (message) => {
  return { type: ADD_GROUP_MESSAGE, message }
}

export const setGroupUser = (user) => {
  return { type: SET_GROUP_USER, user }
}

export const addToGroupUsers = (user) => {
  return { type: ADD_TO_GROUP_USERS, user }
}

export const removeGroupUser = (user) => {
  return { type: REMOVE_GROUP_USER, user }
}

export const groupUserNameChange = (oldName, newName) => {
  return { type: GROUP_USER_NAME_CHANGE, oldName, newName }
}
