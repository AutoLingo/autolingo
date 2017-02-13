import React from 'react';

//render single message with UserID and text
const Message = function(props) {
	return (
		<div className="message">
			<strong>{props.user}: </strong>
			
			<span>{props.text}</span>
		</div>
	)
})

export default Message;
