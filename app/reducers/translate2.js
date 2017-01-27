
import axios from 'axios';
import Promise  from 'bluebird'
const API_KEY = 'AIzaSyC3kdlSGExiXj_bLAuDKXiNMeNciZuLE7w'

// **************************************************

const ADD_TRANSLATION = "ADD_TRANSLATION"

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
export const googleTranslate = (id, translateFrom, text) => {
  let allLanguages = ['en', 'fr', 'ko']

  let translateToLanguages = allLanguages.filter(translateTo => {
      return (translateTo !== translateFrom)
  })

  let translation1, translation2

  return dispatch => {
    // for (let i = 0; i < translateToLanguages.length; i++) {
      // let translateTo = translateTo[i]

      // let translation[i] =  axios.get(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${translateFrom}&target=${translateTo}&q=${text}`)
      let translation1 =  axios.get(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=en&target=fr&q=${text}`)
      let translation2 =  axios.get(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=en&target=ko&q=${text}`)
    // }

    // Promise.map([allLanguages], language => axios.get(``))

    Promise.all([translation1, translation2])
    .spread((translation1, translation2) => {
      return ([
        translation1.data.data.translations[0].translatedText,
        translation2.data.data.translations[0].translatedText
      ])
    })
    .spread((translation1, translation2) => {
      dispatch(addTranslation(id, text, translateFrom))
      dispatch(addTranslation(id, translation1, translateToLanguages[0]))
      dispatch(addTranslation(id, translation2, translateToLanguages[1]))
    })
  }

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
