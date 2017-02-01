import React from 'react';
import io from 'socket.io-client';
const socket = io.connect();

var ChatApp = React.createClass({
	//set empty array/string for users, messages, text
	getInitialState() {
		return {
			users: [],
			messages: [],
			text: ''
		}
	},

	//run below functions after the components are mounted on the page
	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageReceive);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
	},

	//set user with given name
	_initialize(data) {
		var {users, name} = data;
		this.setState({users, user: name});
	},

	//push the given message into messages array
	_messageReceive(message) {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages})
	},

	//when the user joins the chat box, it will push the name of the user to the users array
	//message, "name of user" joined will rendered on the chat box
	_userJoined(data) {
		var {users, messages} = this.state;
		var {name} = data;
		users.push(name);
		messages.push({
			user: "APPLICATION BOT",
			text: name + ' Joined'
		});
		this.setState({users, messages})
	},

	//when the user leaves the chat box, it will push the name of the user to the users array
	//message, "name of user" left will rendered on the chat box
	_userLeft(data) {
		var {users, messages} = this.state;
		var {name} = data;
		var index = users.indexOf(name);
		users.splice(index, 1);
		messages.push({
			user: 'APPLICATION BOT',
			text: name + ' Left'
		})
		this.setState({users, messages})
	},

	//Are we going to allow users to change name in the chat window? Need to discuss about this.
	_userChangedName(data) {
		var {oldName, newName} = data;
		var {users, messages} = this.state;
		var index = users.indexOf(oldName);
		//find the oldName with the index and replace it with newName
		users.splice(index, 1, newName);
		message.push({
			user: 'APPLICATION BOT',
			text: 'Change Name : ' + oldName + ' ==> ' + newName
		});
		this.setState({users, messages})
	},

	handleMessageSubmit(message) {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
		//send message data through socket
		socket.emit('send:message', message);
	},

	handleChangeName(newName) {
		var oldName = this.state.user;
		socket.emit('change:name', { name: newName }, (result) => {
			if(!result) {
				return alert('There was an error changing your name');
			}
			var {users} = this.state;
			var index = users.indexOf(oldName);
			users.splice(index, 1, newName);
			this.setState({users, user: newName})
		})
	},

	render() {
		return (
			<div>
				<UsersList
					users={this.state.users}
				/>
				<MessageList
					messages={this.state.messages}
				/>
				<MessageForm
					onMessageSubmit={this.handleMessageSubmit}
					user={this.state.user}
				/>
				<changeNameForm
					onChangeName={this.handleChangeName}
				/>
			</div>
		)
	}
})

export default ChatApp;










