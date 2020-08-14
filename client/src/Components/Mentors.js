import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import mockQuestions from "../mockData/Questions.json";
import "./App.css";
import "../grid.css";
import Students from "./Components/Students.js";
export function Mentors() {
	const [questions,setQuestions]=useState(mockQuestions.json());
	return(
		<div>{questions[0].question}</div>
	);

}