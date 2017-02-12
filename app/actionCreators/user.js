'use strict';

export const SET_PRIMARY_USER_NAME = 'SET_PRIMARY_USER_NAME';
export const SET_SELECTED_USER_NAME = 'SET_SELECTED_USER_NAME';
export const SET_DIALECT = 'SET_DIALECT';
// export const SET_GROUP_USER = 'SET_GROUP_USER';
export const ADD_TO_USER_LIST = 'ADD_TO_USER_LIST';
export const REMOVE_FROM_USER_LIST = 'REMOVE_FROM_USER_LIST';
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';

// setPrimaryUserName
export const setPrimaryUserName = (name) => {
  return { type: SET_PRIMARY_USER_NAME, name }
}

// setSelectedUserName
export const setSelectedUserName = (name, room) => {
  return { type: SET_SELECTED_USER_NAME, name, room }
}

// setUserLanguage
export const setUserLanguage = (primaryLanguage, dialect) => {
	return { type: SET_DIALECT, primaryLanguage, dialect }
}

// export const setGroupUser = (user) => {
//   return { type: SET_GROUP_USER, user }
// }

// addToGroupUsers
export const addToUserList = (users) => {
  return { type: ADD_TO_USER_LIST, users }
}

// removeGroupUser
export const removeFromUserList = (user) => {
  return { type: REMOVE_FROM_USER_LIST, user }
}

// groupUserNameChange
export const changeUserName = (oldName, newName) => {
  return { type: CHANGE_USER_NAME, oldName, newName }
}
