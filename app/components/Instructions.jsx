import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import sweetAlert from 'sweetAlert';
import store from '../store';
import Dropdown from 'react-simple-dropdown';
import { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '600px',
    textAlign: 'center'
  }
};

class InstructionMessage extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: true
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		// this.selectLanguage = this.selectLanguage.bind(this);
	}

	openModal() {
		this.setState({modalIsOpen: true})
	}

	closeModal() {
		this.setState({modalIsOpen: false})
	}

	// render() {
	// 	return (
	// 		<div id="instruction-message">
	// 			{swal({
	// 			  title: "<h1 style=color:'blue'>Instructions</h1>",
	// 			  text: "<h3>Country Group Chat</h3><div style=margin-left:-40px><ol>1. Write your message in the message input box and hit enter.</ol><ol>2. Your messages will be rendered on 'Live Conversation' box.</ol><ol>3. Other user's speech will be automatically translated into your default language and shown on the 'Live Conversation' box.</ol><ol>4. Double click on the username of the user who you want to have private conversation.</ol><h3>Private Chat</h3><ol>1. Click 'Start Video Chat' to start the video chat with other user.</ol><ol>2. Click on the microphone and start speaking.</ol><ol>3. Your conversation and other user's conversation will be shown on the 'Live Conversation' box.</ol><ol>4. You will be able to see the entire conversation on the 'Live Conversation' box.</ol></div>",
	// 			  html: true
	// 			})}
	// 		</div>
	// 	)
	// }

	render() {
		return (
			<Modal
	          isOpen={this.state.modalIsOpen}
	          onAfterOpen={this.afterOpenModal}
	          onRequestClose={this.closeModal}
	          style={customStyles}
	          contentLabel="Example Modal"
	          selectLanguage={this.selectLanguage}
	        >

	          <h1 style={{color: 'linear-gradient(#54b4eb, #2fa4e7 60%, #1d9ce5)'}}>How to use AutoLingo</h1>
	          <form style={{color: 'black', paddingTop: '25px'}}>
	          	<h3 style={{fontSize: '30px'}}>Country Group Chat</h3>
	          	<ol style={{'textAlign': 'left', fontSize: '20px'}}>
	          		<li style={{border: 'none'}}>Write your message in the message input box and hit enter.</li>
	          		<li style={{border: 'none'}}>Your messages will be rendered on 'Live Conversation' box.</li>
	          		<li style={{border: 'none'}}>Other user's speech will be automatically translated into your default language and shown on the 'Live Conversation' box.</li>
	          		<li style={{border: 'none'}}>Double click on the username of the user who you want to have private conversation.</li>
	          	</ol>

	          	<h3 style={{fontSize: '30px'}}>Private Chat</h3>
	          	<ol style={{'textAlign': 'left', fontSize: '20px'}}>
	          		<li style={{border: 'none'}}>Click 'Start Video Chat' to start the video chat with other user.</li>
	          		<li style={{border: 'none'}}>Click on the microphone and start speaking.</li>
	          		<li style={{border: 'none'}}>Your conversation and other user's conversation will be shown on the 'Live Conversation' box.</li>
	          		<li style={{border: 'none'}}>You will be able to see the entire conversation on the 'Live Conversation' box.</li>
	          	</ol>
	          	<div><button style={{width: '120px'}}>Got It!</button></div>
	          </form>
	        </Modal>
	    )
	}
}

export default InstructionMessage;
