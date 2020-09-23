import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import your icons
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

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
	const [sortBy, setSortBy] = useState(null);
	const [isDescending, setIsDescending] = useState(false);
	const [allStudents, setAllStudents]=useState([]);

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
		setAllStudents([]);
		setIsShowDetails(false);
		setQuizRoute(`quizzes/${event.target.value}`);
		const selectedResults = allResults.filter(
			(result) => result.quiz_id === event.target.value
		);
		setQuizSelectedResults(selectedResults);
		const names = selectedResults.map((result) => result.studentName);
		if (selectedResults.length > 0) {
			setAllStudents(uniqBy(names, JSON.stringify));
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
			setStudents((students) =>
				[].concat(
					students.filter((studentName) => studentName !== student))
			);
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
		setStudents(allStudents);
		setAttemptNumber(attemptNumber + 1);
	};

	const nextAttempt = () => {
		setStudents(allStudents);
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
	useEffect(() => {
		const sortHandler = () => {
			setStudents((s) => [].concat(s.sort()));
		};
		const sortByScore = () => {
			!isDescending
				? setStudents((s) =>
					[].concat(
						s.sort(function (a, b) {
							if (getScore(a) > getScore(b)) {
								return -1;
							} else {
								return 1;
							}
						})
					)
				)
				: setStudents((s) =>
					[].concat(
						s.sort(function (a, b) {
							if (getScore(a) > getScore(b)) {
								return 1;
							} else {
								return -1;
							}
						})
					)
				);
		};

		if (sortBy === "name") {
			sortHandler();
		} else if (sortBy === "score") {
			sortByScore();
		}
	}, [sortBy, isDescending]);

	const sortScores = () => {
		setIsDescending(!isDescending);
		setSortBy("score");
	};

	return (
		<div>
			<Navbar mentors="Mentors" results="Results" newquestion="New Question" />
			<div className="container margin-body">
				<div>
					<div className="col-12 quiz-result-handler">
						<div className="result-handler">
							<div className="col-4 select-result">
								<select className="input" onChange={changeHandler}>
									<option>Select a Quiz</option>
									{props.quizzes.length
										? props.quizzes.map((quiz) => {
											return (
												<option key={quiz._id} value={quiz._id}>
													{quiz.name}
												</option>
											);
										})
										: null}
								</select>
							</div>
							<div className="col-8 attempt-handler-container">
								{quizQuestions.length > 0 ? (
									<div className="attempt-handler col-12">
										<div className="current-attempt-handler">
											<span>
                        Current Attempt:{" "}
												<strong>{attemptCounter - attemptNumber + 1}</strong>
											</span>
										</div>
										<div className=" attempt-buttons-container">
											<button
												className="btn btn-primary btn-sm w-20"
												onClick={previousAttempt}
												disabled={attemptNumber >= attemptCounter}
												style={{ marginLeft: "10px" }}
											>
                        Previous Attempt
											</button>
											<button
												className="btn btn-primary btn-sm w-20"
												onClick={nextAttempt}
												disabled={attemptNumber <= 1}
												style={{ marginLeft: "10px" }}
											>
                        Next Attempt
											</button>
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
				<div>
					{quizSelected._id ? (
						<div>
							{students.length > 0 ? (
								<div className="results-container">
									<div className="col-12 tables-container">
										<div className="col-4 scroll-table">
											<ReactTooltip id="sortByScore" place="top" effect="solid">
                        Sort the result by score
											</ReactTooltip>
											<ReactTooltip id="sortByName" place="top" effect="solid">
                        Sort the result by Name
											</ReactTooltip>
											<table className="table-score">
												<thead className="table-head">
													<tr>
														<th
															className="no-border"
															onClick={() => setSortBy("name")}
															style={{ cursor: "pointer" }}
															data-tip
															data-for="sortByName"
														>
                              Name
														</th>
														<th
															className="no-border"
															onClick={sortScores}
															style={{ cursor: "pointer" }}
															data-tip
															data-for="sortByScore"
														>
                              Score
														</th>
													</tr>
												</thead>
												<tbody className="table-body">
													{students.map((student, index) => {
														return (
															<tr
																key={index}
																onClick={() => showDetail(student)}
																className="score-row"
															>
																<th>{student}</th>
																<td>
																	{getScore(student)}/{quizQuestions.length}
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>
										<div className="col-8">
											{isShowDetails ? (
												<table className="table-body col-12">
													<thead className="table-head">
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
																		<th key={question._id}>
																			{question.question}
																		</th>
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
										</div>
									</div>
								</div>
							) : (
								<h4 className="info-align">Nobody answered this quiz!</h4>
							)}
						</div>
					) : (
						<h4 className="info-align">
              Please select a quiz to see the results
						</h4>
					)}
				</div>
			</div>
		</div>
	);
}
