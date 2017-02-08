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
		// this.selectLanguage = this.selectLanguage.bind(this);
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
			<Modal
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
	          	<h3 style={{fontSize: '30px', color: '#6495ED', fontWeight: 'bold'}}>Country Group Chat</h3>
	          	<ol style={{'textAlign': 'left', fontSize: '20px'}}>
	          		<li style={{border: 'none'}}>Write your message in the message input box and hit enter.</li>
	          		<li style={{border: 'none'}}>Your messages will be rendered on 'Live Conversation' box.</li>
	          		<li style={{border: 'none'}}>Other user's speech will be automatically translated into your default language and shown on the 'Live Conversation' box.</li>
	          		<li style={{border: 'none'}}>Double click on the username of the user who you want to have private conversation.</li>
	          	</ol>

	          	<h3 style={{fontSize: '30px', color: '#6495ED', fontWeight: 'bold'}}>Private Chat</h3>
	          	<ol style={{'textAlign': 'left', fontSize: '20px'}}>
	          		<li style={{border: 'none'}}>Click 'Start Video Chat' to start the video chat with other user.</li>
	          		<li style={{border: 'none'}}>Click on the microphone and start speaking.</li>
	          		<li style={{border: 'none'}}>Your conversation and other user's conversation will be shown on the 'Live Conversation' box.</li>
	          		<li style={{border: 'none'}}>You will be able to see the entire conversation on the 'Live Conversation' box.</li>
	          	</ol>
	          	
	          	<div><button id="instruction-submit-button" style={{width: '200px', fontSize: '20px', backgroundColor: '#1E90FF', borderRadius: '5%', hover: {backgroundColor: 'black'}}} onClick={(event)=>this.closeModal(event)}>Got It!</button></div>
	          </form>
	        </Modal>
	    )
	}
}

export default InstructionMessage;
