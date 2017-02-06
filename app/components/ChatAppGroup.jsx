import React from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import { addGroupMessage, setGroupUser, addToGroupUsers, removeGroupUser, groupUserNameChange } from '../actionCreators/groupMessage'
import { translateActionCreator } from '../reducers/translate'
import {connect} from 'react-redux';
const socket = io.connect('/group-chat');

class ChatAppGroup extends React.Component {
	//set empty array/string for users, messages, text
	constructor (props) {
		super(props)
		this.state = { socket: {} }
		this.dispatch = props.dispatch
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this.handleChangeName = this.handleChangeName.bind(this)
		this._initialize = this._initialize.bind(this)
		this._messageReceive = this._messageReceive.bind(this)
		this._userJoined = this._userJoined.bind(this)
		this._userLeft = this._userLeft.bind(this)
		this._userChangedName = this._userChangedName.bind(this)
	}

	//run below functions after the components are mounted on the page
	componentDidMount() {
		console.log("mounted")
		
		// this.setState({socket})
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageReceive);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
	}

	//set user with given name
	_initialize(data) {
		var {users, name} = data;
		this.dispatch(setGroupUser(name));
		this.dispatch(addToGroupUsers(users));
	}

	//push the given message into messages array
	_messageReceive(message) {
		// var {messages} = this.state;
		// messages.push(message);
		// this.setState({messages})
		console.log('MESSAGE', message)
		const userLanguage = this.props.userLanguage
		console.log('userLanguage', userLanguage)
		if (userLanguage === message.language) {
			// console.log('message receive')
			// console.log('USERLANGUAGE', userLanguage)
			// console.log('MESSAGE.LANGUAGEMESSAGE', message.language)
			this.dispatch(addGroupMessage(message))
		} else {
			const id = 1;
			const originalLanguage = message.language;
			const originalText = message.text;
			this.dispatch(translateActionCreator(id, originalLanguage, userLanguage, originalText))
		}
	}

	//when the user joins the chat box, it will push the name of the user to the users array
	//message, "name of user" joined will rendered on the chat box
	_userJoined(data) {
		// var {users, messages} = this.state;
		// var {name} = data;
		// users.push(name);
		// messages.push({
		// 	user: "LingoBot",
		// 	text: name + ' Joined'
		// });
		// this.setState({users, messages})
		var {name} = data;
		var userJoinMsg = {
			user: "LingoBot",
			text: name + ' Joined'
		};
		this.dispatch(addGroupMessage(userJoinMsg))
		this.dispatch(addToGroupUsers([name]))
	}

	//when the user leaves the chat box, it will push the name of the user to the users array
	//message, "name of user" left will rendered on the chat box
	_userLeft(data) {
		// var {users, messages} = this.state;
		// var {name} = data;
		// var index = users.indexOf(name);
		// users.splice(index, 1);
		// messages.push({
		// 	user: 'LingoBot',
		// 	text: name + ' Left'
		// })
		// this.setState({users, messages})
		var {name} = data;
		var userLeftMsg = {
			user: 'LingoBot',
			text: name + ' Left'
		}
		this.dispatch(addGroupMessage(userLeftMsg))
		this.dispatch(removeGroupUser(name))
	}

	//Are we going to allow users to change name in the chat window? Need to discuss about this.
	_userChangedName(data) {
		// var {oldName, newName} = data;
		// var {users, messages} = this.state;
		// var index = users.indexOf(oldName);
		// //find the oldName with the index and replace it with newName
		// users.splice(index, 1, newName);
		// messages.push({
		// 	user: 'APPLICATION BOT',
		// 	text: 'Change Name : ' + oldName + ' ==> ' + newName
		// });
		// this.setState({users, messages})

		var {oldName, newName} = data;
		var nameChangeMsg = {
			user: 'APPLICATION BOT',
			text: 'Change Name : ' + oldName + ' ==> ' + newName
		};
		this.dispatch(addGroupMessage(nameChangeMsg))
		this.dispatch(groupUserNameChange(oldName, newName))
	}

	handleMessageSubmit(message) {
		// var {messages} = this.state;
		// messages.push(message);
		// this.setState({messages});
		// //send message data through socket
		// this.state.socket.emit('send:message', message);
		//send message data through socket

		this.dispatch(addGroupMessage(message))
		socket.emit('send:message', message);
	}

	handleChangeName(newName) {
		// var oldName = this.state.user;
		// this.state.socket.emit('change:name', { name: newName }, (result) => {
		// 	if(!result) {
		// 		return alert('There was an error changing your name');
		// 	}
		// 	var {users} = this.state;
		// 	var index = users.indexOf(oldName);
		// 	users.splice(index, 1, newName);
		// 	this.setState({users, user: newName})
		// })

		var oldName = this.props.state.groupMessage.user
		socket.emit('change:name', { name: newName }, (result) => {
			if(!result) {
				return alert('There was an error changing your name');
			}
			this.dispatch(setGroupUser(newName))
			this.dispatch(groupUserNameChange(oldName, newName))
		})
	}

	render() {
		const users = this.props.state.groupMessage.users;
		const messages = this.props.state.groupMessage.messages;
		const user = this.props.state.groupMessage.user;
		const handleMessageSubmit = this.handleMessageSubmit;
		const handleChangeName = this.handleChangeName;
		const language = this.props.state.user.selectedUser.primaryLanguage;
		return (
			<div id="chatbox-body">
				<UsersList
					users={users}
				/>
				<MessageList
					messages={messages}
				/>
				<MessageForm
					onMessageSubmit={handleMessageSubmit}
					user={user}
					language={language}
				/>
				<ChangeNameForm
					onChangeName={handleChangeName}
				/>
			</div>
		)
	}
}

function mapStateToProps (state, ownProps) {
	const userLanguage = state.user.selectedUser.primaryLanguage;

  return { state, userLanguage };
}

function mapDispatchToProps (dispatch, ownProps) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppGroup);
