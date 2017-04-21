import React, { Component } from 'react';
import Message from './Message.jsx'
//MessageList will render each message
class MessageList extends Component {
	constructor(props) {
		super(props)
		// this.scrollToBottom = this.scrollToBottom.bind(this)
	}


	render() {
		let messages = this.props.messages

		return (
			<div>

					  {

					  	this.props.messages && this.props.messages.map((message, i) => {

					  		return (
					  			//render single message from Message.jsx component
					  			<Message
					  				key={i}
					  				user={message.user}
					  				text={message.text}
					  			/>
					  		)
					  	})
					  }

					  <div style={ {float: "left", clear: "both"} }
					  	ref={(el) => { this.messagesEnd = el; }}>
					  </div>

			</div>
		)
	}
}

export default MessageList
