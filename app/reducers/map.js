'use strict'

import { SET_COUNTRY } from '../actionCreators/map';

const initialState = { selectedCountry: '', mapFitBounds:[[]], zoomNum: 0 };

export default function mapReducer(initialState = {}, action) {
  let newState = Object.assign({}, initialState)
  switch (action.type) {
    case SET_COUNTRY:
      newState.selectedCountry = action.selectedCountry;
      newState.mapFitBounds = action.mapFitBounds;
      newState.zoomNum = action.zoomNum;
      break;
    default:
      return initialState;
  }
  return newState
}
