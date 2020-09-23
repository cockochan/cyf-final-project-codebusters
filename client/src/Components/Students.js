import React, { useState } from "react";
import Questions from "./Questions";
// import Message from "./Message.js";
import Navbar from "./Navbar";
import Img from "../img/Hoarding1.svg";
const Students = (props) => {
	const [enteredCode, setEnteredCode] = useState("");

	const changeHandler = (event) => {
		setEnteredCode(event.target.value);
	};

	return (
		<div className="background">
			<Navbar />
			<div className="container margin-body">


				{props.quizData.find((quiz) => quiz.code === enteredCode)? (
					<Questions
						quizData={props.quizData.find((quiz) => quiz.code === enteredCode)}
					/>
				) : (
					<div className ="centered">
						<img className="backGroundImage" src={Img} />
						<h1 className="quiz-time">Quiz Time</h1>
						<div className="intro-text">
							<p className="students-intro-text">
								Enter the code provided by your tutor to start the quiz
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
