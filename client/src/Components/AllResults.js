import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
export default function AllResults(props) {

	const [studentNames, setStudentNames]=useState([]);
	const [selectedQuizQuestions, setSelectedQuizQuestions]=useState([]);
	const [quizRoute,setQuizRoute]=useState("");
	const [allResults, setAllResults]=useState(null);
	const [quizSelected, setQuizSelected]=useState(null);
	const fetchResults =()=>{
		fetch(`/api/results/${quizRoute}`)
			.then((response)=>response.json())
			.then((data)=>{
				setAllResults(data);
			}
			)	.catch((err) => console.error(err));
	};
	const findQuestionResult=(actualQuestionId, oneName)=>{
		let resultsforThisQuestion = allResults.filter((result)=>result.question_id==actualQuestionId);

		let studentsAttemptsOnQuestion = resultsforThisQuestion.filter((result)=>result.studentName==oneName);
		if(studentsAttemptsOnQuestion.length==0){
			return("unknown");
		}
		if(studentsAttemptsOnQuestion[studentsAttemptsOnQuestion.length-1]===undefined){
			return("unknown");
		}
		if(studentsAttemptsOnQuestion!==undefined&&studentsAttemptsOnQuestion[studentsAttemptsOnQuestion.length-1].correct){
			return("correct");
		} else{
			return("incorrect");
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
		if(studentAnsweredQuestion!==undefined&&studentAnsweredQuestion[studentAnsweredQuestion.length-1]){
			return(studentAnsweredQuestion[studentAnsweredQuestion.length-1].value);
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

	const quizToSeeResultsChosen=(e)=>{
		setQuizRoute(e.target.value);
		const selectedQuiz=props.quizzes.find((quiz)=>(quiz._id==e.target.value));
		setSelectedQuizQuestions([]);
		setQuizSelected(selectedQuiz);
	};
	if(allResults=="not found!"){
		return(
			<div className='col-12 centered'>
				<h1> no results for this quiz have been submitted yet</h1>
				<div className='col-12'>
					<h1>Welcome to QuizzTime</h1>
					<select name="quizez" className="quizez"  onChange={quizToSeeResultsChosen}>
						<option >select a quiz</option>
						{props.quizzes.map((quiz)=>{
							return(<option value={quiz._id} >{quiz.name}</option>);
						})}
		  </select>
				</div></div>);
	} else if(props.quizzes){
		return (
			<div>
				<div className="allresults"  className='col-6 centered'>
					<h1>Chosse a quiz to see student results</h1>
					<select name="quizzez" className="quizzez" onChange={quizToSeeResultsChosen}>
						<option value="" disabled selected hidden>select a quiz</option>
						{props.quizzes.map((quiz)=>{
							return(<option value={quiz._id} >{quiz.name}</option>);
						})}
		  </select>

					{quizSelected&&allResults&&allResults!=="not found!"?<div><div className='centered'>
					</div>
					<table>
						<thead>
							<tr><td></td>{selectedQuizQuestions?selectedQuizQuestions.map((question, index)=>{

								{question.question;}

								return(<th  key={index} className='col-1'></th>);
							}):<tr></tr>}</tr>
							{studentNames&&quizSelected?studentNames.filter(Boolean).map((oneName, index)=>{
								return(

									<tr><td className="col-1">{oneName}</td>{selectedQuizQuestions?selectedQuizQuestions.map((question,index)=>{
										return(<th className={findQuestionResult(question._id, oneName)} data-tip data-for={findStudenAnswerResult(question._id, oneName)}></th>);
									}):null}</tr>
								);
							}
							):null}
						</thead>

					</table>
		  </div>:null}
		 </div>
		 </div>
		);
	} else{
		return(<div>no props</div>);
	}
}

