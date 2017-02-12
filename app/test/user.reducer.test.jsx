import React from 'react';
import chai, {expect} from 'chai';
import faker from 'faker';

import { createStore } from 'redux'
import userReducer from '../reducers/user';
import {
  SET_PRIMARY_USER_NAME,
  SET_SELECTED_USER_NAME,
  SET_USER_LANGUAGE,
  ADD_TO_USER_LIST,
  REMOVE_FROM_USER_LIST,
  CHANGE_USER_NAME,
  setPrimaryUserName,
  setSelectedUserName,
  setUserLanguage,
  addToUserList,
  removeFromUserList,
  changeUserName
} from '../actionCreators/user';

const randomName = () => faker.name.firstName();

describe('User Redux reducer', () => {
  let testingStore;
  beforeEach('Create testing store from reducer', () => {
      testingStore = createStore(userReducer);
  });

  it('has an initial state as described', () => {
      const initialState = testingStore.getState();
      expect(initialState.primaryUser).to.deep.equal({
        name: '',
        primaryLanguage: 'en',
        primaryLanguageFullName: 'English',
        dialect: 'en-US'
      });
      expect(initialState.selectedUser).to.deep.equal({
        name: ''
      });
      expect(initialState.userList).to.deep.equal([]);
  });


  describe('when reducing on SET_PRIMARY_USER_NAME', () => {
    it('sets a new name for the primary user', () => {
      const name = randomName();
      testingStore.dispatch(setPrimaryUserName(name));
      const newState = testingStore.getState();
      expect(newState.primaryUser.name).equals(name);
    });

    it('it creates a new state object when an action is dispatched', () => {
      const previousState = testingStore.getState();
      testingStore.dispatch(setPrimaryUserName(randomName()));
      const newState = testingStore.getState();
      expect(previousState).to.not.equal(newState);
    });
  });

  describe('when reducing on SET_SELECTED_USER_NAME', () => {
    const name = randomName();
    const room = faker.address.country();
    it('sets a new name for the selected user', () => {
      testingStore.dispatch(setSelectedUserName(name, room));
      const newState = testingStore.getState();
      expect(newState.selectedUser.name).equals(name, room);
    });

    it('it creates a new state object when an action is dispatched', () => {
      testingStore.dispatch(setSelectedUserName(name, room));
      const previousState = testingStore.getState();
      testingStore.dispatch(setSelectedUserName(name, room));
      const newState = testingStore.getState();
      expect(previousState).to.not.equal(newState);
    });
  });

  describe('when reducing on SET_USER_LANGUAGE', () => {
    const primaryLanguage = 'fr';
    const dialect = 'fr-FR';
    it('sets a new primaryLanguage for the primaryUser', () => {
      testingStore.dispatch(setUserLanguage(primaryLanguage, dialect));
      const newState = testingStore.getState();
      expect(newState.primaryUser.primaryLanguage).equals(primaryLanguage);
      expect(newState.primaryUser.dialect).equals(dialect);
    });

    it('it creates a new state object when an action is dispatched', () => {
      const previousState = testingStore.getState();
      testingStore.dispatch(setUserLanguage(primaryLanguage, dialect));
      const newState = testingStore.getState();
      expect(previousState).to.not.equal(newState);
    });
  });

  describe('when reducing on ADD_TO_USER_LIST', () => {
    const userList = [randomName(), randomName(), randomName()]
    it('it adds the given user to the array of users in userList', () => {
      testingStore.dispatch(addToUserList(userList));
      const newState = testingStore.getState();
      expect(newState.userList).to.deep.equal(userList);
    });

    it('the updated array is actually a new array, and not just a mutation of the pervious array', () => {
      const oldState = testingStore.getState();
      const name = randomName();
      testingStore.dispatch(addToUserList(name));
      const newState = testingStore.getState();
      expect(newState.userList).to.not.equal(oldState.userList);
    });

    it('it creates a new state object when an action is dispatched', () => {
      const previousState = testingStore.getState();
      testingStore.dispatch(addToUserList(userList));
      const newState = testingStore.getState();
      expect(previousState).to.not.equal(newState);
    });
  });

  describe('when reducing on REMOVE_FROM_USER_LIST', () => {
    const nameToRemove = randomName();
    const nameOne = randomName();
    const nameTwo = randomName();
    const userList = [nameOne, nameToRemove, nameTwo];
    it('it removes the given name from the array of users in userList', () => {
      testingStore.dispatch(addToUserList(userList));
      const oldState = testingStore.getState();
      testingStore.dispatch(removeFromUserList(nameToRemove));
      const newState = testingStore.getState();
      expect(newState.userList).to.deep.equal([nameOne, nameTwo]);
    });

    it('the updated array is actually a new array, and not just a mutation of the pervious array', () => {
      testingStore.dispatch(addToUserList(userList));
      const oldState = testingStore.getState();
      testingStore.dispatch(removeFromUserList(nameToRemove));
      const newState = testingStore.getState();
      expect(newState.userList).to.not.equal(oldState.userList);
    });

    it('it creates a new state object when an action is dispatched', () => {
      testingStore.dispatch(addToUserList(userList));
      const previousState = testingStore.getState();
      testingStore.dispatch(removeFromUserList(nameToRemove));
      const newState = testingStore.getState();
      expect(previousState).to.not.equal(newState);
    });
  });

  describe('when reducing on CHANGE_USER_NAME', () => {
    const oldName = randomName();
    const newName = randomName();
    const nameOne = randomName();
    const nameTwo = randomName();
    const userList = [nameOne, oldName, nameTwo];

    it('it replaces the oldName with the new name, in the array of users in userList', () => {
      testingStore.dispatch(addToUserList(userList));
      const oldState = testingStore.getState();
      testingStore.dispatch(changeUserName(oldName, newName));
      const newState = testingStore.getState();
      expect(newState.userList.includes(newName)).to.be.true;
      expect(newState.userList.includes(oldName)).to.be.false;
    });

    it('the updated array is actually a new array, and not just a mutation of the pervious array', () => {
      testingStore.dispatch(addToUserList(userList));
      const oldState = testingStore.getState();
      testingStore.dispatch(changeUserName(oldName, newName));
      const newState = testingStore.getState();
      expect(newState.userList).to.not.equal(oldState.userList);
    });

    it('it creates a new state object when an action is dispatched', () => {
      testingStore.dispatch(addToUserList(userList));
      const previousState = testingStore.getState();
      testingStore.dispatch(changeUserName(oldName, newName));
      const newState = testingStore.getState();
      expect(previousState).to.not.equal(newState);
    });
  });
});
