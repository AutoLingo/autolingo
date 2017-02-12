'use strict'

import languageList from '../data/languages'
import {
  SET_PRIMARY_USER_NAME,
  SET_SELECTED_USER_NAME,
  SET_USER_LANGUAGE,
  SET_GROUP_USER,
  ADD_TO_USER_LIST,
  REMOVE_FROM_USER_LIST,
  CHANGE_USER_NAME
} from '../actionCreators/user';

const initialState = {
  primaryUser: {
    name: '',
    primaryLanguage: 'en',
    primaryLanguageFullName: 'English',
    dialect: 'en-US'
  },
  selectedUser: {
    name: ''
  },
  userList: []
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
    case SET_USER_LANGUAGE:
      newState.primaryUser.primaryLanguage = action.primaryLanguage;
      newState.primaryUser.dialect = action.dialect;

      if ( action.primaryLanguage === 'zh-CN' ||  action.primaryLanguage === 'zh-TW') {
  			newState.primaryUser.primaryLanguageFullName = '中文'
  		} else {
  			newState.primaryUser.primaryLanguageFullName = languageList.filter( (lang) => {
  				return  action.primaryLanguage === lang[1][0].split('-')[0]
  			})[0][0]
  		}
      break;
    case ADD_TO_USER_LIST:
      newState.userList = action.users.slice();
      break;
    case REMOVE_FROM_USER_LIST:
      const users = newState.userList.slice();
      const userIndex = users.indexOf(action.user);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }
      newState.userList = users;
      break;
    case CHANGE_USER_NAME:
      const usersList = newState.userList.slice();
      const userIdx = usersList.indexOf(action.oldName);
      usersList[userIdx] = action.newName
      newState.userList = usersList;
      break;
    default:
      return state;
  }
  return newState;
}
