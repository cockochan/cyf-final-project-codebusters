import React, { useState, useEffect } from "react";

export default function Results(props) {
	const [studentNames, setStudentNames]=useState([]);
	const [selQuizQuestions, setSelQuizQuestions]=useState([]);
	const [answeredQuestons, setAnsweredQuestons]=useState([]);
	const [allResults, setAllResults]=useState(null);
	const [quizSelected, setQuizSelected]=useState(null);
	const fetchResults =()=>{
		fetch("http://localhost:3100/api/results/")
			.then((response)=>response.json())
			.then((data)=>setAllResults(data));
	};
	useEffect(() => {

		fetchResults();
	},[]);

	useEffect(() => {



		const makeQuestions=()=>{
			let newQuizQuestions = [];
			selectedQuizQuestions = quizSelected.questions_id.map((selId)=>{

				let found = (props.questions.find((question)=>question._id==selId));
				newQuizQuestions.push(found);
				setSelQuizQuestions(newQuizQuestions);
			}
			);

		};
		makeQuestions();
	},[quizSelected]);

	const quizzToSeeResultsChosen=(e)=>{
		console.log(e.target.id);
		const selectedQuiz=props.quizes.find((quiz)=>(quiz._id=event.target.id));
		setQuizSelected(selectedQuiz);
	};
	if(props.quizes&&allResults){
		return (
			<div className='col-12'>

				<h1>Welcome to QuizzTime</h1>

				<select name="quizzez"  onChange={(e) => quizzToSeeResultsChosen(e)}>
					<option >select a quiz</option>

					{props.quizes.map((quiz)=>{
						return(<option value={quiz.name} id={quiz._id}>{quiz.name}</option>);
					})}

		  </select>
		  {allResults.map((res)=>{
					if(!answeredQuestons.find((answeredQuestion)=>res.question_id=answeredQuestion)) {
						setAnsweredQuestons([...answeredQuestons,res.question_id]);
					}
				})}
		  </div>
		);
	} else{
		return(<div>"no props"</div>);
	}
}
