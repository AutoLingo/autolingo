import React, { Component } from 'react';
import io from '../sockets';
import UsersList from './UserList.jsx';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import ChangeNameForm from './ChangeNameForm.jsx';
import VoiceRecognitionContainer from '../containers/VoiceRecognitionContainer';
import VideoChat from './VideoChat';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import languages from '../data/languages';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

		socket.emit('join_room', {room: location.hash})
		if (this.props.selectedUser.name) {
			socket.emit('send_video_invitation', {
				user: this.props.user, //sender's username
				name: this.props.selectedUser.name, //recipient's username
				room: this.props.selectedUser.room,
				link: window.location.pathname + window.location.hash
			})
		}
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
		let userFullLanguage = this.props.userFullLanguage

		return (
			<div id="chatbox-body" className="container">
				<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
					<Link to="/">&times;</Link>
				</button>

				<h3>Video Chat</h3>

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
							<ReactCSSTransitionGroup
								transitionName="fallingFadeIn"
								transitionEnterTimeout={500}>
							{
								finalTranscripts[0] && finalTranscripts.map((transcript, i) => {
									return (
										<li key={i}>
											{this.htmlDecode(transcript)}
										</li>
									)
								}).reverse()
							}
							</ReactCSSTransitionGroup>
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
	let user = state.user.primaryUser.name
	let userLanguage = state.user.primaryUser.primaryLanguage
	let userFullLanguage = state.user.primaryUser.primaryLanguageFullName
	let finalTranscripts = state.speech.finalTranscripts
	let interimTranscript = state.speech.interimTranscript
	let selectedUser = state.user.selectedUser

	return {
		translation,
		user,
		userLanguage,
		userFullLanguage,
		finalTranscripts,
		interimTranscript,
		selectedUser
 	}
}


export default connect(mapStateToProps, {translateActionCreator, translateInterimActionCreator, translateFinalActionCreator, setInterimTranscript, addFinalTranscript})(ChatApp);
