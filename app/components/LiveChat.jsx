import React from 'react'
import VideoChat from './VideoChat'
// import SpeechRecognition from './SpeechRecognition'

//LiveChat component is the one-on-one private chat with webcam and 
// text input with speech-to-text and translation on receiver's end
// to their language

// Need to add text chat component
// auto connect the users instead of buttons.

const LiveChat = (props) => (
	<article>
		<VideoChat />
		{/*<SpeechRecognitionNew />*/}

	</article>
)

export default LiveChat
