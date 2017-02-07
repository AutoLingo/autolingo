'use strict';

export const SET_USER_NAME = 'SET_USER_NAME';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_DIALECT = 'SET_DIALECT';

export const setUserName = (name) => {
  return { type: SET_USER_NAME, name }
}

export const setUserLanguage = (primaryLanguage, dialect) => {
	return { type: SET_DIALECT, primaryLanguage, dialect }
}
