/* eslint-disable linebreak-style */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable linebreak-style */
import React, { useState, useEffect }  from "react";
import  MockQuestions from "../MockQuestions.json";
const Mentors = () => {
	// const MockQuestionsParsed = MockQuestions.json();
	const [results,setResults]=useState(MockQuestions);
	const [question, setQuestion] = useState(null);
	const [correctAnswer, setCorrectAnswer] = useState(null);
	const [allAnswers, setAllAnswers] = useState([]);
	const [lives, setLives] = useState(3);
	const [points, setPoints] = useState(0);
	// useEffect(() => {
	// 	// Update the document title using the browser API
	// 	const getNextQuestion = async () => {
	// 		const apiUrl
	//   = "https://opentdb.com/api.php?amount=10&difficulty=easy&encode=url3986";
	// 		fetch(apiUrl).then((result) =>result.json()).then( (data)=>

	// 			setResults(data));
	// 		if(results){
	// 			const correctAnswer = decodeURIComponent(results.results[0].correct_answer);
	// 			setCorrectAnswer(correctAnswer);
	// 			const wrongAnswers = results.results[0].incorrect_answers.map((el) =>
	// 				decodeURIComponent(el)
	// 			);
	// 			const allAnswersUnshuffled = wrongAnswers.concat(correctAnswer);
	// 			const allAnswerShuffled = allAnswersUnshuffled.sort(
	// 				() => Math.random() - 0.5
	// 			);
	// 			setAllAnswers(allAnswerShuffled);
	// 		}

	// 	};
	// 	getNextQuestion();
	// },[]);

	return (
		<div className='row'>
			<div className="quizSection col-3">
				<h1>your quiz</h1></div>
			<div className='cardbox col-6'>
				<div className='row'>
					{results.map((quest)=>{

						return (

							<div className ='card col-4'>
								<label>
									<input type="checkbox"

									/>
      Add to  quiz!
								</label>
								<div>{quest.question}</div>
								<div className='allAnswers col-2'>
									{Object.entries(quest.answers).map(([key, value]) => {

										return (
											<div>

												<p className="mentorCardAnswers">{value}</p>
											</div>
										);


									})}</div>
							</div>

						);
					})}</div></div></div>);
};
export default Mentors;