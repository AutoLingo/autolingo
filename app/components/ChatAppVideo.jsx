import React, { Component } from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import VoiceRecognitionContainer from '../containers/VoiceRecognitionContainer';
import VideoChat from './VideoChat';
import { connect } from 'react-redux';
const socket = io.connect('/video-chat');

class ChatApp extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.messageReceive = this.messageReceive.bind(this)
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this.emitFinalTranscript = this.emitFinalTranscript.bind(this)
		this.interimTranscript = this.interimTranscript.bind(this)
		this.finalTranscript = this.finalTranscript.bind(this)
	}



	//run below functions after the components are mounted on the page
	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('send:message', this.messageReceive);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
		socket.on('final_transcript', this.finalTranscript)
		socket.on('interim_transcript', this.interimTranscript)
	}

	//**Helper emit methods for child "voicerecognitioncontainer" child component (remove/refactor?) **************************
	emitFinalTranscript(finalTranscript, userLanguage) {
		socket.emit('final_transcript', {finalTranscript, userLanguage})
	}

	emitInterimTranscript(interimTranscript, userLanguage) {
		socket.emit('interim_transcript', {interimTranscript, userLanguage})
	}
	//*******************************************************

	//**************** Browser/user receiving broadcast-emits from server **************************
	finalTranscript(data) {
		let originalLanguage = data.userLanguage
		let text = data.finalTranscript
		let userLanguage = this.props.userLanguage

		if (originalLanguage === userLanguage) {
			this.props.addFinalTranscript(data.finalTranscript)
		} else {
			this.props.translateFinalActionCreator(1, originalLanguage, userLanguage, text)
		}
	}

	interimTranscript(data) {
		let originalLanguage = data.userLanguage
		let text = data.interimTranscript
		let userLanguage = this.props.userLanguage

		if (originalLanguage === userLanguage) {
			this.props.setInterimTranscript(data.interimTranscript)
		} else {
			this.props.translateInterimActionCreator(1, originalLanguage, userLanguage, text)
		}
	}
	//*******************************************************

	//set user with given name
	_initialize(data) {
		var {users, name} = data;
		// this.setState({users, user: name});
	}


	//when the user joins the chat box, it will push the name of the user to the users array
	//message, "name of user" joined will rendered on the chat box
	_userJoined(data) {
	// 	var {users, messages} = this.state;
	// 	var {name} = data;
	// 	users.push(name);
	// 	messages.push({
	// 		user: "LingoBo",
	// 		text: name + ' Joined'
	// 	});
	// 	this.setState({users, messages})
	}

	//when the user leaves the chat box, it will push the name of the user to the users array
	//message, "name of user" left will rendered on the chat box
	_userLeft(data) {
	// 	var {users, messages} = this.state;
	// 	var {name} = data;
	// 	var index = users.indexOf(name);
	// 	users.splice(index, 1);
	// 	messages.push({
	// 		user: 'LingoBot',
	// 		text: name + ' Left'
	// 	})
	// 	this.setState({users, messages})
	}

	//Are we going to allow users to change name in the chat window? Need to discuss about this.
	_userChangedName(data) {
	// 	var {oldName, newName} = data;
	// 	var {users, messages} = this.state;
	// 	var index = users.indexOf(oldName);
	// 	//find the oldName with the index and replace it with newName
	// 	users.splice(index, 1, newName);
	// 	message.push({
	// 		user: 'APPLICATION BOT',
	// 		text: 'Change Name : ' + oldName + ' ==> ' + newName
	// 	});
	// 	this.setState({users, messages})
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
		
		let finalTranscripts = this.props.finalTranscripts
		let interimTranscript = this.props.interimTranscript
		let userLanguage = this.props.userLanguage || 'nada'
		return (
			<div id="chatbox-body">
				<h2>Live Video Translation</h2>
				<div id="conversation-container">
					<h2>Conversation</h2>
					{
						finalTranscripts[0] && finalTranscripts.map((transcript, i) => {
							return (
								<div key={i}>
									<br /> {transcript}
								</div>
							)
						})
					}
				</div>

				<div id="videochat-container">
					<VideoChat />
				</div>

				<div id="live-transcript-container">
					<h2>Live</h2>
					{ interimTranscript }
				</div>

				<div id="voicerecog-container">
					<VoiceRecognitionContainer emitFinalTranscript={this.emitFinalTranscript} emitInterimTranscript={this.emitInterimTranscript} userLanguage={userLanguage} />
				</div>
			</div>
		)
	}
}


// ************************************************
import { translateActionCreator, translateInterimActionCreator, translateFinalActionCreator } from '../reducers/translate'
import { setInterimTranscript, addFinalTranscript } from '../actionCreators/speech'

const mapStateToProps = state => {
	let translation = state.translations[1] && state.translations[1]
	let userLanguage = state.user.selectedUser.primaryLanguage
	let finalTranscripts = state.speech.finalTranscripts
	let interimTranscript = state.speech.interimTranscript

	return { 
		translation,
		userLanguage,
		finalTranscripts,
		interimTranscript
 	}
}

// const mapDispatchToProps = dispatch => ({translateActionCreator})

export default connect(mapStateToProps, {translateActionCreator, translateInterimActionCreator, translateFinalActionCreator, setInterimTranscript, addFinalTranscript})(ChatApp);










