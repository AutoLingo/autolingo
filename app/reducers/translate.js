
import Promise  from 'bluebird'
const API_KEY = 'AIzaSyC3kdlSGExiXj_bLAuDKXiNMeNciZuLE7w'
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax';

// **************************************************

const ADD_TRANSLATION = "ADD_TRANSLATION"
const TRANSLATE = "TRANSLATE"

// Fed into the googleTranslateEpic
export const translateActionCreator = (id, language, originalText) => {
  return (
    {
      type: TRANSLATE,
      originalText,
      id
    }
  )
}

// Dispatched from the epic to store
const addTranslation = (id, translation, language) => {
  return {
      type: ADD_TRANSLATION,
      translation,
      language,
      id
    }
}


// **************************************************
export const googleTranslateEpic = (action$) => {
  return action$.ofType(TRANSLATE)
    .mergeMap(action => {
        let text = action.originalText
      //  return Observable.merge(
        return ajax.getJSON(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=en&target=fr&q=${text}`)
    })
    .map(response => {
      console.log('RESPONSE', response)
      let convertedText = response.data.translations[0].translatedText
      return addTranslation(1, convertedText, 'fr')

    })
      // return {type: ADD_TRANSLATION, translation: "testing", language: 'en', id: action.id}


}




// **************************************************

export default function translateReducer(initialState = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_TRANSLATION:
      let id = action.id;
      let messageObject = initialState.id || {}
      console.log('MESSAGEOBJECT', messageObject)

      let newTranslation = Object.assign(messageObject, {
        [action.language]: action.translation
      });
      console.log('NEWTRANSLATION', newTranslation)

       newState = Object.assign(initialState, { [id]: newTranslation} )
       console.log('NEWSTATE', newState)
       break;

    default:
      return initialState
  }
    return newState
}
