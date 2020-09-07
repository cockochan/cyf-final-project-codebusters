import React from "react";

const RunQuiz = (props) => {
	const selectHandler = (event) => {
		props.setRoute(`quizzes/${event.target.value}`);
		props.setQuizId(event.target.value);
		props.setCode(
			Math.random()
				.toString(36)
				.replace(/[^a-z0-9]+/g, "")
				.substr(0, 4)
		);
	};

	return (
		<div>
			<select onChange={selectHandler} className="form-element">
				<option>Select a quiz</option>
				{props.quizzes.map((quiz, i) => {
					return (
						<option key={i} name={quiz.name} value={quiz._id}>
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
