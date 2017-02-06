'use strict';

export const SET_USER = 'SET_USER';
export const SET_DIALECT = 'SET_DIALECT';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = (selectedUser) => {
  return { type: SET_USER, selectedUser }
}

export const addUser = (user) => {
	return { type: ADD_USER, user }
}

export const removeUser = (user) => {
	return { type: REMOVE_USER, user }
}

export const setDialect = (dialect) => {
  return { type: SET_DIALECT, dialect }
}

// **************************

// import { langs } from '../data/languages'

// export const showDialects = (language) => {
// 	let languageArray = langs.filter(langArray => langArray[0] === language)
	
// 	if (languageArray[1].length === 1) {
// 		return languageArray[1]
// 	} else {
// 		return 
// 	}

	
// }