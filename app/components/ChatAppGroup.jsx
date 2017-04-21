import React from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import { addMessage, clearMessages } from '../actionCreators/groupMessage';
import { translateActionCreator } from '../reducers/translate';
import { setPrimaryUserName, setSelectedUserName, addToUserList, removeFromUserList, changeUserName } from '../actionCreators/user';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import flagCodes from '../data/flagCodes';

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

		socket.emit('join_room', { room: this.props.selectedCountry, userName: this.props.userName });
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
			text: name + ' joined'
		};
		this.dispatch(addMessage(userJoinMsg, room))
	}

	_userLeft(data) {
		let {name} = data;
		let room = this.props.selectedCountry
		let userLeftMsg = {
			user: 'LingoBot',
			text: name + ' left'
		}
		this.dispatch(addMessage(userLeftMsg, room))
		this.dispatch(removeFromUserList(name))
	}

	_userChangedName(data) {
		let {oldName, newName} = data;
		let room = this.props.selectedCountry
		let nameChangeMsg = {
			user: 'LingoBot',

			text: oldName + "'s new username is " + newName
		};

		this.dispatch(addMessage(nameChangeMsg, room))
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
			text: <Link className="invitation btn btn-warning" to={data.link}> {data.user} would like to Video Chat! Click here to accept invitation. </Link>
		};

		this.dispatch(addMessage(invitationMessage, room))
	}

	getFlagCode(country) {
		for (let key in flagCodes) {
			if (flagCodes[key] === country) {
				return key
			}
		}
		return null
	}

	getFlagCode(country) {
		for (let key in flagCodes) {
			if (flagCodes[key] === country) {
				return key
			}
		}
		return null
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

		const selectedFlag = this.getFlagCode(selectedCountry)

		return (
			<div className="container" id="chatbox-body">
				<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
					<Link to="/">&times;</Link>
				</button>


				<h3> {selectedFlag && <img className="flag" src={`img/flags/` + selectedFlag.toLowerCase() + `.png`} />} { selectedCountry }  Group Chat</h3>

				<div>
					<div className="col-sm-9">
						<div className="messages panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Live Conversation</h3>
							</div>
							<div className="panel-body">

								<MessageList
									messages={roomMessages}
								/>

							</div>

							<MessageForm
								onMessageSubmit={handleMessageSubmit}
								user={user}
								language={language}
							/>

						</div>
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
				<div>
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
