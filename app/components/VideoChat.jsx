import React, { Component } from 'react'
import LiveChatExternals from '../externals/LiveChatExternals' 

class VideoChat extends Component {
	componentDidMount() {
		LiveChatExternals()
	}

	render() {
		return (
			<section>
			    <section>
			        <input type="text" id="your-name" placeholder="your-name" />
			        <button id="start-broadcasting" className="setup">Start Video Chat</button>
			    </section>

				<div id="videos-container">REPLACE VIDEOS CONTAINER</div>
			</section>
		)
	}
}

export default VideoChat



                // document.querySelector('#start-broadcasting').onclick = function() {
                //     this.disabled = true;
                //     getUserMedia(function(stream) {
                //         peer.addStream(stream);
                //         peer.startBroadcasting();
                //     });
                // };


                // document.querySelector('#your-name').onchange = function() {
                //     console.log('peer.userid', this.value);
                //     peer.userid = this.value;
                // };

