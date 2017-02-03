
const ADD_TO_MESSAGES = 'ADD_TO_MESSAGES'

export const addToMessages = (message) => ({
    type: ADD_TO_MESSAGES,
    message
})


export default function messagesReducer (initialState = [], action) {

    switch (action.type) {
        case ADD_TO_MESSAGES:
            return initialState.concat([action.message])
        default:
            return initialState
            
    }
} 