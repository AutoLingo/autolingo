import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import sweetAlert from 'sweetAlert';
import { setUser } from '../actionCreators/user';
import store from '../store';




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


class LanguageMessage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  selectLanguage(event, language, country) {
    event.preventDefault()
    if (!store.user) {
      store.dispatch(setUser({
        firstName: 'Guest',
        lastName: (Math.random() * 10000).toString(),
        email: 'guest@guestmail.com',
        primaryLanguage: language,
        country: country
      }))
    }
    this.setState({modalIsOpen: false})
    swal("Welcome to AutoLingo!", "Website will be translated into your default language.", "success")
  }

  render() {

    return (
      <div id="language-message" >
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          selectLanguage={this.selectLanguage}
        >

          <h1 style={{color: 'black'}}>Choose Default Language</h1>
          <form style={{'textAlign': 'center'}}>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'en', 'America')}>English</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'zh-CN', 'China')}>Chinese</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'es', 'Spain')}>Spanish</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'fr', 'France')}>French</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'ko', 'Korea')}>Korean</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'ru', 'Russia')}>Russian</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'tl', 'Philippines')}>Filipino</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'el', 'Greece')}>Greek</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'iw', 'Israel')}>Hebrew</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'it', 'Italy')}>Italian</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'ja', 'Japan')}>Japanese</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'sw', 'Tanzania')}>Swahili</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'vi', 'Vietnam')}>Vietnamese</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'pl', 'Poland')}>Polish</button></div>
          </form>
        </Modal>
      </div>
    );
  }
}

            // <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'ar', 'Saudi Arabia')}>Arabic</button></div>
            // <div><button style={{width: '300px', marginBottom: '20px'}} onClick={(event)=>this.selectLanguage(event, 'eo', 'World')}>Esperanto</button></div>
// ReactDOM.render(<App />, appElement);

export default LanguageMessage;
