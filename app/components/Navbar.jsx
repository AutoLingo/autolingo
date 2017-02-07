
import React, {Component} from 'react';
import { Link } from 'react-router';
import Instructions from './Instructions.jsx';
import languages from '../data/languages'


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
    this.showInstruction = this.showInstruction.bind(this);
  }
      
  componentDidMount() {
    $('[data-submenu]').submenupicker();
  }

  showInstruction(event) {
    let show = !this.state.show;
    console.log(show);
    this.setState({show});
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <a className="navbar-brand" href="/">Auto<span className="lingo-blue">Lingo</span></a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/">World Map</a></li>
              <li><a href="#">About</a></li>
              <li className="dropdown">
                <a data-submenu="" data-toggle="dropdown" className="dropdown-toggle" role="button" aria-expanded="false">Select Language <span className="caret"></span></a>
                <ul id="language-list" className="dropdown-menu">

                  {
                    languages.map( language => {
                        if ( language.length > 2 ) { //if there is more than 1 dialect
                          let dialects = language.slice(1,language.length) //we don't want to iterate over the main language
                          return (
                            <li key={language} className="dropdown-submenu">
                              <a tabIndex="0">{language[0]}</a>
                              <ul className="dropdown-menu">
                                <li className="dropdown-header">Select Dialect</li>
                                { dialects.map( dialect => (<li key={dialect}><a onClick={()=>{this.props.setUserLanguage(dialect[0].split('-')[0], dialect[0])}} data-langcode={dialect[0]} tabIndex="0">{dialect[1]}</a></li>) ) }
                              </ul>
                            </li>
                          )
                        } else {
                          let dialect = language[1][0]
                          let langCode = language[1][0].split('-')[0]

                          return (
                            <li key={language}>
                              <a onClick={()=>{this.props.setUserLanguage(langCode, dialect)}} data-langcode={dialect} >{language[0]}</a>
                            </li>
                          )
                        }
                      }
                    )
                  }

                </ul>
              </li>

              {/*<li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Select Country <span className="caret"></span></a>
                <ul id="country-list" className="dropdown-menu" role="menu">
                  <li><a onClick={()=> this.props.zoomInCountry(america)}>Go to U.S.A</a></li>
                  <li><a onClick={repositionMap(this.props.china, this.map)}>Go to China</a></li>
                  <li><a onClick={repositionMap(this.props.spain, this.map)}>Go to Spain</a></li>
                  <li><a onClick={repositionMap(this.props.france, this.map)}>Go to France</a></li>
                  <li><a onClick={repositionMap(this.props.korea, this.map)}>Go to Korea</a></li>
                </ul>
              </li>*/}

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Change Username <span className="caret"></span></a>
                <ul id="change-username-form" className="dropdown-menu" role="menu">
                  <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
                </ul>
              </li>
              
              {this.state.show && <Instructions showInstruction={this.showInstruction}/>}
              
              <li><a href="#" onClick={this.showInstruction}>Instructions</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
