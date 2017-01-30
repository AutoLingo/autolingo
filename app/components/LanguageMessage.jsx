import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import sweetAlert from 'sweetAlert';




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
    
  selectLanguage(language) {
    console.log(language)
    this.setState({modalIsOpen: false})

    swal("Welcome to AutoLingo!", "Website will be translated into your default language.", "success")
  }

  render() {

    return (
      <div>
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
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={()=>this.selectLanguage('English')}>English</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={()=>this.selectLanguage('Chinese')}>Chinese</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={()=>this.selectLanguage('Spanish')}>Spanish</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={()=>this.selectLanguage('French')}>French</button></div>
            <div><button style={{width: '300px', marginBottom: '20px'}} onClick={()=>this.selectLanguage('Korean')}>Korean</button></div>
          </form>
        </Modal>
      </div>
    );
  }
}

// ReactDOM.render(<App />, appElement);

export default LanguageMessage;


