import React, { Component } from 'react';
import socket from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import { connect } from 'react-redux';
// const socket = io.connect();



class ChatApp extends Component {
	constructor(props) {
		super(props)
		// console.log('PROPS',props);
		// this.state = {}

		this.messageReceive = this.messageReceive.bind(this)
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this._initialize = this._initialize.bind(this)
		this._userJoined = this._userJoined.bind(this)
		this._userLeft = this._userLeft.bind(this)
		this._userChangedName = this._userChangedName.bind(this)

	}



	//run below functions after the components are mounted on the page
	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('send:message', this.messageReceive);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
	}

	//set user with given name
	_initialize(data) {
		var {name} = data;
		// this.setState({users, user: name});
		// this.props.setUser(name);

		this.props.addUser(name)
	}


	//when the user joins the chat box, it will push the name of the user to the users array
	//message, "name of user" joined will rendered on the chat box
	_userJoined(data) {
	// 	var {users, messages} = this.state;
	console.log('USERJOINED DATA', data)
		var {name} = data;
	// 	users.push(name);
		// messages.push({
		// 	user: "LingoBo",
		// 	text: name + ' Joined'
		// });
	// 	this.setState({users, messages})
		// console.log('THIS.PROPS.ADDUSER', this.props.addUser)
		this.props.addUser(name)
	}

	//when the user leaves the chat box, it will push the name of the user to the users array
	//message, "name of user" left will rendered on the chat box
	_userLeft(data) {
	// 	var {users, messages} = this.state;
		var {name} = data;
	// var index = users.indexOf(name);
	// users.splice(index, 1);
	// messages.push({
	// 	user: 'LingoBot',
	// 	text: name + ' Left'
	// })
	// this.setState({users, messages})
		this.props.removeUser(name);
	}

	//Are we going to allow users to change name in the chat window? Need to discuss about this.
	_userChangedName(data) {
	// var {oldName, newName} = data;
	// var {users, messages} = this.state;
	// var index = users.indexOf(oldName);
	// //find the oldName with the index and replace it with newName
	// users.splice(index, 1, newName);
	// message.push({
	// 	user: 'APPLICATION BOT',
	// 	text: 'Change Name : ' + oldName + ' ==> ' + newName
	// });
	// this.setState({users, messages})
	}


	handleChangeName(newName) {
	// 	var oldName = this.state.user;
	// 	socket.emit('change:name', { name: newName }, (result) => {
	// 		if(!result) {
	// 			return alert('There was an error changing your name');
	// 		}
	// 		var {users} = this.state;
	// 		var index = users.indexOf(oldName);
	// 		users.splice(index, 1, newName);
	// 		this.setState({users, user: newName})
	// 	})
	}
// ************************************************************
	handleMessageSubmit(message) {
		socket.emit('send:message', {
			text: message.text,
			language: this.props.userLanguage,
			id: 1
		});
		
		this.props.addToMessages(message.text)
	}

	messageReceive(messageObject) {
		console.log('messageObject: ', messageObject);
		let id = messageObject && messageObject.id
		let originalLanguage = messageObject && messageObject.language
		let userLanguage = this.props.userLanguage
		let text = messageObject && messageObject.text

		if (originalLanguage === userLanguage) { 
			this.props.addToMessages(text)
		} else {
			this.props.translateActionCreator(id, originalLanguage, userLanguage, text)
		}

		
	}

// ************************************************************
	
	render() {
		let fr = this.props.translation && this.props.translation.fr
		let en = this.props.translation && this.props.translation.en
		let ko = this.props.translation && this.props.translation.ko

		let messages = this.props.messages
		let users = this.props.users

		return (
			<div id="chatbox-body">
				<UsersList
					users={users}
				/>	
				<MessageList
					messages={messages}
				/>
				<MessageForm
					onMessageSubmit={this.handleMessageSubmit}
					
				/>
				<ChangeNameForm
					onChangeName={this.handleChangeName}
				/>
			</div>
		)
	}
}


// ************************************************
import { translateActionCreator } from '../reducers/translate'
import { addToMessages } from '../reducers/messagesReducer'
import { setUser, addUser, removeUser } from '../actionCreators/user'
// console.log('ADDUSER', addUser)


const mapStateToProps = state => {
	let translation = state.translations[1] && state.translations[1]
	let userLanguage = state.user.selectedUser.primaryLanguage
	let users = state.user.users

	return { 
		translation,
		userLanguage,
		messages: state.messages,
		users
 	}
}

// const mapDispatchToProps = dispatch => ({translateActionCreator})

export default connect(mapStateToProps, {
	translateActionCreator, 
	addToMessages, 
	addUser, 
	removeUser,
	setUser
})(ChatApp);










