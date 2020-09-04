import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import Message from "./Message.js";
const Students = (props) => {
	const [route, setRoute] = useState("");
	const [optionState, setOptionState] = useState("");
	const [quizId, setQuizId] = useState("");
	const [textMessage, setTextMessage] = useState("");
	const [quizData, setQuizData] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		fetch(`http://localhost:3100/api/${route}`)
			.then((res) => res.json())
			.then((data) => setQuizData(data))
			.catch((err) => console.error(err));
	}, [route]);

	const selectHandler = (event) => {
		setRoute(`quizzes/${event.target.value}`);
		setQuizId(event.target.value);
		setOptionState(event.target.value);
	};

	return (
		<div className="survey-page">
			{isSubmitted ? (
				<Message setIsSubmitted={setIsSubmitted} textMessage={textMessage} />
			) : null}
			<select
				onChange={selectHandler}
				className="form-element"
				value={optionState}
			>
				<option>Select a quiz</option>
				{props.quizData.map((quiz) => {
					return (
						<option key={quiz._id} name={quiz.name} value={quiz._id}>
							{quiz.name}
						</option>
					);
				})}
			</select>
			{quizData.questions_id ? (
				<Questions
					quizData={quizData}
					quizId={quizId}
					setIsSubmitted={setIsSubmitted}
					setTextMessage={setTextMessage}
					setRoute={setRoute}
					setOptionState={setOptionState}
				/>
			) : null}
		</div>
	);
};
export default Students;
