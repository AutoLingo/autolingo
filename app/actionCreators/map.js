'use strict';

export const SET_COUNTRY = 'SET_COUNTRY';

export const setCountry = (selectedCountry, mapFitBounds, zoomNum) => {
  return { type: SET_COUNTRY, selectedCountry, mapFitBounds, zoomNum }
}
