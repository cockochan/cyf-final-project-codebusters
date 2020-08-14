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
	console.log(fetchedQuestions.toString());

	if(fetchedQuestions){
		return(<div>{fetchedQuestions[0].question}</div>);
	} else{
		return(<div>no questions loaded</div>);
	}


}