'use strict'

import { SET_COUNTRY } from '../actionCreators/map';

const initialState = { selectedCountry: '', mapFitBounds:[[]], zoomNum: 0 };

export default function mapReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_COUNTRY:
      newState.selectedCountry = action.selectedCountry;
      break;
    default:
      return state;
  }
  return newState
}
