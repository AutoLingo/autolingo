'use strict';

export const SET_USER = 'SET_USER';

export const setUser = (selectedUser) => {
  return { type: SET_USER, selectedUser }
}
