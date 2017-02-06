import React, {Component} from 'react';
import {connect} from 'react-redux';

var Login = React.createClass ({

	render() {
		return (
			<div className='form-page__wrapper'>
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Login</h2>
					</div>
				</div>

				<form>
					<div className="form__field-wrapper">
			        	<label className="form__field-label" htmlFor="username">Username</label>
			        	<input className="form__field-input" type="text" id="username" placeholder="Type your username" />
			        </div>

			        <div className="form__field-wrapper">
			        	<label className="form__field-label" htmlFor="password">Password</label>
			        	<input className="form__field-input" id="password" type="password" placeholder="Type your password" />
			        </div>
				</form>
			</div>
		)
	}
})

export default Login;