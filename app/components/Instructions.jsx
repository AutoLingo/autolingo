import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import sweetAlert from 'sweetalert';
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
    textAlign			  : 'center',
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
	}

	openModal() {
		this.setState({modalIsOpen: true})
	}

	closeModal(event) {
		event.preventDefault();
		this.setState({modalIsOpen: false})
		this.props.showInstruction();
	}

	render() {
		return (
			<Modal id="instruction-box"
	          isOpen={this.state.modalIsOpen}
	          onAfterOpen={this.afterOpenModal}
	          onRequestClose={this.closeModal}
	          style={customStyles}
	          contentLabel="Example Modal"
	          selectLanguage={this.selectLanguage}
	        >

	          <h1 id="instruction-title" style={{color: '#6495ED'}}>How to use AutoLingo</h1>
	          <hr style={{border: '1px solid black'}}></hr>
	          <form style={{color: 'black', paddingTop: '5px'}}>
	          	<h3 style={{fontSize: '30px', color: '#6495ED', fontWeight: 'bold'}}>AutoLingo Map</h3>
	          	<ol style={{'textAlign': 'left', fontSize: '20px'}}>
	          		<li style={{border: 'none'}}>Click on the map or use the search bar to enter the group chat for a specific country.</li>
	          		<li style={{border: 'none'}}>Select your preferred language using the dropdown menu at the top of the screen.</li>
	          		<li style={{border: 'none'}}>All written messages and video-chat transcripts will be translated into this language.</li>
	          		<li style={{border: 'none'}}>You can switch your preferred language at any point.</li>
	          	</ol>

	          	<h3 style={{fontSize: '30px', color: '#6495ED', fontWeight: 'bold'}}>Country Group Chat</h3>
	          	<ol style={{'textAlign': 'left', fontSize: '20px'}}>
	          		<li style={{border: 'none'}}>Write your message in the message input box and hit enter.</li>
	          		<li style={{border: 'none'}}>Your messages will be rendered in the 'Live Conversation' box on your screen in your own language, and will be translated for other users into their own language on their screens.</li>
	          		<li style={{border: 'none'}}>Other users' speech will be translated into your default language and shown in the 'Live Conversation' box on your screen.</li>
	          		<li style={{border: 'none'}}>Click on a user in the user list to invite them to video chat.</li>
	          	</ol>

	          	<h3 style={{fontSize: '30px', color: '#6495ED', fontWeight: 'bold'}}>Private Chat</h3>
	          	<ol style={{'textAlign': 'left', fontSize: '20px'}}>
	          		<li style={{border: 'none'}}>When you are invited to chat, click on the invitation note to bring you to the video-chat screen.</li>
	          		<li style={{border: 'none'}}>Click on "Join video chat"</li>

	          		<li style={{border: 'none'}}>Click on the microphone to start speaking.</li>
	          		<li style={{border: 'none'}}>The conversation will be rendered within the 'Live Conversation' box on each user's screen in their respective languages.</li>
	          	</ol>

	          	<div><button id="instruction-submit-button" style={{width: '200px', fontSize: '20px', backgroundColor: '#1E90FF', borderRadius: '5%', cursor: 'pointer'}} onClick={(event)=>this.closeModal(event)}>Got It!</button></div>
	          </form>
	        </Modal>
	    )
	}
}

export default InstructionMessage;
