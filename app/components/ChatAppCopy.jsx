import React, { Component } from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import { connect } from 'react-redux';
const socket = io.connect();

class ChatApp extends Component {
	constructor(props) {
		super(props)
		console.log('PROPS',props);
		this.state = {}

		this.messageReceive = this.messageReceive.bind(this)
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
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
		var {users, name} = data;
		// this.setState({users, user: name});
	}


	//when the user joins the chat box, it will push the name of the user to the users array
	//message, "name of user" joined will rendered on the chat box
	_userJoined(data) {
		var {users, messages} = this.state;
		var {name} = data;
		users.push(name);
		messages.push({
			user: "LingoBo",
			text: name + ' Joined'
		});
		this.setState({users, messages})
	}

	//when the user leaves the chat box, it will push the name of the user to the users array
	//message, "name of user" left will rendered on the chat box
	_userLeft(data) {
		var {users, messages} = this.state;
		var {name} = data;
		var index = users.indexOf(name);
		users.splice(index, 1);
		messages.push({
			user: 'LingoBot',
			text: name + ' Left'
		})
		this.setState({users, messages})
	}

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
	}


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
		let id = messageObject && messageObject.id
		let originalLanguage = messageObject && messageObject.language
		let userLanguage = this.props.userLanguage
		let text = messageObject && messageObject.text

		this.props.translateActionCreator(id, originalLanguage, userLanguage, text)
		
	}

// ************************************************************
	
	render() {
		
		let fr = this.props.translation && this.props.translation.fr
		let en = this.props.translation && this.props.translation.en
		let ko = this.props.translation && this.props.translation.ko
		
		let messages = this.props.messages
		return (
			<div id="chatbox-body">
				
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

const mapStateToProps = state => {
	let translation = state.translations[1] && state.translations[1]
	let userLanguage = state.user.selectedUser.primaryLanguage

	return { 
		translation,
		userLanguage,
		messages: state.messages
 	}
}

// const mapDispatchToProps = dispatch => ({translateActionCreator})

export default connect(mapStateToProps, {translateActionCreator, addToMessages})(ChatApp);










