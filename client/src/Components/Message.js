import React from "react";

const Message = (props) => {
	const messageHandler = () => {
		props.setIsSubmitted(false);
		props.setOptionState(true);
		props.setCode("");
	};
	return (
		<div className="message-container">
			<h3>{props.textMessage} </h3>
			<div className="close-container">
				<span className="close-message" onClick={messageHandler}>
          			OK
				</span>
			</div>
		</div>
	);
};

export default Message;
