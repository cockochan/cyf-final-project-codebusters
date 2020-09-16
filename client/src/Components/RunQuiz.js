import React, { useState } from "react";

const RunQuiz = (props) => {
	const[code, setCode]=useState("");
	const selectHandler = (event) => {
		const selectedQuiz = props.quizzes.find((quiz) => quiz._id === event.target.value);
		setCode(selectedQuiz.code);
	};

	return (
		<div className="col-12 quiz-selection">

			<select onChange={selectHandler} className="btn btn-light dropdown-toggle">
				<option>Select a quiz</option>
				{props.quizzes.map((quiz) => {
					return (
						<option key={quiz._id} name={quiz.name} id={quiz.code} value={quiz._id}>
							{quiz.name}
						</option>
					);
				})}
			</select>

			<div className="col-6">
				{code ? <h3>Code: {code}</h3> : null}
			</div>
		</div>
	);
};

export default RunQuiz;
