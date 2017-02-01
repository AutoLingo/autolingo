import React, { Component } from 'react'
import LiveChatExternals from '../externals/LiveChatExternals' 
// import SocketIO from '../externals/socketio'
// import PeerConnection from '../externals/PeerConnection'
// import io from 'socket.io-client';
// const socket = io.connect();

class VideoChat extends Component {
	componentDidMount() {
		// SocketIO()
		// PeerConnection()
		LiveChatExternals()
	}

	render() {
		return (
			<section>
			    <section>
			        <input type="text" id="your-name" placeholder="your-name" />
			        <button id="start-broadcasting" className="setup">Start Video Chat</button>
			    </section>
                <table id="rooms-list"></table>
				<div id="videos-container"></div>
			</section>
		)
	}
}

export default VideoChat
