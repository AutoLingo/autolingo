
import axios from 'axios';
import Promise  from 'bluebird'
const API_KEY = 'AIzaSyC3kdlSGExiXj_bLAuDKXiNMeNciZuLE7w'
import { Observable } from 'rxjs'

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
  return (
    {
      type: ADD_TRANSLATION,
      translation,
      language,
      id
    }
  )
}


// **************************************************
export const googleTranslateEpic = (action$) => {
  console.log('ACTION$', action$)

  return action$.ofType(TRANSLATE)
    .map(action => {
      let text = action.originalText
      return {type: ADD_TRANSLATION, translation: "testing", language: 'en', id: 1}

    // return Observable.from(
    //   axios.get(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=en&target=fr&q=${text}`)
    //   .then(response => {
    //     console.log(response)
    //     return "testing this"
    //   })
    //   // .then(response => response.data.translations[0].translatedText))
    //   .then(translatedText => addTranslation(1, translatedText, 'fr'))
    // )
  })
}




// **************************************************

export default function translateReducer(initialState = {}, action) {
  console.log('INITIALSTATE', initialState)
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
       newState = Object.assign({}, initialState, newTranslation)
       console.log('NEWSTATE', newState)
       break;

    default:
      return initialState
  }
    return newState
}
