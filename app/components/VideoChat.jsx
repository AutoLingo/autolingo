import React, { Component } from 'react'
import LiveChatExternals from '../externals/LiveChatExternals'

class VideoChat extends Component {

	componentDidMount() {
		LiveChatExternals()
	}

	componentDidUpdate() {
		LiveChatExternals()
	}


	render() {
		return (
			<section id="videochat-wrapper">
			    <div id="buttons-wrapper">
			        <button id="start-broadcasting" className="btn btn-primary btn-lg btn-block">Start Video Chat</button>
			        <button id="join-broadcast" className="btn btn-success btn-lg btn-block">Join Video Chat</button>
			    </div>
                <table id="rooms-list"></table>
                <div id="videos-container-wrapper">
	                <div id="videos-container"></div>
                </div>

			</section>
		)
	}
}

export default VideoChat
