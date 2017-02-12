import React from 'react';
import chai, { expect } from 'chai';
import faker from 'faker';

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

describe('User Redux action', () => {
  describe('returns expected action description for ', () => {
    it('set primary user name', () => {
        const name = faker.name.firstName();
        const actionDescriptor = setPrimaryUserName(name);
        expect(actionDescriptor).to.be.deep.equal({type: SET_PRIMARY_USER_NAME, name});
    });
    it('set selected user name', () => {
        const name = faker.name.firstName();
        const room = faker.address.country();
        const actionDescriptor = setSelectedUserName(name, room);
        expect(actionDescriptor).to.be.deep.equal({type: SET_SELECTED_USER_NAME, name, room});
    });
    it('set user language', () => {
        const primaryLanguage = faker.lorem.word();
        const dialect = faker.address.countryCode();
        const actionDescriptor = setUserLanguage(primaryLanguage, dialect);
        expect(actionDescriptor).to.be.deep.equal({type: SET_USER_LANGUAGE, primaryLanguage, dialect});
    });
    it('add to user list', () => {
        const randomName = () => faker.name.firstName();
        const users = [randomName(), randomName(), randomName()]
        const actionDescriptor = addToUserList(users);
        expect(actionDescriptor).to.be.deep.equal({type: ADD_TO_USER_LIST, users});
    });
    it('remove from user list', () => {
        const user = faker.name.firstName();
        const actionDescriptor = removeFromUserList(user);
        expect(actionDescriptor).to.be.deep.equal({type: REMOVE_FROM_USER_LIST, user});
    });
    it('change user name', () => {
        const oldName = faker.name.firstName();
        const newName = faker.name.firstName();
        const actionDescriptor = changeUserName(oldName, newName);
        expect(actionDescriptor).to.be.deep.equal({type: CHANGE_USER_NAME, oldName, newName});
    });
  });
});
