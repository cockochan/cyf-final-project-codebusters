import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
// import Questions from "../mockData/Questions.json";

import "../App.css";
import "../grid.css";

export default function Mentors(props) {
	// const [fetchedQuestions,setfetchedQuestions]=useState(props.questions);
	const [newQuizzQuestions, setNewQuizzQuestions]=useState([]);
	const [newQuizz,setNewQuizz]=useState(	{
		_id: "",
		name: "",
		publiShingDate: "",
		questions_id: [],
	});

	console.log(props.questions);
	console.log(props.quizes);
	useEffect(() => {

		if(newQuizz.questions!==null){


			let newQuizQuestions = [];
			newQuizQuestions = newQuizz.questions_id.map((selId)=>{

				let found = (props.questions.find((question)=>question._id==selId));
				newQuizQuestions.push(found);


				setNewQuizzQuestions(newQuizQuestions);

			}
			);
		}
	},[newQuizz]);
	const addQuestion =(e)=>{
		console.log(e.target.value);
		setNewQuizz({ ...newQuizz,
			questions_id:[...newQuizz.questions_id,e.target.value],
		},
		);

	};

	const newQuizName =(e)=>{
		console.log(e.target.value);
		setNewQuizz({ ...newQuizz,
			name:e.target.value,
		},
		);

	};
	const removeQuestion =(e)=>{
		setNewQuizzQuestions(newQuizzQuestions.filter((obj) => obj._id != e.target.value));
	};
	if(props.questions){
		return(<div className='row'>
			<div className='col-9 cardBlock'>
				{props.questions.map((quest)=>
					<div className='col-3 card'>

						<input className="quizCardCheckbox" type="checkbox" id="horns" name="horns" value={quest._id} onChange={addQuestion} />
						<label htmlFor="horns">add to quiz</label>
						<div className="quizzQuestion">{quest.question}</div>

						<div className='answers'>
							{Object.entries(quest.answers).map(([key, value]) =>{
								// use keyName to get current key's name
								return(
									<div>


										<div className='col-6 answer'>{value}</div>

									</div>);

							}
			  )}</div>


			  </div>
				)
				}</div>

			<div className='col-3 newQuiz'><h1>New quiz</h1>
				<input type='text' onKeyUp={newQuizName} placeholder={"new quiz name"} />
				{newQuizzQuestions.map((quest)=>
					<div className='col-12 card' key={quest.question}>
 	<input key={quest._id+quest.question} type="checkbox" id="horns" name={quest._id+quest.question} value={quest._id} onChange={removeQuestion} />
						<label htmlFor={quest._id+quest.question}>remove from quizz</label>
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