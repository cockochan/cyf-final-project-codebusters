import React, { useState,useEffect } from "react";
import Quizzez from "../mockData/Quizzez.json";
import Questions from "../mockData/Questions.json";
export default function Students() {
	const [questPageNum,setQuestPageNum]=useState(0);
	const [quizzQuestions,setQuizzQuestions]=useState(null);
	const [selectedQuizz,setSelectedQuizz]=useState(null);
	const [submittedSuccessfuly,setSubmittedSuccessfuly]=useState(false);
	const quizzChosen=(quizN)=>{
		const chosenQuiz= Quizzez.find((q)=>q.name==quizN);
		setSelectedQuizz(chosenQuiz);
	};
	useEffect(() => {
		if(selectedQuizz!==null){
			console.log(selectedQuizz.questions);

			let questionsToGo = [];
			questionsToGo = selectedQuizz.questions.map((selId)=>{

				let found = (Questions.find((question)=>question.id==selId));
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
						<option value="javaScrypt week 1">javaScrypt week 1</option>
						<option value="turbo pascal">turbo pascal</option>
						<option value="assembley">assembley</option>
						<option value="docker">docker</option>
		  </select>
		  </div>
			);
		} else 	if(selectedQuizz&&questPageNum==0){
			return(<div>
				<h1>welcome to {selectedQuizz.name} quizz</h1>
				<button onClick={nextPage}>next page</button>
			</div>);

		}else 	if(questPageNum>0&&quizzQuestions){
			console.log(questPageNum);
			console.log(quizzQuestions);
			console.log(selectedQuizz);
			console.log(quizzQuestions[questPageNum]);
			return(
				<div className='col-12 '>
					{console.log(quizzQuestions.toString())}
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
