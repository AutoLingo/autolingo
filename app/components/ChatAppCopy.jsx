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
	}



	//run below functions after the components are mounted on the page
	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('send:message', this.messageReceive);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
		console.log('THIS.PROPS',this.props)

	}

	//set user with given name
	_initialize(data) {
		var {users, name} = data;
		// this.setState({users, user: name});
	}

// ************************************************************
	handleMessageSubmit(message) {
		// var {messages} = this.state;
		// messages.push(message);

		//send message data through socket
		socket.emit('send:message', {
			text: message.text,
			language: 'en',
			id: 1
			}
		);
	}

	//push the given message into messages array
	messageReceive(messageObject) {
		let id = messageObject && messageObject.id
		let language = messageObject && messageObject.language
		let text = messageObject && messageObject.text

		this.props.translateActionCreator(id, language, text)
		
	}

// ************************************************************

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
	
	render() {
		
		let messages = this.props.messages
		let fr = this.props.translation && this.props.translation.fr
		let en = this.props.translation && this.props.translation.en
		let ko = this.props.translation && this.props.translation.ko
		console.log('ko ', ko);
		return (
			<div id="chatbox-body">
				
				<MessageList
					messages={[en, fr, ko]}
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

	return { 
		translation,
		messages: state.messages

 	}
}

// const mapDispatchToProps = dispatch => ({translateActionCreator})

export default connect(mapStateToProps, {translateActionCreator, addToMessages})(ChatApp);










