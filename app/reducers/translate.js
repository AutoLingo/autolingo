
import axios from 'axios';

const API_KEY = 'AIzaSyC3kdlSGExiXj_bLAuDKXiNMeNciZuLE7w'

// **************************************************

const ADD_TRANSLATION = "ADD_TRANSLATION"

const addTranslation = (translation, language) => {
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
const googleTranslate = (translateFrom, text) => {
  let languages = ['en', 'fr', 'ko']
  let translation1, translation2

  return dispatch => {
    for (let i = 0; i < languages.length; i++) {
      let translateTo = languages[i]

      if (translateTo == translateFrom) { continue };

      translation+i =  axios.get(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${translateFrom}&target=${translateTo}&q=${text}`)
    }

    Promises.all([translation1, translation2])
    .spread((translation1, translation2) => {
      return ([translation1.data, translation2.data])
    })
    .spread((translation1, translation2) => {
      dispatch(addTranslation(translation1, langauge1))
      dispatch(addTranslation(translation2, language2))
      dispatch(addTranslation)(text, translateFrom)
    })
  }

}


// **************************************************

export default translateReducer((initialState = {}, action)) => {

  switch (action.type) {
    case ADD_TRANSLATION:
      let newTranslation = {
        action.id: {
          action.language: action.translation
        }
      }
      return Object.assign({}, initialState, newTranslation)

    default:
      return initialState
  }
}
