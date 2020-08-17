import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import Questions from "../mockData/Questions.json";

import "../App.css";
import "../grid.css";

export default function Mentors() {
	const [fetchedQuestions,setfetchedQuestions]=useState(Questions);
	const [newQuizzQuestions, setNewQuizzQuestions]=useState([]);
	const [newQuizz,setNewQuizz]=useState(	{
		id: 1,
		name: "javaScrypt week 1",
		publiShingDate: "2020-08-04",
		questions: [],
	});
	useEffect(() => {
		if(newQuizz.questions!==null){


			let newQuizQuestions = [];
			newQuizQuestions = newQuizz.questions.map((selId)=>{

				let found = (Questions.find((question)=>question.id==selId));
				newQuizQuestions.push(found);


				setNewQuizzQuestions(newQuizQuestions);

			}
			);
		}
	},[newQuizz]);
	const addQuestion =(e)=>{
		setNewQuizz({ ...newQuizz,
			questions:[...newQuizz.questions,e.target.value],
		},
		);

	};
	const removeQuestion =(e)=>{
		setNewQuizzQuestions(newQuizzQuestions.filter((obj) => obj.id != e.target.value));
	};
	if(fetchedQuestions){
		return(<div className='row'>
			<div className='col-9 cardBlock'>
				{fetchedQuestions.map((quest)=>
					<div className='col-2 card'>
						<input type="checkbox" id="horns" name="horns" value={quest.id} onChange={addQuestion} />
						<label htmlFor="horns">add to quiz</label>
						<div>{quest.question}</div>

						<div className='answers'>
							{Object.entries(quest.answers).map(([key, value]) =>{
								// use keyName to get current key's name
								return(
									<div>


										<div className='col-6'>{value}</div>

									</div>);

							}
			  )}</div>


			  </div>
				)
				}</div>

			<div className='col-3 newQuiz'><h1>New quiz</h1>

				{newQuizzQuestions.map((quest)=>
					<div className='col-12 card'>
 	<input type="checkbox" id="horns" name="horns" value={quest.id} onChange={removeQuestion} />
						<label htmlFor="horns">remove from quizz</label>
						<div>{quest.question}</div>

						<div className='answers'>
							{Object.entries(quest.answers).map(([key, value]) =>{
							// use keyName to get current key's name
								return(
									<div>


										<div className='col-6'>{value}</div>

									</div>);

							}
			  )}</div>


			  </div>
				)
				}<button>submit new quizz</button></div>

		</div>
		);
	} else{
		return(<div>no questions loaded</div>);
	}


}