import React, { useState,useEffect } from "react";
import Quizzez from "../mockData/Quizzez.json";
// import Questions from "../mockData/Questions.json";
export default function Students(props) {
	console.log(props.quizes);
	console.log (props.questions);
	const [questPageNum,setQuestPageNum]=useState(0);
	const [quizzQuestions,setQuizzQuestions]=useState(null);
	const [selectedQuizz,setSelectedQuizz]=useState(null);
	const [submittedSuccessfuly,setSubmittedSuccessfuly]=useState(false);
	const quizzChosen=(quizN)=>{
		console.log(quizN);
		const chosenQuiz= props.quizes.find((q)=>q.name==quizN);
		setSelectedQuizz(chosenQuiz);
	};
	useEffect(() => {
		if(selectedQuizz!==null){
			console.log(selectedQuizz);

			let questionsToGo = [];
			questionsToGo = selectedQuizz.questions_id.map((selId)=>{

				let found = (props.questions.find((question)=>question._id==selId));
				questionsToGo.push(found);


				setQuizzQuestions(questionsToGo);

			}
			);
		}
	},[selectedQuizz]);
	const nextPage=()=>{
		setQuestPageNum(questPageNum+1);
	};
	const submitAnswers=()=>{
		setSubmittedSuccessfuly(true);
	};
	if(submittedSuccessfuly==false){
		if(!selectedQuizz) {
			return (

				<div className='col-12 quizzPage'>
					<h1>Welcome to QuizzTime</h1>

					<select name="quizzez" id="quizzez" onChange={(e) => quizzChosen(e.target.value)}>
						<option >select a quiz</option>
						{props.quizes.map((quiz)=>{
							return(<option value={quiz.name}>{quiz.name}</option>);
						})}

		  </select>
		  </div>
			);
		} else 	if(selectedQuizz&&questPageNum==0){
			return(<div>
				<h1>welcome to {selectedQuizz.name} quizz</h1>
				<button onClick={nextPage}>next page</button>
			</div>);

		}else 	if(questPageNum>0&&quizzQuestions){

			return(
				<div className='col-12 '>
					{console.log(quizzQuestions)}
					{questPageNum<quizzQuestions.length?<div>{quizzQuestions[questPageNum].question}</div>:<div></div>}


					<div className='questionPage'>
						{Object.entries(quizzQuestions[questPageNum-1].answers).map(([key, value]) =>{
							// use keyName to get current key's name
							return(
								<div>
									<input type="checkbox" id="horns" name="horns" />
									<label htmlFor="horns">{value}</label>

									{/* <div className='col-6'>{value}</div> */}

								</div>);

						}
			  )}</div>
					{(questPageNum<quizzQuestions.length? <button onClick={nextPage}>next page</button>:<button onClick={submitAnswers}>submit test results</button>)}
				</div>);

		} else{
			console.log(questPageNum);
			console.log(selectedQuizz);
			console.log(quizzQuestions);
			console.log(quizzQuestions[questPageNum]);
		}
	} else{
		return(<h1>submitted successfuly</h1>);
	}
}
