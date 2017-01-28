
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
    .debounceTime(500)
    .mergeMap(action => {
        let originalLanguage = action.language
        let text = action.originalText


        let french = ajax.getJSON(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${originalLanguage}&target=fr&q=${text}`)
        let korean = ajax.getJSON(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${originalLanguage}&target=ko&q=${text}`)
        let english = ajax.getJSON(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${originalLanguage}&target=en&q=${text}`)

        switch (originalLanguage) {
          case 'en':
            return Observable.combineLatest(french, korean, (fr, ko) => [text, fr, ko])
          case 'fr':
            return Observable.combineLatest(english, korean, (en, ko) => [text, en, ko])
          case 'ko':
            return Observable.combineLatest(english, french, (en, fr) => [text, en, fr])
          default:
            return []
        }
    })
    .map(responseArray => {

      for (var i = 1; i < responseArray.length; i++) {
        return responseArray[i]
      }
      responseArray.forEach(translation => )
      let convertedText = response[0].data.translations[0].translatedText
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

       newState = Object.assign({}, initialState, { [id]: newTranslation} )
       console.log('NEWSTATE', newState)
       break;

    default:
      return initialState
  }
    return newState
}
