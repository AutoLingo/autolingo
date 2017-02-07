// import React from 'react';
// import io from '../sockets';
// import UsersList from './UserList.jsx';
// import MessageList from './MessageList.jsx';
// import MessageForm from './MessageForm.jsx';
// import ChangeNameForm from './ChangeNameForm.jsx';
// import store from '../store';
// import { addGroupMessage, setGroupUser, addToGroupUsers, removeGroupUser, groupUserNameChange } from '../actionCreators/groupMessage'
// console.log('store', store);
// class ChatAppGroup extends React.Component {
// 	//set empty array/string for users, messages, text
// 	constructor (props) {
// 		super(props)
// 		this.state = {
// 			socket: {},
// 			users: [],
// 			messages: [],
// 			text: ''
// 		}
// 		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
// 		this.handleChangeName = this.handleChangeName.bind(this)
// 	}
//
// 	//run below functions after the components are mounted on the page
// 	componentDidMount() {
// 		const socket = io.connect('/group-chat');
// 		this.setState({socket})
// 		socket.on('init', this._initialize);
// 		socket.on('send:message', this._messageReceive);
// 		socket.on('user:join', this._userJoined);
// 		socket.on('user:left', this._userLeft);
// 		socket.on('change:name', this._userChangedName);
// 	}
//
// 	//set user with given name
// 	_initialize(data) {
// 		var {users, name} = data;
// 		store.dispatch(setGroupUser(name));
// 		store.dispatch(addToGroupUsers(users));
// 	}
//
// 	//push the given message into messages array
// 	_messageReceive(message) {
// 		// var {messages} = this.state;
// 		// messages.push(message);
// 		// this.setState({messages})
// 		store.dispatch(addGroupMessage(message))
// 	}
//
// 	//when the user joins the chat box, it will push the name of the user to the users array
// 	//message, "name of user" joined will rendered on the chat box
// 	_userJoined(data) {
// 		// var {users, messages} = this.state;
// 		// var {name} = data;
// 		// users.push(name);
// 		// messages.push({
// 		// 	user: "LingoBot",
// 		// 	text: name + ' Joined'
// 		// });
// 		// this.setState({users, messages})
// 		var {name} = data;
// 		var userJoinMsg = {
// 			user: "LingoBot",
// 			text: name + ' Joined'
// 		};
// 		store.dispatch(addGroupMessage(userJoinMsg))
// 		store.dispatch(addToGroupUsers([name]))
// 	}
//
// 	//when the user leaves the chat box, it will push the name of the user to the users array
// 	//message, "name of user" left will rendered on the chat box
// 	_userLeft(data) {
// 		// var {users, messages} = this.state;
// 		// var {name} = data;
// 		// var index = users.indexOf(name);
// 		// users.splice(index, 1);
// 		// messages.push({
// 		// 	user: 'LingoBot',
// 		// 	text: name + ' Left'
// 		// })
// 		// this.setState({users, messages})
// 		var {name} = data;
// 		var userLeftMsg = {
// 			user: 'LingoBot',
// 			text: name + ' Left'
// 		}
// 		store.dispatch(addGroupMessage(userLeftMsg))
// 		store.dispatch(removeGroupUser(name))
// 	}
//
// 	//Are we going to allow users to change name in the chat window? Need to discuss about this.
// 	_userChangedName(data) {
// 		// var {oldName, newName} = data;
// 		// var {users, messages} = this.state;
// 		// var index = users.indexOf(oldName);
// 		// //find the oldName with the index and replace it with newName
// 		// users.splice(index, 1, newName);
// 		// messages.push({
// 		// 	user: 'APPLICATION BOT',
// 		// 	text: 'Change Name : ' + oldName + ' ==> ' + newName
// 		// });
// 		// this.setState({users, messages})
//
// 		var {oldName, newName} = data;
// 		var nameChangeMsg = {
// 			user: 'APPLICATION BOT',
// 			text: 'Change Name : ' + oldName + ' ==> ' + newName
// 		};
// 		store.dispatch(addGroupMessage(nameChangeMsg))
// 		store.dispatch(groupUserNameChange(oldName, newName))
// 	}
//
// 	handleMessageSubmit(message) {
// 		// var {messages} = this.state;
// 		// messages.push(message);
// 		// this.setState({messages});
// 		// //send message data through socket
// 		// this.state.socket.emit('send:message', message);
//
// 		store.dispatch(addGroupMessage(message))
// 		//send message data through socket
// 		this.state.socket.emit('send:message', message);
// 	}
//
// 	handleChangeName(newName) {
// 		// var oldName = this.state.user;
// 		// this.state.socket.emit('change:name', { name: newName }, (result) => {
// 		// 	if(!result) {
// 		// 		return alert('There was an error changing your name');
// 		// 	}
// 		// 	var {users} = this.state;
// 		// 	var index = users.indexOf(oldName);
// 		// 	users.splice(index, 1, newName);
// 		// 	this.setState({users, user: newName})
// 		// })
//
// 		var oldName = store.getState().groupMessages.user
// 		this.state.socket.emit('change:name', { name: newName }, (result) => {
// 			if(!result) {
// 				return alert('There was an error changing your name');
// 			}
// 			store.dispatch(setGroupUser(newName))
// 			store.dispatch(groupUserNameChange(oldName, newName))
// 		})
// 	}
//
// 	render() {
// 		const storeState = store.getState()
// 		const users = storeState.groupMessage.users;
// 		const messages = storeState.groupMessage.messages;
// 		const user = storeState.groupMessage.user;
// 		return (
// 			<div id="chatbox-body">
// 				<UsersList
// 					users={users}
// 				/>
// 				<MessageList
// 					messages={messages}
// 				/>
// 				<MessageForm
// 					onMessageSubmit={this.handleMessageSubmit}
// 					user={user}
// 				/>
// 				<ChangeNameForm
// 					onChangeName={this.handleChangeName}
// 				/>
// 			</div>
// 		)
// 	}
// }
//
// export default ChatAppGroup;
