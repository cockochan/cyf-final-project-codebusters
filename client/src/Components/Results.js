import React, { useState, useEffect } from "react";

export default function Results(props) {
	const [studentNames, setStudentNames]=useState([]);
	const [answeredQuestons, setAnsweredQuestons]=useState([]);
	const [allResults, setAllResults]=useState(null);
	const fetchResults =()=>{
		fetch("http://localhost:3100/api/results/")
			.then((response)=>response.json())
			.then((data)=>setAllResults(data));
	};
	useEffect(() => {

		fetchResults();
	},[]);

	const quizzToSeeResultsChosen=(e)=>{
		console.log(e.target.value);
	};
	if(props.quizes&&allResults){
		return (
			<div className='col-12'>

				<h1>Welcome to QuizzTime</h1>

				<select name="quizzez" id="quizzez" onChange={(e) => quizzToSeeResultsChosen(e)}>
					<option >select a quiz</option>

					{props.quizes.map((quiz)=>{
						return(<option value={quiz.name}>{quiz.name}</option>);
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
