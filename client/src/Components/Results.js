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


		if(quizSelected!==null){
			const makeQuestions=()=>{
				let selectedQuizQuestions= [];
				selectedQuizQuestions = quizSelected.questions_id.map((selId)=>{

					let found = (props.questions.find((question)=>question._id==selId));
					selectedQuizQuestions.push(found);
					setSelQuizQuestions(selectedQuizQuestions);
				}
				);

			};
			makeQuestions();
		}

	},[quizSelected]);

	const makeNames=()=>{
		let tempNames = [];
		 allResults.map((oneAnswer)=>{

			if(studentNames&&!tempNames.includes(oneAnswer.studentName)){
				console.log(oneAnswer.studentName);
				tempNames.push(oneAnswer.studentName);
			}
		});
		setStudentNames(tempNames);
	};
	useEffect(() => {
		if(allResults){
			makeNames();
		}
	},[allResults]);

	const quizzToSeeResultsChosen=(e)=>{
		console.log(e.target.value);
		const selectedQuiz=props.quizes.find((quiz)=>(quiz._id=event.target.value));
		setQuizSelected(selectedQuiz);
		setSelQuizQuestions([]);
		setAnsweredQuestons([]);
		setQuizSelected(selectedQuiz);
		if(quizSelected){
			makeQuestions();
		}

	};
	if(props.quizes&&allResults){
		return (
			<div className='col-12'>

				<h1>Welcome to QuizzTime</h1>

				<select name="quizzez"  onChange={quizzToSeeResultsChosen}>
					<option >select a quiz</option>

					{props.quizes.map((quiz)=>{
						return(<option value={quiz._id} >{quiz.name}</option>);
					})}

		  </select>
		  <table></table>
		  {allResults.map((res)=>{
					if(!answeredQuestons.find((answeredQuestion)=>res.question_id=answeredQuestion)) {
						setAnsweredQuestons([...answeredQuestons,res]);
					}
				})}
				<div>
					<table>
						<thead>

							<tr>{selQuizQuestions?selQuizQuestions.map((question)=>{
								return(<th className='col-2'><p>{question.question}</p></th>);
							}):<tr></tr>}</tr>
							{studentNames&&quizSelected?studentNames.map((oneName)=>{
								return(
									<tr>{oneName}</tr>

								);
							}
							):<tr></tr>}
						</thead>

					</table>
		  </div></div>
		  );

	} else{
		return(<div>"no props"</div>);
	}
}
