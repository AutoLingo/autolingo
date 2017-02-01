import React from 'react';

//Change name of the form and pass the information to the callback of its parent component, ChatApp for rendering and emitting to the server
var ChangeNameForm = React.createClass({
	//start with empty text
	getInitialState() {
		return {
			newName: ''
		}
	},

	handleSubmit(e) {
		e.preventDefault();
		var newName = this.state.newName;
		//Connects to ChatApp component
		this.props.onChangeName(newName);
		//Set the state of the text to empty string so that next inputted text value can be hanled in the state
		this.setState({ newName: '' })
	},

	onKey(e) {
		//change the state of text to inputted value
		this.setState({ newName: e.target.value })
	},

	render() {
		return (
			<div className="change_name_form">
				<h3>Change Name</h3>
				<form onSubmit={this.handleSubmit}>
					<input
						onChange={this.onKey}
						value={this.state.newName}
					/>
				</form>
			</div>
		)
	}
})

export default ChangeNameForm