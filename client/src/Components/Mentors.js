import React, { useEffect, useState } from "react";
import "../App.css";
import "../grid.css";

export default function Mentors(props) {
	const [newQuizzQuestions, setNewQuizzQuestions] = useState([]);
	const [refreshQuestions, setRefreshQuestions] = useState(false);

	const [newQuizz, setNewQuizz] = useState({
		name: "",
		publiShingDate: "",
		questions_id: [],
	});

	useEffect(() => {
		const makeQuestions = () => {
			let newQuizQuestions = [];
			newQuizQuestions = newQuizz.questions_id.map((selId) => {
				let found = props.questions.find((question) => question._id == selId);
				newQuizQuestions.push(found);
				setNewQuizzQuestions(newQuizQuestions);
			});
		};
		makeQuestions();
	}, [newQuizz.questions_id, props.questions]);

	const addQuestion = (e) => {
		setNewQuizz({
			...newQuizz,
			questions_id: [...newQuizz.questions_id, e.target.value],
		});
	};
	const submitNewQ = () => {
		if (newQuizz.name.length < 8) {
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
			body: JSON.stringify(newQuizz),
		})
			.then((response) => response.json())
			.catch((err) => console.error(err));
	};
	const newQuizName = (e) => {
		setNewQuizz({
			...newQuizz,
			name: e.target.value,
		});
	};

	const removeQuestion = (e) => {
		let filterIdArr = newQuizz.questions_id.filter((boo) => {
			return boo != e.target.value;
		});
		setNewQuizz({
			...newQuizz,
			questions_id: filterIdArr,
		},
		setRefreshQuestions(!refreshQuestions)
		);
		setNewQuizzQuestions(
			newQuizzQuestions.filter((obj) => obj._id != e.target.value)
		);
	};
	if (props.questions) {
		return (
			<div className="row">
				<div className="col-9 cardBlock">
					{props.questions.map((quest, index) => (
						<div className="col-6 card" key={index}>
							<button id={quest._id} value={quest._id} onClick={addQuestion}>
                add to quiz
							</button>
							<div className="quizzQuestion">
								<strong>{quest.question}</strong>
							</div>
							<div className="answers">
								{Object.values(quest.answers).map((value, index) => {
									return (
										<div key={index}>
											<div className="col-12 answer">{value}</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
				<div className="col-3 newQuiz">
					<h1>New quiz</h1>
					<input
						type="text"
						onKeyUp={newQuizName}
						placeholder={"new quiz name"}
					/>
					{newQuizzQuestions.map((quest) => (
						<div className="col-12 card" key={quest.question}>
							<button
								key={quest._id + quest.question}
								type="checkbox"
								checked="checked"
								id="horns"
								value={quest._id}
								onClick={removeQuestion}
							>
                x
							</button>
							<div>{quest.question}</div>
							<div className="answers">
								{Object.entries(quest.answers).map(([index, value]) => {
									return (
										<div key={index}>
											<div className="col-6">{value}</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
					<button onClick={submitNewQ}>submit new quizz</button>
				</div>
			</div>
		);
	} else {
		return <div>no questions loaded</div>;
	}
}
