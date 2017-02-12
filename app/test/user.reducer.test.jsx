import React from 'react';
import chai, {expect} from 'chai';
import faker from 'faker';

import userReducer from '../reducers/user';
import { createStore } from 'redux'

describe('Group Message Redux reducer', () => {
  let testingStore;
  beforeEach('Create testing store from reducer', () => {
      testingStore = createStore(userReducer);
  });

  it('has an initial state as described', () => {
      const currentStoreState = testingStore.getState();
      expect(currentStoreState.primaryUser).to.be.deep.equal({
        name: '',
        primaryLanguage: 'en',
        primaryLanguageFullName: 'English',
        dialect: 'en-US'
      });
      expect(currentStoreState.selectedUser).to.be.deep.equal({
        name: ''
      });
      expect(currentStoreState.userList).to.be.deep.equal([]);
  });

  it('creates a NEW state object on any dispatched action', () => {
    const currentStoreState = testingStore.getState();
    const name = faker.name.firstName();
    testingStore.dispatch({ type: 'SET_PRIMARY_USER_NAME', name })
    const subsequentStoreState = testingStore.getState();
    expect(currentStoreState).to.not.be.equal(subsequentStoreState);
  });
  describe('correctly updates the store when dispatching', () => {
    it('set primary user name action', () => {
      testingStore.dispatch({ type: 'ADD_MESSAGE', message: messageOne })
      testingStore.dispatch({ type: 'ADD_MESSAGE', message: messageTwo })
      const newState = testingStore.getState();
      expect(newState.messages).to.be.deep.equal([messageOne, messageTwo]);
    });
  });
});
