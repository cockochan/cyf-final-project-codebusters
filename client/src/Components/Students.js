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
		<div className="background">
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
						<div className ="centered">
							<img className="backGroundImage" src="client/src/img/Hoarding1.svg"/>
							<h1 className="quiz-time">Quiz Time</h1>
							<div className="intro-text">
								<p>
             					Enter the provided code by your teacher to begin the quiz
								</p>
								<input
								type="text"
								onChange={changeHandler}
								placeholder="Enter the code here.."
								className="input"
								autoFocus
								/>
							</div>
						</div>
					)}
			</div>

		</div>
	);
};
export default Students;
