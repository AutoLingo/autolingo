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
			<div className="message_form well bs-component">

				<form onSubmit={this.handleSubmit} className="form-horizontal">
				  <fieldset>
				    <div className="form-group">
				      <div className="col-md-12">
				        <input type="text"
				        	onChange={this.changeHandler}
							value={this.state.text}
							className="form-control" placeholder="Enter New Message" />
				      </div>
				      <div className="col-md-12">
				            <span className="help-block col-md-10">Your message will be translated for all users to their selected language.</span>
				      		<div className="col-md-2 btn-wrapper">
				      			<button type="submit" className="btn btn-primary">Send</button>
				      		</div>
				      </div>
				    </div>
				  </fieldset>
				</form>

			</div>
		)
	}
}

export default MessageForm;
