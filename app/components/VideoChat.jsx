import React, { Component } from 'react'
import LiveChatExternals from '../externals/LiveChatExternals' 

class VideoChat extends Component {

	componentDidUpdate() {
		LiveChatExternals()
	}

	render() {
		return (
			<section>
			    <section>
			        <button id="start-broadcasting" className="setup">Start Video Chat</button>
			    </section>
                <table id="rooms-list"></table>
				<div id="videos-container"></div>
			</section>
		)
	}
}

export default VideoChat
