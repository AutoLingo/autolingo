import React from 'react';

//renderUser function that return the li tag for each of the users
const UsersList = function (props) {
		return (
			<div className="users">


				<div className="panel panel-default">
				  <div className="panel-heading">
				    <h3 className="panel-title">Online Users</h3>
				  </div>
				  <div className="panel-body">

					  <div className="list-group">

					    {
					    	//Need to have users information in the database
					    	props.users.map((user, i) => {
					    		if ( user === props.userName) {
					    			return (
					    				<a key={i} className="lingo-blue list-group-item disabled">
					    				  {user}
					    				</a>
					    			)
					    		} else {
					    			return (
						    			<a key={i} onClick={()=>props.joinVideoChat(user, props.room)} className="list-group-item">
							    			{user}
						    				<img src="img/video-chat-icon.png" />
						    			</a>
					    			)
					    		}
					    	})
					    }


					  </div>
				  </div>
				</div>

			</div>
		)
}

export default UsersList;
