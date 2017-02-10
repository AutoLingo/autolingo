import React from 'react';

//renderUser function that return the li tag for each of the users
const UsersList = function (props) {
		return (
			<div className="users">


				<div className="panel panel-default">
				  <div className="panel-heading">
				    <h3 className="panel-title">Panel primary</h3>
				  </div>
				  <div className="panel-body">
				    Panel content
				  </div>
				</div>

				{/*<h3>Current Online Users</h3>
				<ul>
					{
						//Need to have users information in the database
						props.users.map((user, i) => {
							if ( user === props.userName) {
								return (
									<li className="lingo-blue" key={i}>{user}</li>
								)
							} else {
								return (						
									<li key={i} onClick={()=>props.joinVideoChat(user, props.room)}><img src="APP/public/img/videocam.png" height="25" width="25"/>{user}</li>
								)
							}
						})
					}
				</ul>*/}
			</div>
		)
}

export default UsersList;
