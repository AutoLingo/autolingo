import React from 'react';
import Message from './Message.jsx'
//MessageList will render each message
var MessageList = React.createClass({
	render() {
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
			</div>
		)
	}
})

export default MessageList