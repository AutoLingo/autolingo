'use strict';

export const SET_PRIMARY_USER_NAME = 'SET_PRIMARY_USER_NAME';
export const SET_SELECTED_USER_NAME = 'SET_SELECTED_USER_NAME';
export const SET_USER_LANGUAGE = 'SET_USER_LANGUAGE';
export const ADD_TO_USER_LIST = 'ADD_TO_USER_LIST';
export const REMOVE_FROM_USER_LIST = 'REMOVE_FROM_USER_LIST';
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';

export const setPrimaryUserName = (name) => {
  return { type: SET_PRIMARY_USER_NAME, name }
}

export const setSelectedUserName = (name, room) => {
  return { type: SET_SELECTED_USER_NAME, name, room }
}

export const setUserLanguage = (primaryLanguage, dialect) => {
	return { type: SET_USER_LANGUAGE, primaryLanguage, dialect }
}

export const addToUserList = (users) => {
  return { type: ADD_TO_USER_LIST, users }
}

export const removeFromUserList = (user) => {
  return { type: REMOVE_FROM_USER_LIST, user }
}

export const changeUserName = (oldName, newName) => {
  return { type: CHANGE_USER_NAME, oldName, newName }
}
