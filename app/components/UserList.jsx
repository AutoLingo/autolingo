import React from 'react';

//renderUser function that return the li tag for each of the users
const UsersList = function (props) {
		return (
			<div className="users">
				<h3>Current Online Users</h3>
				<ul>
					{
						//Need to have users information in the database
						props.users.map((user, i) => {
							return (

								<li key={i} onClick={()=>props.joinVideoChat(user)}><img src="APP/public/img/videocam.png" height="25" width="25"/>{user}</li>

							)
						})
					}
				</ul>
			</div>
		)
}

export default UsersList;
