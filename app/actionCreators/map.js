'use strict';

export const SET_COUNTRY = 'SET_COUNTRY';

export const setCountry = (selectedCountry) => {
  return { type: SET_COUNTRY, selectedCountry }
}
