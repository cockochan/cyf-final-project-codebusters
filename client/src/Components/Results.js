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
			.then((data)=>{
				setAllResults(data);
				console.log({ data });
			});
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
					console.log({ found });
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



		const selectedQuiz=props.quizes.find((quiz)=>(quiz._id==e.target.value));
		console.log(selectedQuiz);
		setQuizSelected(selectedQuiz);
		setSelQuizQuestions([]);
		setAnsweredQuestons([]);
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

		  {selQuizQuestions.map((res)=>{
			  let tempAnsweredQuestion =[];
					if(allResults.find((question)=>res.question_id==question.question_id)) {
						tempAnsweredQuestion.push(question);
						setAnsweredQuestons(tempAnsweredQuestion);
					}
				})}
				<div>
					<table>
						<thead>

							<tr><td></td>{selQuizQuestions?selQuizQuestions.map((question)=>{
								return(<th className='col-2'>{question!==undefined?<p>{question.question}</p>:<p>Loading question</p>}</th>);
							}):<tr></tr>}</tr>
							{studentNames&&quizSelected?studentNames.filter(Boolean).map((oneName)=>{
								const thisStudentRowResults=allResults.filter((answer)=>(answer.studentName==oneName));
								console.log({ oneName });
								const findQuestionResult=(actualQuestionId)=>{
									const  studentsAttemptsOnQuestion=thisStudentRowResults.filter((res)=>{
										console.log({ res,actualQuestionId,studentsAttemptsOnQuestion });
										return (res.question_id===actualQuestionId);
									});
									console.log({ thisStudentRowResults, studentsAttemptsOnQuestion });

									if(studentsAttemptsOnQuestion&&studentsAttemptsOnQuestion.correct){


										return("corect");

									}
									return("incorect");
								};
								return(

									<tr><td>{oneName}</td>{selQuizQuestions?selQuizQuestions.map((question)=>{
										// const resultat = findQuestionResult(question._id);

										return(<th className={findQuestionResult(question._id)}>{question!==undefined?<p>{question.question}</p>:<p>Loading question</p>}</th>);
									}):null}</tr>

								);
							}
							):null}
						</thead>

					</table>
		  </div></div>
		  );

	} else{
		return(<div>"no props"</div>);
	}
}
