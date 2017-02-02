
const ADD_TO_MESSAGES = 'ADD_TO_MESSAGES'

export const addToMessages = (message) => ({
    type: ADD_TO_MESSAGES,
    message
})


export default function messagesReducer (initialState = [], action) {

    switch (action.type) {
        case ADD_TO_MESSAGES:
            let messages = initialState
            messages.push(message)
            return messages
        default:
            return initialState
            
    }
} 