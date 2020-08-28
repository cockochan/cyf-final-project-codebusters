import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./grid.css";
import Students from "./Components/Students.js";
import Mentors from "./Components/Mentors.js";
import NewQuestion from "./Components/NewQuestion.js";
import Results from "./Components/Results.js";

export function App() {

	const [questions, setQuestions] = useState(null);
	const [quizzes, setQuizzes] = useState([]);
	const [route, setRoute] = useState("quizzes");

	useEffect(() => {
		fetch(
			"http://localhost:3100/api/questions"
		)
			.then((res) => res.json())
			.then((data) => setQuestions(data))
			.catch((err) => console.error(err));
		fetch(`http://localhost:3100/api/${route}`)
			.then((res) => res.json())
			.then((data) => setQuizzes(data))
			.catch((err) => console.error(err));
	}, [route]);


	return (
		<main className="container" role="main">
			<div></div>
			<Router>
				<nav className="col-4">
					<ul>
						<li style={{ listStyleType: "none" }}>
							<Link to="/Students" exact="true">
                student{" "}
							</Link>
						</li>
						<li style={{ listStyleType: "none" }}>
							<Link to="/Mentors" exact="true">
								{" "}
                mentor
							</Link>
						</li>
						<li style={{ listStyleType: "none" }}>
							<Link to="/Results" exact="true">
								{" "}
                quiz rezults
							</Link>
						</li>
						<li style={{ listStyleType: "none" }}>
							<Link to="/NewQuestion">new question</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route exact path="/Mentors">
						<Mentors questions={questions} quizes={quizzes} />
					</Route>
					<Route exact path="/Results">
						<Results questions={questions} quizes={quizzes} />
					</Route>
					<Route exact path="/Students">


						{quizzes.length >0?<Students quizData={quizzes} />:<p>Loading...</p>}

					</Route>

					<Route exact path="/NewQuestion">
						<NewQuestion />
					</Route>
				</Switch>
			</Router>
		</main>
	);
}

export default App;
