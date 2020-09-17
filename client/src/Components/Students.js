import React, { useState } from "react";
import Questions from "./Questions";
import Message from "./Message.js";
import Navbar from "./Navbar";

const Students = (props) => {
	const [enteredCode, setEnteredCode] = useState("");
	const [textMessage, setTextMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [optionState, setOptionState] = useState(false);

	const changeHandler = (event) => {
		setEnteredCode(event.target.value);
	};

	return (
		<div >
			<Navbar />
			<div className="container">
				{isSubmitted ? (
					<Message
						setIsSubmitted={setIsSubmitted}
						textMessage={textMessage}
						setOptionState={setOptionState}
					/>
				) : null}

				{props.quizData.find((quiz) => quiz.code === enteredCode)
      && !optionState ? (
						<Questions
							quizData={props.quizData.find((quiz) => quiz.code === enteredCode)}
							setIsSubmitted={setIsSubmitted}
							setTextMessage={setTextMessage}
						/>
					) : (
						<div className="centered">
							<p>
            Please enter the code provided by your teacher to begin the quiz
							</p>
							<input
								type="text"
								onChange={changeHandler}
								placeholder="Enter the code"
								className="input"
								autoFocus
							/>
						</div>
					)}
			</div>

		</div>
	);
};
export default Students;
