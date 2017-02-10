import React from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import { addGroupMessage, setGroupUser, addToGroupUsers, removeGroupUser, groupUserNameChange } from '../actionCreators/groupMessage';
import { translateActionCreator } from '../reducers/translate';
import { setSelectedUserName } from '../actionCreators/user';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

let socket = io.connect('/group-chat');

class ChatAppGroup extends React.Component {
	//set empty array/string for users, messages, text
	constructor (props) {
		super(props)
		this.state = { socket: {} }
		this.dispatch = props.dispatch
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this.handleChangeName = this.handleChangeName.bind(this)
		this.joinVideoChat = this.joinVideoChat.bind(this)
		this.showInvitation = this.showInvitation.bind(this)
		this._initialize = this._initialize.bind(this)
		this._messageReceive = this._messageReceive.bind(this)
		this._userJoined = this._userJoined.bind(this)
		this._userLeft = this._userLeft.bind(this)
		this._userChangedName = this._userChangedName.bind(this)
		this._disconnectUser = this._disconnectUser.bind(this)
	}

	componentDidMount() {
		console.log('groupchat id', socket)
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageReceive);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
		socket.on('disconnect', this._disconnectUser)
		socket.on('video_invitation', this.showInvitation);

		socket.emit('join_room', { room: this.props.selectedCountry});
	}

	componentWillUnmount() {
		console.log('COMPONENT IS UNMOUNTING')
		socket.emit('room_exit')
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
			const user = message.user
			this.dispatch(translateActionCreator(id, originalLanguage, userLanguage, originalText, user))
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
		console.log(`${data.name} is about to be removed from state through dispatch`)
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
		console.log('message', message)
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

	joinVideoChat(name, room) {
		this.dispatch(setSelectedUserName(name, room))
		browserHistory.push('/video-chat');
	}

	showInvitation(data) {
		// alert('INVITATION')
		console.log('INVITATION', data)
		var invitationMessage = {
			user: "LingoBot",
			text: <Link to={data.link}> Click here to accept video chat invitation </Link> 
		};
		this.dispatch(addGroupMessage(invitationMessage))
	}

	render() {

		const users = this.props.users;
		const messages = this.props.messages;
		const user = this.props.userName
		const language = this.props.userLanguage;
		const selectedCountry = this.props.selectedCountry
		
		const handleMessageSubmit = this.handleMessageSubmit;
		const handleChangeName = this.handleChangeName;
		const joinVideoChat = this.joinVideoChat
		
		return (
			<div className="container" id="chatbox-body">
				<h2>FLAG ICON Group Chat: { selectedCountry }</h2>
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
							userName = {this.props.userName}
							room = {this.props.selectedCountry}
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
	const userLanguage = state.user.primaryUser.primaryLanguage;
	const selectedCountry = state.map.selectedCountry;
	const userName = state.groupMessage.user;
	const users = state.groupMessage.users;
	const messages = state.groupMessage.messages;
	
  return { state, userLanguage, selectedCountry, userName, users, messages };
}

function mapDispatchToProps (dispatch, ownProps) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppGroup);
