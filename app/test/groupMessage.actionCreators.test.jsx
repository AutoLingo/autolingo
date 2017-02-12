import React from 'react';
import chai, { expect } from 'chai';
import faker from 'faker';

import { addMessage, ADD_MESSAGE } from '../actionCreators/groupMessage';

const createRandomMessage = () => {
  return {
    id: 1,
    user: faker.name.firstName(),
    text: faker.lorem.sentence(),
    language: faker.lorem.word()
  };
};

describe('Group Message Redux action', () => {
  describe('returns expected action description for ', () => {
    it('add message', () => {
        const message = createRandomMessage();
        const actionDescriptor = addMessage(message);
        expect(actionDescriptor).to.be.deep.equal({type: ADD_MESSAGE, message: message});
    });
  });
});
