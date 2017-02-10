'use strict';

export const SET_PRIMARY_USER_NAME = 'SET_PRIMARY_USER_NAME';
export const SET_SELECTED_USER_NAME = 'SET_SELECTED_USER_NAME';
export const SET_DIALECT = 'SET_DIALECT';

export const setPrimaryUserName = (name) => {
  return { type: SET_PRIMARY_USER_NAME, name }
}

export const setSelectedUserName = (name, room) => {
  return { type: SET_SELECTED_USER_NAME, name, room }
}

export const setUserLanguage = (primaryLanguage, dialect) => {
	return { type: SET_DIALECT, primaryLanguage, dialect }
}
