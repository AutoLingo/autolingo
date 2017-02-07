import React from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import { addGroupMessage, setGroupUser, addToGroupUsers, removeGroupUser, groupUserNameChange } from '../actionCreators/groupMessage';
import { translateActionCreator } from '../reducers/translate';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


let socket;

class ChatAppGroup extends React.Component {
	//set empty array/string for users, messages, text
	constructor (props) {
		super(props)
		this.state = { socket: {} }
		this.dispatch = props.dispatch
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this.handleChangeName = this.handleChangeName.bind(this)
		this.joinVideoChat = this.joinVideoChat.bind(this)
		this._initialize = this._initialize.bind(this)
		this._messageReceive = this._messageReceive.bind(this)
		this._userJoined = this._userJoined.bind(this)
		this._userLeft = this._userLeft.bind(this)
		this._userChangedName = this._userChangedName.bind(this)
		this._disconnectUser = this._disconnectUser.bind(this)
	}

	componentDidMount() {
		socket = io.connect('/group-chat');

		socket.on('init', this._initialize);
		socket.on('send:message', this._messageReceive);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
		socket.on('disconnect', this._disconnectUser)
		socket.emit('join_room', { room: this.props.selectedCountry})
	}

	//set user with given name
	_initialize(data) {
		let users = data.users;
		let name = this.props.userName ? this.props.userName : data.name

		this.dispatch(setGroupUser(name));
		this.dispatch(addToGroupUsers(users));
	}

	//push the given message into messages array
	_messageReceive(message) {
		const userLanguage = this.props.userLanguage

		if (userLanguage === message.language) {
			this.dispatch(addGroupMessage(message))
		} else {
			const id = 1;
			const originalLanguage = message.language;
			const originalText = message.text;
			this.dispatch(translateActionCreator(id, originalLanguage, userLanguage, originalText))
		}
	}

	_disconnectUser() {
		socket.emit('user_left', { name: this.props.userName, room: this.props.selectedCountry})
	}

	_userJoined(data) {
		var {name} = data;
		var userJoinMsg = {
			user: "LingoBot",
			text: name + ' Joined'
		};
		this.dispatch(addGroupMessage(userJoinMsg))
	}

	_userLeft(data) {
		var {name} = data;
		var userLeftMsg = {
			user: 'LingoBot',
			text: name + ' Left'
		}
		this.dispatch(addGroupMessage(userLeftMsg))
		this.dispatch(removeGroupUser(name))
	}

	_userChangedName(data) {
		var {oldName, newName} = data;

		var nameChangeMsg = {
			user: 'APPLICATION BOT',
			text: 'Change Name : ' + oldName + ' ==> ' + newName
		};
		this.dispatch(addGroupMessage(nameChangeMsg))
		this.dispatch(groupUserNameChange(oldName, newName))
	}

	handleMessageSubmit(message) {

		this.dispatch(addGroupMessage(message))
		socket.emit('send:message', message);
	}

	handleChangeName(newName) {
		var oldName = this.props.state.groupMessage.user

		socket.emit('change:name', { name: newName }, (result) => {
			if(!result) {
				return alert('There was an error changing your name');
			}
			this.dispatch(setGroupUser(newName))
			this.dispatch(groupUserNameChange(oldName, newName))
		})
	}

	joinVideoChat(selectedUser) {

		browserHistory.push('/live-chat');
	}

	render() {
		const users = this.props.state.groupMessage.users;
		const messages = this.props.state.groupMessage.messages;
		const user = this.props.state.groupMessage.user;
		const handleMessageSubmit = this.handleMessageSubmit;
		const handleChangeName = this.handleChangeName;
		const language = this.props.state.user.selectedUser.primaryLanguage;
		const joinVideoChat = this.joinVideoChat
		return (
			<div className="container" id="chatbox-body">
				<h1>Live Group Chat</h1>
				<div className="row">
					<div className="col-sm-9">
						<MessageList
							messages={messages}
						/>
					</div>

					<div className="col-sm-3">
						<UsersList
							users={users}
							joinVideoChat={joinVideoChat}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-9">
						<MessageForm
							onMessageSubmit={handleMessageSubmit}
							user={user}
							language={language}
						/>
					</div>

					<div className="col-sm-3">
						<ChangeNameForm
							onChangeName={handleChangeName}
						/>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps (state, ownProps) {
	const userLanguage = state.user.selectedUser.primaryLanguage;
	const selectedCountry = state.user.selectedUser.country;
	const userName = state.groupMessage.user;
  return { state, userLanguage, selectedCountry, userName };
}

function mapDispatchToProps (dispatch, ownProps) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppGroup);
