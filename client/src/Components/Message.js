import React from "react";

const Message = (props) => {
	return (
		<div className="message-container">
			<h3>{props.textMessage} </h3>
			<div className="close-container">
				<span className="close-message" onClick={() => props.setIsSubmit(false)}>
                    OK
				</span>
			</div>
		</div>
	);
};

export default Message;
