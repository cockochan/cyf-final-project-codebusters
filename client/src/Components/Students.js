import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import Message from "./Message.js";

const Students = (props) => {
	const [route, setRoute] = useState("");
	const [quizId, setQuizId] = useState("");
	const [quizName, setQuizName] = useState("");
	const [textMessage, setTextMessage] = useState("");
	const [fetchedData, setFetchedData] = useState([]);
	const [isSubmit, setIsSubmit] = useState(false);

	useEffect(() => {
		fetch(`http://localhost:3100/api/${route}`)
			.then((res) => res.json())
			.then((data) => setFetchedData(data))
			.catch((err) => console.error(err));
	}, [route]);

	const selectHandler = (event) => {
		setRoute(`quizzes/${event.target.value}`);
		setQuizId(event.target.value);
		setQuizName(event.target);
	};

	return (
		<div className="survey-page">
			{isSubmit?<Message setIsSubmit={setIsSubmit} textMessage={textMessage} />:null}
			<select onChange={selectHandler} className="form-element">
				<option>Select a quiz</option>
				{props.quizData.map((quiz) => {
					return (
						<option key={quiz._id} name={quiz.name} value={quiz._id}>
							{quiz.name}
						</option>
					);
				})}
			</select>
			{fetchedData.questions_id ? (
				<Questions
					fetchedData={fetchedData}
					quizId={quizId}
					quizName={quizName}
					setIsSubmit={setIsSubmit}
					setTextMessage={setTextMessage}
				/>
			) : null}
		</div>
	);
};
export default Students;
