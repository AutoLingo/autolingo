import React from 'react';
import { Link } from 'react-router'

export default function Navbar (props) {
  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
      <div id="title">Auto Lingo</div>
      <button type="button" className="btn btn-warning btn-md navbar-btn">Login</button>
      <button type="button" className="btn btn-warning btn-md navbar-btn">About</button>
      <Link to="/language">
        <button type="button" className="btn btn-warning btn-md navbar-btn">Select Language</button>
      </Link>
    </nav>
  );
}
