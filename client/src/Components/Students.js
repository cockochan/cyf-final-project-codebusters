import React, { useState } from "react";
import Questions from "./Questions";
import Message from "./Message.js";
const Students = (props) => {
	const [enteredCode, setEnteredCode] = useState("");
	const [textMessage, setTextMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [optionState, setOptionState] = useState(false);

	const changeHandler = (event) => {
		setEnteredCode(event.target.value);
	};

	return (
		<div className="surveyPage col-12">
			{isSubmitted ? (
				<Message
					setIsSubmitted={setIsSubmitted}
					textMessage={textMessage}
					setOptionState={setOptionState}
					setCode={props.setCode}
				/>
			) : null}
			<input
				type="text"
				onChange={changeHandler}
				placeholder="Enter quiz code"
				className="studentCodeinput"
				autoFocus
			/>

			{props.quizData.find((quiz) => quiz.code === enteredCode) && !optionState ? (
				<Questions
					quizData={props.quizData.find((quiz) => quiz.code === enteredCode)}
					quizId={props.quizId}
					setIsSubmitted={setIsSubmitted}
					setTextMessage={setTextMessage}
				/>
			) : null}
		</div>
	);
};
export default Students;
