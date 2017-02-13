import React from 'react';

//Submit handler takes the message and gives it to the callback of its parent component, ChatApp for rendering and emitting to server
//Keep track of the mssage when you type and assign it to a property (text) in state
class MessageForm extends React.Component {
	constructor(props) {
		super(props)
		this.changeHandler = this.changeHandler.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {text: ''}
	}

	handleSubmit(e) {
		e.preventDefault();
		var message = {
			user: this.props.user,
			text: this.state.text,
			language: this.props.language,
			id: 1
		}
		//Connects to ChatApp component
		this.props.onMessageSubmit(message);
		//Set the state of the text to empty string so that next inputted text value can be hanled in the state
		this.setState({ text: '' })
	}

	changeHandler(e) {
		//change the state of text to inputted value
		this.setState({ text: e.target.value });
	}

	render() {
		return (
			<div className="message_form">
				<h3>Write New Message</h3>
				<form onSubmit={this.handleSubmit}>
					<input
						onChange={this.changeHandler}
						value={this.state.text}
						placeholder='Write new message'
					/>
				</form>
			</div>
		)
	}
}

export default MessageForm;
