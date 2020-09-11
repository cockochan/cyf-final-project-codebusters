import React, { useState, useEffect } from "react";

export default function Results(props) {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [students, setStudents] = useState([]);
	const [quizRoute, setQuizRoute] = useState("");
	const [allResults, setAllResults] = useState(null);
	const [quizSelected, setQuizSelected] = useState({});
	const [quizSelectedResult, setQuizSelectedResult] = useState([]);

	useEffect(() => {
		fetch("/api/results")
			.then((response) => response.json())
			.then((data) => setAllResults(data))
			.catch((err) => console.error(err));

		fetch(`/api/${quizRoute}`)
			.then((response) => response.json())
			.then((data) => setQuizSelected(data))
			.catch((err) => console.error(err));
	}, [quizRoute]);

	//Remove the duplicated data from array
	function uniqBy(array, key) {
		let seen = {};
		return array.filter(function (item) {
			let k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		});
	}

	const changeHandler = (event) => {
		setStudents([]);
		setQuizRoute(`quizzes/${event.target.value}`);
		const selectedResult = allResults.filter(
			(result) => result.quiz_id === event.target.value
		);
		setQuizSelectedResult(selectedResult);
		const names = selectedResult.map((result) => result.studentName);
		if (selectedResult.length > 0) {
			setStudents(uniqBy(names, JSON.stringify));

			const ids = props.quizzes.find((quiz) => quiz._id === event.target.value)
				.questions_id;
			const questions = ids.map((id) => {
				return props.questions.find((question) => question._id === id);
			});
			setQuizQuestions(questions);
		}
	};

	const getLastAttempt = (student) => {
		const questionId = quizQuestions.length > 0 ? quizQuestions[0]._id : null;
		const allatemmpts = quizSelectedResult.filter(
			(quizResult) =>
				quizResult.studentName === student
        && quizResult.question_id === questionId
		);
		return allatemmpts[allatemmpts.length - 1].timestamp;
	};

	const getValues = (student, questionId) => {
		const allatemmpts = quizSelectedResult.filter(
			(quizResult) =>
				quizResult.studentName === student
        && quizResult.question_id === questionId
		);
		if (allatemmpts.length > 0) {
			let setTimestamp = getLastAttempt(student);

			const finalResult = allatemmpts.find((attempt) => {
				return attempt.timestamp >= setTimestamp;
			});

			if (finalResult && finalResult.value) {
				return (
					<td key={finalResult._id} className={colorState(finalResult.correct)}>
						{finalResult.value}
					</td>
				);
			} else {
				return (
					<td key={Math.floor(Math.random(0) * 100000)} className="unknown">
            No Answer
					</td>
				);
			}
		} else {
			return (
				<td key={Math.floor(Math.random(0) * 100000)} className="unknown">
          No Answer
				</td>
			);
		}
	};

	const colorState = (correct) => {
		if (correct) {
			return "corect";
		} else {
			return "incorect";
		}
	};

	return (
		<div>
			<div>
				<div className="col-12">
					<h1>Welcome to QuizzTime</h1>
					<select className="input select-input" onChange={changeHandler}>
						<option>Select a Quiz</option>
						{props.quizzes.map((quiz) => {
							return (
								<option key={quiz._id} value={quiz._id}>
									{quiz.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div>
				{quizSelected._id ? (
					<div>
						<div>
							{students.length > 0 ? (
								<table>
									<thead>
										<tr>
											<th></th>
											{quizQuestions.length > 0
												? quizQuestions.map((question) => {
													return (
														<th key={question._id}>{question.question}</th>
													);
												})
												: null}
										</tr>
									</thead>
									<tbody>
										{students.map((student, index) => {
											return (
												<tr key={index}>
													<th>{student}</th>
													{quizQuestions.map((question) =>
														getValues(student, question._id)
													)}
												</tr>
											);
										})}
									</tbody>
								</table>
							) : (
								<h4>No body answer this quiz!</h4>
							)}
						</div>
					</div>
				) : (
					<p>please select a quiz to see the result</p>
				)}
			</div>
		</div>
	);
}
