import React, { useState, useEffect } from "react";

export default function Results(props) {
	const [studentNames, setStudentNames]=useState([]);
	const [selQuizQuestions, setSelQuizQuestions]=useState([]);
	// const [answeredQuestons, setAnsweredQuestons]=useState([]);
	const [quizRoute,setQuizRoute]=useState("");
	const [allResults, setAllResults]=useState(null);
	const [quizSelected, setQuizSelected]=useState(null);
	const fetchResults =()=>{
		fetch(`http://localhost:3100/api/results/${quizRoute}`)
			.then((response)=>response.json())
			.then((data)=>{
				setAllResults(data);
				console.log({ data });
			});
	};
	useEffect(() => {
		console.log({ quizRoute, allResults });
		fetchResults();
	},[quizRoute]);

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
		 if(allResults){
			allResults.map((oneAnswer)=>{

				if(studentNames&&!tempNames.includes(oneAnswer.studentName)){
					console.log(oneAnswer.studentName);
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
		console.log(e.target.value);

		setQuizRoute(e.target.value);

		const selectedQuiz=props.quizes.find((quiz)=>(quiz._id==e.target.value));

		setQuizSelected(selectedQuiz);
		setSelQuizQuestions([]);

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

		  {/* {selQuizQuestions.map((res)=>{
			  let tempAnsweredQuestion =[];

					const foundResult = allResults.find((question)=>res.question_id==question.question_id);
					if(foundResult!==undefined){
						tempAnsweredQuestion.push(foundResult);
						setAnsweredQuestons(tempAnsweredQuestion);
					} */}

				{/* } */}

				{/* )} */}
				<div>
					<table>
						<thead>

							<tr><td></td>{selQuizQuestions?selQuizQuestions.map((question)=>{
								return(<th className='col-2'>{question!==undefined?<p>{question.question}</p>:<p>Loading question</p>}</th>);
							}):<tr></tr>}</tr>
							{studentNames&&quizSelected?studentNames.filter(Boolean).map((oneName)=>{
								// const thisStudentRowResults=allResults.filter((answer)=>(answer.studentName==oneName));

								const findQuestionResult=(actualQuestionId)=>{
									const  studentsAttemptsOnQuestion=allResults.filter((res)=>{
										console.log({ actualQuestionId,res, oneName,studentsAttemptsOnQuestion });
										res.question_id===actualQuestionId&&res.studentName==oneName;
									});

									if(studentsAttemptsOnQuestion!==undefined){
										console.log({ studentsAttemptsOnQuestion });
									}


									if(studentsAttemptsOnQuestion!==undefined&&studentsAttemptsOnQuestion.correct){


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
