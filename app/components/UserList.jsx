import React from 'react';

//renderUser function that return the li tag for each of the users
var UsersList = React.createClass({
	render() {
		return (
			<div className="users">
				<h3>Current Online Users</h3>
				<ul>
					{
						//Need to have users information in the database
						this.props.users.map((user, i) => {
							return (
								<li key={i}><img src="APP/public/img/videocam.png" height="25" width="25"/> {user}</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
})

export default UsersList;
