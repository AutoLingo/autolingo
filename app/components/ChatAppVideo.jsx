import React, { Component } from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import VoiceRecognitionContainer from '../containers/VoiceRecognitionContainer';
import VideoChat from './VideoChat';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import languages from '../data/languages'

export const socket = io.connect('/video-chat');

class ChatApp extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.messageReceive = this.messageReceive.bind(this)
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this.emitFinalTranscript = this.emitFinalTranscript.bind(this)
		this.interimTranscript = this.interimTranscript.bind(this)
		this.finalTranscript = this.finalTranscript.bind(this)
		this.joinVideo = this.joinVideo.bind(this)
		this.htmlDecode = this.htmlDecode.bind(this)
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
		socket.on('broadcast_video_room', this.joinVideo)
	}

	//**Helper emit methods for child "voicerecognitioncontainer" child component (remove/refactor?) **************************
	emitFinalTranscript(finalTranscript, userLanguage) {
		socket.emit('final_transcript', {finalTranscript, userLanguage})
	}

	emitInterimTranscript(interimTranscript, userLanguage) {
		socket.emit('interim_transcript', {interimTranscript, userLanguage})
	}
	//*******************************************************

	joinVideo(data) {
		console.log('data: ', data);
		browserHistory.push(`${data.room}`)
	}

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

	htmlDecode(input){
	  var e = document.createElement('div');
	  e.innerHTML = input;
	  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}

// ************************************************************

	render() {

		let finalTranscripts = this.props.finalTranscripts
		let interimTranscript = this.props.interimTranscript
		let userLanguage = this.props.userLanguage || 'nada'

		let userFullLanguage = ''

		if (userLanguage === 'zh-CN' || userLanguage === 'zh-TW') {
			userFullLanguage = '中文'
		} else {
			userFullLanguage = languages.filter( (lang) => {
				return userLanguage === lang[1][0].split('-')[0]
			})[0][0]
		}

		return (
			<div id="chatbox-body" className="container">
				<h2>Video Chat</h2>

				<div className="col-sm-6">
					<div>
						<VideoChat />
						<ul id="subtitles" className="lingo-blue breadcrumb"><li>{this.htmlDecode(interimTranscript)}</li></ul>
					</div>


				</div>

				<div className="col-sm-6">
					<div>
						<VoiceRecognitionContainer emitFinalTranscript={this.emitFinalTranscript} emitInterimTranscript={this.emitInterimTranscript} userLanguage={userLanguage} />
					</div>
					<ul className="breadcrumb"><li>Current language is <b>{userFullLanguage}</b>. Change language from navigation bar.</li></ul>
					<div id="conversation-container">
						<ul>
						{
							finalTranscripts[0] && finalTranscripts.map((transcript, i) => {
								return (
									<li key={i}>
										{this.htmlDecode(transcript)}
									</li>
								)
							}).reverse()
						}
						</ul>
					</div>
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
	let userLanguage = state.user.primaryUser.primaryLanguage
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
