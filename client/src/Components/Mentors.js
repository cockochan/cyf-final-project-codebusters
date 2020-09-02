import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "../App.css";
import "../grid.css";

export default function Mentors(props) {
	const [newQuizzQuestions, setNewQuizzQuestions] = useState([]);
	const [newQuiz, setNewQuiz] = useState({
		name: "",
		publishingDate: "",
		questions_id: [],
	});

	useEffect(() => {
		const makeQuestions = () => {
			let newQuizQuestions = [];
			newQuizQuestions = newQuiz.questions_id.map((selId) => {
				let found = props.questions.find((question) => question._id == selId);
				newQuizQuestions.push(found);
				setNewQuizzQuestions(newQuizQuestions);
			});
		};
		makeQuestions();
	}, [newQuiz.questions_id, props.questions]);

	const addQuestion = (event) => {
		setNewQuiz({
			...newQuiz,
			questions_id: [...newQuiz.questions_id, event.target.value],
		});
	};

	const submitQuiz = () => {
		if (newQuiz.name.length < 8) {
			alert("Quiz name should have at least 8 sybols");
		} else if (newQuizzQuestions.length < 5) {
			alert("Quizz  should have at least 5 questions");
		} else {
			sendQuiz();
		}
	};
	const sendQuiz = () => {
		alert("done");
		fetch("http://localhost:3100/api/quiz", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(newQuiz),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	};
	const newQuizName = (event) => {
		setNewQuiz({
			...newQuiz,
			publishingDate:dayjs().format(),
			name: event.target.value,
		});
	};
	const removeQuestion = (event) => {
		let filteredQustionIds = newQuiz.questions_id.filter((questionId) => {
			return questionId != event.target.value;
		});
		setNewQuiz({
			...newQuiz,
			questions_id: filteredQustionIds,
		});
		setNewQuizzQuestions(
			newQuizzQuestions.filter((question) => question._id != event.target.value)
		);
	};
	if (props.questions) {
		return (
			<div className="row">
				<div className="col-8 cardBlock">
					{props.questions.map((question, index) => (
						<div className="col-6 card" key={index}>
							<div className="quizzQuestion">
								<strong>{question.question}</strong>
							</div>
							<div className="answers">
								{Object.values(question.answers).map((value, index) => {
									return (
										<div key={index}>
											<div className="col-12 answer">{value}</div>
										</div>
									);
								})}
							</div>
							<button
								id={question._id}
								value={question._id}
								onClick={addQuestion}
							>
                Add to quiz
							</button>
						</div>
					))}
				</div>
				<div className="col-4 newQuiz">
					<h1>New quiz</h1>
					<input
						type="text"
						onKeyUp={newQuizName}
						placeholder={"Enter quiz name"}
					/>
					{newQuizzQuestions.map((question) => (
						<div className="col-12 card" key={question.question}>
							<button
								key={question._id + question.question}
								type="checkbox"
								checked="checked"
								id="horns"
								value={question._id}
								onClick={removeQuestion}
							>
                x
							</button>
							<div>{question.question}</div>
							<div className="answers">
								{Object.entries(question.answers).map(([index, value]) => {
									return (
										<div key={index}>
											<div className="col-6">{value}</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
					<button onClick={submitQuiz}>Submit</button>
				</div>
			</div>
		);
	} else {
		return <div>No questions loaded</div>;
	}
}
