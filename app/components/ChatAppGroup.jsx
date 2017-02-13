import React from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import { addMessage } from '../actionCreators/groupMessage';
import { translateActionCreator } from '../reducers/translate';
import { setPrimaryUserName, setSelectedUserName, addToUserList, removeFromUserList, changeUserName } from '../actionCreators/user';
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
		
		socket.emit('room_exit')
	}


	//set user with given name
	_initialize(data) {
		let users = data.users;
		let name = this.props.userName ? this.props.userName : data.name

		this.dispatch(setPrimaryUserName(name));
		this.dispatch(addToUserList(users));
	}

	//push the given message into messages array
	_messageReceive(message) {
		const userLanguage = this.props.userLanguage
		const room  = this.props.selectedCountry

		if (userLanguage === message.language) {
			this.dispatch(addMessage(message, room))
		} else {
			const id = 1;
			const originalLanguage = message.language;
			const originalText = message.text;
			const user = message.user
			this.dispatch(translateActionCreator(id, originalLanguage, userLanguage, originalText, user, room))
		}
	}

	_disconnectUser() {
		socket.emit('user_left', { name: this.props.userName, room: this.props.selectedCountry})
	}

	_userJoined(data) {
		let {name} = data;
		let room = this.props.selectedCountry

		let userJoinMsg = {
			user: "LingoBot",
			text: name + ' Joined'
		};
		this.dispatch(addMessage(userJoinMsg, room))
	}

	_userLeft(data) {
		let {name} = data;
		let room = this.props.selectedCountry
		let userLeftMsg = {
			user: 'LingoBot',
			text: name + ' Left'
		}
		this.dispatch(addMessage(userLeftMsg, room))
		this.dispatch(removeFromUserList(name))
	}

	_userChangedName(data) {
		let {oldName, newName} = data;

		let nameChangeMsg = {
			user: 'APPLICATION BOT',
			text: 'Change Name : ' + oldName + ' ==> ' + newName
		};
		this.dispatch(addMessage(nameChangeMsg))
		this.dispatch(changeUserName(oldName, newName))
	}

	handleMessageSubmit(message) {
		let room = this.props.selectedCountry

		this.dispatch(addMessage(message, room))
		socket.emit('send:message', message);
	}

	handleChangeName(newName) {
		let oldName = this.props.userName

		socket.emit('change:name', { name: newName }, (result) => {
			if(!result) {
				return alert('There was an error changing your name');
			}
			this.dispatch(setPrimaryUserName(newName))
			this.dispatch(changeUserName(oldName, newName))
		})
	}

	joinVideoChat(name, room) {
		this.dispatch(setSelectedUserName(name, room))
		browserHistory.push('/video-chat');
	}

	showInvitation(data) {
		let room = this.props.selectedCountry
		let invitationMessage = {
			user: "LingoBot",
			text: <Link to={data.link}> Click here to accept video chat invitation </Link>
		};
		
		this.dispatch(addMessage(invitationMessage, room))
	}

	render() {

		const users = this.props.users;
		const user = this.props.userName
		const language = this.props.userLanguage;
		const selectedCountry = this.props.selectedCountry
		const groupMessages = this.props.groupMessages;
		const roomMessages = groupMessages[selectedCountry] && groupMessages[selectedCountry].messages

		const handleMessageSubmit = this.handleMessageSubmit;
		const handleChangeName = this.handleChangeName;
		const joinVideoChat = this.joinVideoChat

		return (
			<div className="container" id="chatbox-body">
				<h1>Live Group Chat: { selectedCountry }</h1>
				<div className="row">
					<div className="col-sm-9">
						<MessageList
							messages={roomMessages}
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
	const userName = state.user.primaryUser.name;
	const users = state.user.userList;
	const groupMessages = state.groupMessage;

  return { userLanguage, selectedCountry, userName, users, groupMessages };
}

function mapDispatchToProps (dispatch, ownProps) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppGroup);
