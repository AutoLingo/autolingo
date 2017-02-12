import React, { Component } from 'react';
import Message from './Message.jsx'
//MessageList will render each message
class MessageList extends Component {
	constructor(props) {
		super(props)
		// this.scrollToBottom = this.scrollToBottom.bind(this)
	}

	//scroll to the bottom of the chat box as the user types in new sentences
	// scollToBottom() {
	// 	const node = ReactDOM.findDOMNode(this.messagesEnd);
	// 	node.scrollIntoView({behavior: "smooth"})
	// }

	// componentDidMount() {
	//     this.scrollToBottom();
	// }

	// componentDidUpdate() {
	//     this.scrollToBottom();
	// }

	render() {
		// this.scrollToBottom && this.scrollToBottom()

		return (
			<div className="messages">

				<div className="panel panel-default">
				  <div className="panel-heading">
				    <h3 className="panel-title">Live Conversation</h3>
				  </div>
				  <div className="panel-body">
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

					  <div style={ {float: "left", clear: "both"} }
					  	ref={(el) => { this.messagesEnd = el; }}>
					  </div>

				  </div>
				</div>


				{/*<h2><strong>Live Conversation: </strong></h2>
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

				<div style={ {float: "left", clear: "both"} }
					ref={(el) => { this.messagesEnd = el; }}>
				</div>*/}


			</div>
		)
	}
}

export default MessageList
