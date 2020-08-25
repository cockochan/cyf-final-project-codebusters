import React, { useState, useEffect } from "react";
import Questions from "./Questions";

const Students = (props) => {

	const [route, setRoute]=useState("");
	const [quizId, setQuizId]=useState("");
	const [quizName, setQuizName]=useState("");
	const [fetchedData, setFetchedData]=useState([]);

	useEffect(()=>{
		fetch(`http://localhost:3100/api/${route}`)
			.then((res) => res.json())
			.then((data) => setFetchedData(data))
			.catch((err) => console.error(err));
	},[route]);

	const selectHandler = (event)=>{
		setRoute(`quizes/search?name=${event.target.value}`);
		setQuizId(event.target.value);
		setQuizName(event.target);
	};

	return (
		<div style={{ width:"50%", margin:"15%" }}>
			<select  onChange={selectHandler} style={{ padding:"10px" }}>
				<option>Select a quiz</option>
				{props.questionData.map((quiz) =>{
					return(
						<option key={quiz._id} name={quiz.name} value={quiz._id}>{quiz.name}</option>
					);
				})}
			</select>
			{fetchedData.questions_id? <Questions fetchedData={fetchedData} quizId={quizId} quizName={quizName} />:null}
		</div>
	);
};
export default Students;
