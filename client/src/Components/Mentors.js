import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";

import "../App.css";
import "../grid.css";

export default function Mentors() {
	const [questions,setQuestions]=useState(mockQuestions.json());
	return(
		<div>{questions[0].question}</div>
	);

}