import React from "react";

const RunQuiz = (props) => {
	const selectHandler = (event) => {
		props.setRoute(`quizzes/${event.target.value}`);
		props.setQuizId(event.target.value);
		const selectedQuiz = props.quizzes.find((quiz) => quiz._id === event.target.value);
		props.setCode(selectedQuiz.code);
	};

	return (
		<div>
			<select onChange={selectHandler} className="form-element">
				<option>Select a quiz</option>
				{props.quizzes.map((quiz) => {
					return (
						<option key={quiz._id} name={quiz.name} id={quiz.code} value={quiz._id}>
							{quiz.name}
						</option>
					);
				})}
			</select>
			{props.code ? <h3>code: {props.code}</h3> : null}
		</div>
	);
};

export default RunQuiz;
