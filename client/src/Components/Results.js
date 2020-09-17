import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import your icons
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Results(props) {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [students, setStudents] = useState([]);
	const [studentSelected, setStudentSelected] = useState([]);
	const [quizRoute, setQuizRoute] = useState("");
	const [allResults, setAllResults] = useState(null);
	const [quizSelected, setQuizSelected] = useState({});
	const [quizSelectedResults, setQuizSelectedResults] = useState([]);
	const [attemptNumber, setAttemptNumber] = useState(1);
	const [attemptCounter, setAttemptCounter] = useState(1);
	const [isShowDetails, setIsShowDetails] = useState(false);

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
		setAttemptNumber(1);
		setAttemptCounter(1);
		setStudents([]);
		setQuizRoute(`quizzes/${event.target.value}`);
		const selectedResults = allResults.filter(
			(result) => result.quiz_id === event.target.value
		);
		setQuizSelectedResults(selectedResults);
		const names = selectedResults.map((result) => result.studentName);
		if (selectedResults.length > 0) {
			setStudents(uniqBy(names, JSON.stringify)); //remove duplicated names from array

			const questionIds = props.quizzes.find(
				(quiz) => quiz._id === event.target.value
			).questions_id;
			const questions = questionIds.map((questionId) => {
				return props.questions.find((question) => question._id === questionId);
			});
			setQuizQuestions(questions);
		}
	};

	const getLastAttempt = (student) => {
		const questionId = quizQuestions.length > 0 ? quizQuestions[0]._id : null;
		const allAttempts = quizSelectedResults.filter(
			(quizResult) =>
				quizResult.studentName === student
        && quizResult.question_id === questionId
		);
		if (allAttempts.length >= attemptNumber) {
			return allAttempts[allAttempts.length - attemptNumber].timestamp;
		} else {
			return null;
		}
	};

	const getValues = (student, questionId) => {
		const allAttempts = quizSelectedResults.filter(
			(quizResult) =>
				quizResult.studentName === student
        && quizResult.question_id === questionId
		);
		if (allAttempts.length > 0) {
			let timestamp = getLastAttempt(student);
			if (!timestamp) {
				return null;
			} else {
				const finalResult = allAttempts.find((attempt) => {
					return attempt.timestamp >= timestamp;
				});
				if (finalResult && finalResult.value) {
					return (
						<td
							key={finalResult._id}
							className={colorState(finalResult.correct)}
						>
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
			return "correct";
		} else {
			return "incorrect";
		}
	};

	const previousAttempt = () => {
		setAttemptNumber(attemptNumber + 1);
	};

	const nextAttempt = () => {
		setAttemptNumber(attemptNumber - 1);
	};

	const getScore = (student) => {
		let studentScores = 0;
		if (quizQuestions.length > 0) {
			quizQuestions.map((question) => {
				studentScores = studentScores + scoreCounter(student, question._id);
			});
			return studentScores;
		}
	};

	//calculat the scores
	const scoreCounter = (student, questionId) => {
		const allAttempts = quizSelectedResults.filter(
			(quizResult) =>
				quizResult.studentName === student
        && quizResult.question_id === questionId
		);
		if (allAttempts.length <= 0) {
			return 0;
		}

		allAttempts.length > attemptCounter
			? setAttemptCounter(allAttempts.length)
			: null;
		let timestamp = getLastAttempt(student);
		if (!timestamp) {
			return 0;
		} else {
			const finalResult = allAttempts.find((attempt) => {
				return attempt.timestamp >= timestamp;
			});

			if (!finalResult || !finalResult.value) {
				return 0;
			}
			if (finalResult.correct) {
				return 1;
			} else {
				return 0;
			}
		}
	};

	const showDetail = (student) => {
		setIsShowDetails(true);
		setStudentSelected([student]);
	};

	const closeDetails = () => {
		setIsShowDetails(false);
		setStudentSelected([]);
	};

	return (
		<div>
			<Navbar mentors="Mentors" results="Results" newquestion="New Question" />
			<div className="container">
				<div>
					<div className="col-12 quiz-handler">
						<div className="col-6">
							<h2>Welcome to Quiz Time</h2>
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
						{quizQuestions.length > 0 ? (
							<div className="quiz-handler col-5">
								<button
									className="quiz-button card-button"
									onClick={previousAttempt}
									disabled={attemptNumber >= attemptCounter}
								>
                  Previous Attempt
								</button>
								<button
									className="quiz-button card-button"
									onClick={nextAttempt}
									disabled={attemptNumber <= 1}
								>
                  Next Attempt
								</button>
								<span>
                  Current Attempt : {attemptCounter - attemptNumber + 1}
								</span>
							</div>
						) : null}
					</div>
				</div>
				<div>
					{isShowDetails ? (
						<table>
							<thead>
								<tr>
									<th>
										<FontAwesomeIcon
											icon={faTimes}
											style={{
												color: "red",
												cursor: "pointer",
												fontSize: "35px",
											}}
											onClick={closeDetails}
										/>
									</th>

									{studentSelected.length > 0
										? studentSelected.map((student, index) => {
											return <th key={index}>{student}</th>;
										})
										: null}
								</tr>
							</thead>
							<tbody>
								{quizQuestions.length > 0
									? quizQuestions.map((question) => {
										return (
											<tr key={question._id}>
												<th key={question._id}>{question.question}</th>
												{studentSelected.map((student) => {
													return getValues(student, question._id);
												})}
											</tr>
										);
									})
									: null}
							</tbody>
						</table>
					) : null}
					{quizSelected._id ? (
						<div>
							{students.length > 0 ? (
								<div className="results-container">
									<div className="col-12">
										<table className="col-6">
											<thead>
												<tr>
													<th className="no-border">Name</th>
													<th className="no-border">Score</th>
													<th className="no-border"></th>
												</tr>
											</thead>
											<tbody>
												{students.length > 0
													? students.map((student, index) => {
														return (
															<tr key={index}>
																<th>{student}</th>
																<td>
																	{getScore(student)}/{quizQuestions.length}
																</td>
																<td>
																	<button
																		className="quiz-button"
																		onClick={() => showDetail(student)}
																	>
                                      Show Ditails
																	</button>
																</td>
															</tr>
														);
													})
													: null}
											</tbody>
										</table>
									</div>
								</div>
							) : (
								<h4>Nobody answered this quiz!</h4>
							)}
						</div>
					) : (
						<p>Please select a quiz to see the results</p>
					)}
				</div>
			</div>
		</div>
	);
}
