import React, { useState, useEffect } from "react";

export default function Results(props) {
	const [studentNames, setStudentNames]=useState([]);
	const [selectedQuizQuestions, setSelectedQuizQuestions]=useState([]);
	const [quizRoute,setQuizRoute]=useState("");
	const [allResults, setAllResults]=useState(null);
	const [quizSelected, setQuizSelected]=useState(null);
	const [attemptNumber, setAttemptNumber]=useState(0);
	const fetchResults =()=>{
		fetch(`http://localhost:3100/api/results/${quizRoute}`)
			.then((response)=>response.json())
			.then((data)=>{
				setAllResults(data);
			}
			)	.catch((err) => console.error(err));
	};
	const increaseAttemptNumber = () =>setAttemptNumber(attemptNumber+1);
	const decreaseAttemptNumber =()=> {
		if(attemptNumber>0){
			setAttemptNumber(attemptNumber-1);
		} else{
			return("can't increase");
		}
	};
	const findQuestionResult=(actualQuestionId, oneName)=>{
		let resultsforThisQuestion = allResults.filter((result)=>result.question_id==actualQuestionId);

		let studentsAttemptsOnQuestion = resultsforThisQuestion.filter((result)=>result.studentName==oneName);
		if(studentsAttemptsOnQuestion.length==0){
			return("unknown");
		}
		if(studentsAttemptsOnQuestion[attemptNumber]===undefined){
			return("unknown");
		}
		if(studentsAttemptsOnQuestion!==undefined&&studentsAttemptsOnQuestion[attemptNumber].correct){
			return("corect");
		} else{
			return("incorect");
		}
	};
	const findStudenAnswerResult=(actualQuestionId, oneName)=>{
		let studentAnsweredId = allResults.filter((el)=>el.question_id==actualQuestionId);
		let studentAnsweredQuestion = studentAnsweredId.filter((el)=>el.studentName==oneName);
		if(studentAnsweredQuestion.length==0){
			return("unknown");
		}
		if(studentAnsweredQuestion.length>0){
		}
		if(studentAnsweredQuestion!==undefined&&studentAnsweredQuestion[attemptNumber]){
			return(studentAnsweredQuestion[attemptNumber].value);
		}
	};
	useEffect(() => {
		fetchResults();
	},[quizRoute]);
	useEffect(() => {
		if(quizSelected!==null){
			const makeQuestions=()=>{
				let selectedQuizQuestions= [];
				selectedQuizQuestions = quizSelected.questions_id.map((selId)=>{
					let found = (props.questions.find((question)=>question._id==selId));
					selectedQuizQuestions.push(found);
					setSelectedQuizQuestions(selectedQuizQuestions);
				}
				);
			};
			makeQuestions();
		}
	},[quizSelected]);
	const makeNames=()=>{
		let tempNames = [];
		 if(allResults!=="not found!"){
			allResults.map((oneAnswer)=>{
				if(studentNames&&!tempNames.includes(oneAnswer.studentName)){
					tempNames.push(oneAnswer.studentName);
				}
			});
			setStudentNames(tempNames);
		}
	};
	useEffect(() => {
		if(allResults){
			makeNames();
		}
	},[allResults]);

	const quizzToSeeResultsChosen=(e)=>{
		setQuizRoute(e.target.value);
		const selectedQuiz=props.quizes.find((quiz)=>(quiz._id==e.target.value));
		setSelectedQuizQuestions([]);
		setQuizSelected(selectedQuiz);
	};
	if(allResults=="not found!"){
		return(
			<div className='col-12 centered'>
				<h1> no results for this quiz have been submitted yet</h1>
				<div className='col-12'>
					<h1>Welcome to QuizzTime</h1>
					<select name="quizzez" className="quizzez"  onChange={quizzToSeeResultsChosen}>
						<option >select a quiz</option>
						{props.quizes.map((quiz)=>{
							return(<option value={quiz._id} >{quiz.name}</option>);
						})}
		  </select>
				</div></div>);
	} else if(props.quizes){
		return (
			<div  className='col-12 centered'>
				<h1>Chosse a quizz to see student results</h1>
				<select name="quizzez" className="quizzez" onChange={quizzToSeeResultsChosen}>
					<option value="" disabled selected hidden>select a quiz</option>
					{props.quizes.map((quiz)=>{
						return(<option value={quiz._id} >{quiz.name}</option>);
					})}
		  </select>
		  <div className='centered'><h2>attempt number {attemptNumber+1} </h2><p>(change to see if some students made multiple attempts)</p></div>
				<button onClick={decreaseAttemptNumber}>decrease attempt number </button>
				<button onClick={increaseAttemptNumber}>increase attempt number </button>
				{quizSelected&&allResults&&allResults!=="not found!"?<table>
					<thead>
						<tr><td></td>{selectedQuizQuestions?selectedQuizQuestions.map((question)=>{
							return(<th className='col-2'>{question!==undefined?<p>{question.question}</p>:<p>Loading question</p>}</th>);
						}):<tr></tr>}</tr>
						{studentNames&&quizSelected?studentNames.filter(Boolean).map((oneName)=>{
							return(
								<tr><td>{oneName}</td>{selectedQuizQuestions?selectedQuizQuestions.map((question)=>{
									return(<th className={findQuestionResult(question._id, oneName)}>{question!==undefined?<p>{findStudenAnswerResult(question._id, oneName)}</p>:<p>Loading question</p>}</th>);
								}):null}</tr>
							);
						}
						):null}
					</thead>

				</table>:null}
		 </div>
		  );
	} else{
		return(<div>no props</div>);
	}
}

