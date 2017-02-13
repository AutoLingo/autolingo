import React from 'react';
import { IndexLink, Link } from 'react-router';
import { shallow } from 'enzyme'
import Navbar from 'APP/components/Navbar.jsx';

describe('Navbar Component', () => {
	if('should render a Link to Home route', () => {
		expect(_wrapper.contains(
			<Link activeClassName='route--active' to='/'>Auto</Link>
			)).to.be.true
	})
})