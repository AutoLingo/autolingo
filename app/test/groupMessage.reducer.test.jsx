import React from 'react';
import chai, {expect} from 'chai';
import faker from 'faker';

import { createStore } from 'redux'
import messageReducer from '../reducers/groupMessage';
import { addMessage, ADD_MESSAGE } from '../actionCreators/groupMessage';


const createRandomMessage = () => {
  return {
    id: 1,
    user: faker.name.firstName(),
    text: faker.lorem.sentence(),
    language: faker.lorem.word()
  };
};

describe('Group Message Redux reducer', () => {
  let testingStore = createStore(messageReducer);
  const messageOne = createRandomMessage();
  const messageTwo = createRandomMessage();

  it('has an initial state as described', () => {
      const currentStoreState = testingStore.getState();
      expect(currentStoreState.messages).to.be.deep.equal([]);
  });

  it('add message action appends a message to the message arrary', () => {
    testingStore.dispatch(addMessage(messageOne))
    testingStore.dispatch(addMessage(messageTwo))
    const newState = testingStore.getState();
    expect(newState.messages).to.be.deep.equal([messageOne, messageTwo]);
  });

  it('creates a new state object when any action is dispatched', () => {
    const currentStoreState = testingStore.getState();
    testingStore.dispatch(addMessage(messageOne))
    const subsequentStoreState = testingStore.getState();
    expect(currentStoreState).to.not.be.equal(subsequentStoreState);
  });
});
