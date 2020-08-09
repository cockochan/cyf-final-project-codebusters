/* eslint-disable linebreak-style */
import React,{ useState } from "react";

export default function Studentview() {
	const [question, setQuestion] = useState(null);
	const [correctAnswer, setCorrectAnswer] = useState(null);
	const [allAnswers, setAllAnswers] = useState([]);
	const [lives, setLives] = useState(3);
	const [points, setPoints] = useState(0);

	const getNextQuestion = async () => {
		const apiUrl
      = "https://opentdb.com/api.php?amount=1&difficulty=easy&encode=url3986";
		const response = await fetch(apiUrl);
		const result = await response.json();

		setQuestion(result);
		const correctAnswer = decodeURIComponent(result.results[0].correct_answer);
		setCorrectAnswer(correctAnswer);
		const wrongAnswers = result.results[0].incorrect_answers.map((el) =>
			decodeURIComponent(el)
		);
		const allAnswersUnshuffled = wrongAnswers.concat(correctAnswer);
		const allAnswerShuffled = allAnswersUnshuffled.sort(
			() => Math.random() - 0.5
		);
		setAllAnswers(allAnswerShuffled);
	};

	const checkAnswer = (event) => {
		if (correctAnswer === event.target.value) {
			setPoints(points + 1);
			getNextQuestion();
			setCorrectAnswer(null);
		} else {
			setLives(lives - 1);
			getNextQuestion();
			setCorrectAnswer(null);
		}
	};
	if (lives === 0) {
		alert("game over:0 lives, lets start over");
		setLives(3);
		setPoints(0);
	}

	if (question) {
		return (
			<div className="mainGaime">
				<p>{lives} lives</p>
				<p>{points} points</p>
				<h1>{decodeURIComponent(question.results[0].question)}</h1>
				<div className="answers">
					{allAnswers.map((answer) => (
						<button key={answer} onClick={checkAnswer} value={answer}>
							{answer}
						</button>
					))}
				</div>
			</div>
		);
	} else {
		return <button onClick={getNextQuestion}>start</button>;
	}
}
