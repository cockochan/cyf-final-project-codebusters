import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import "./App.css";
import "./grid.css";
import Students from "./Components/Students.js";
import { getMessage } from "./service";
import Mentors from "./Components/Mentors.js";
import NewQuestion from "./Components/NewQuestion.js";

// import Questions from "../src/mockData/Questions.json";
export function App() {
	const [questions, setQuestions]=useState(null);
	const [quizes, setQuizes]=useState(null);
	if(questions!==null&&quizes!==null){

	}

	useEffect(()=>{
		fetch("http://localhost:3100/api/questions")
			.then((res) => res.json())
			.then((data) => setQuestions(data))
			.catch((err) => console.error(err));

	},[]);
	useEffect(()=>{
		fetch("http://localhost:3100/api/quizes")
			.then((res) => res.json())
			.then((data) => setQuizes(data))
			.catch((err) => console.error(err));

	},[]);

	return (
		<main className='container'role="main">
			<div>


			</div>
			<Router>
				<nav className="col-4">
					<ul><li style={{ listStyleType: "none" }}>
						<Link to="/NewQuestion" >New question</Link>
					</li>
		  <li style={{ listStyleType: "none" }}>
						<Link to="/Students" exact='true'>for students </Link>
					</li>
					<li style={{ listStyleType: "none" }}>
						<Link to="/Mentors"exact='true'> for mentors</Link>
					</li>

					</ul></nav>
				<Switch>
					<Route exact path="/NewQuestion">
						<NewQuestion />
					</Route>
					<Route exact path="/Mentors">
						<Mentors questions={questions} quizes={quizes} />
					</Route>
					<Route exact path="/Students">
						<Students questions={questions} quizes={quizes} />
					</Route>

				</Switch>
			</Router>
		</main>
	);
}

export default App;