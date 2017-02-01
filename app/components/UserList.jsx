import React from 'react';

//renderUser function that return the li tag for each of the users
var UsersList = React.createClass({
	render() {
		return (
			<div className="users">
				<h3>Online Users</h3>
				<ul>
					{	
						//Need to have users information in the database
						this.props.users.map((user, i) => {
							return (
								<li key={i}>{user}</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
})

export default UsersList;
