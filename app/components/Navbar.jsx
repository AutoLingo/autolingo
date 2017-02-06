import React from 'react';
import { Link } from 'react-router'

const languageList = {
  0 : "Afrikaans",
  1 : "Bahasa Indonesia",
  2 : "Bahasa Melayu",
  3 : "Català",
  4 : "Čeština",
  5 : "Dansk",
  6 : "Deutsch",
  7 : "English",
  8 : "Español",
  9 : "Euskara",
  10 : "Filipino",
  11 : "Français",
  12 : "Galego",
  13 : "Hrvatski",
  14 : "IsiZulu",
  15 : "Íslenska",
  16 : "Italiano",
  17 : "Lietuvių",
  18 : "Magyar",
  19 : "Nederlands",
  20 : "Norsk bokmål",
  21 : "Polski",
  22 : "Português",
  23 : "Română",
  24 : "Slovenščina",
  25 : "Slovenčina",
  26 : "Suomi",
  27 : "Svenska",
  28 : "Tiếng Việt",
  29 : "Türkçe",
  30 : "Ελληνικά",
  31 : "български",
  32 : "Pусский",
  33 : "Српски",
  34 : "Українська",
  35 : "한국어",
  36 : "中文",
  37 : "日本語",
  38 : "हिन्दी",
  39 : "ภาษาไทย"
}

export default function Navbar (props) {
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
          <a className="navbar-brand" href="#">Auto<span className="lingo-blue">Lingo</span></a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">World Map</a></li>
            <li><a href="#">About</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Select Language <span className="caret"></span></a>
              <ul id="language-list" className="dropdown-menu" role="menu">

                {
                  Object.keys(languageList).map( value => (
                    <li key={value}><a href="#">{languageList[value]}</a></li>
                    )
                  )
                }

              </ul>
            </li>
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
          </ul>
        </div>
      </div>
    </nav>

  );
}