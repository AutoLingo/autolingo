import React from 'react';

//render single message with UserID and text
var Message = React.createClass({
	render() {
		return (
			<div className="message">
				{
					this.props.user === 'LingoBot' ? 
						<strong>{this.props.user} <img src="img/lingo-bot-icon.png" /> : </strong> :
						<strong>{this.props.user}: </strong>
				}
				<span>{this.props.text}</span>
			</div>
		)
	}
})

export default Message;
