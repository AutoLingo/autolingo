import React from 'react';
import Message from './Message.jsx'
//MessageList will render each message
var MessageList = React.createClass({
	//scroll to the bottom of the chat box as the user types in new sentences
	scollToBottom() {
		const node = ReactDOM.findDOMNode(this.messagesEnd);
		node.scrollIntoView({behavior: "smooth"})
	},

	render() {
		// this.scrollToBottom && this.scrollToBottom()
		
		return (
			<div className="messages">
				<h2><strong>Live Conversation: </strong></h2>
				{
					//Need to have messages container/array in the database
					this.props.messages.map((message, i) => {
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

				{/* Dummy div component */}
				<div style={ {float: "left", clear: "both"} }
					ref={(el) => { this.messagesEnd = el; }}></div>
			</div>
		)
	}
})

export default MessageList