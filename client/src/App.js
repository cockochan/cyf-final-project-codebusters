import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./grid.css";
import Students from "./Components/Students.js";
import Mentors from "./Components/Mentors.js";
import NewQuestion from "./Components/NewQuestion.js";
import Results from "./Components/Results.js";

const App = () => {
	const [questions, setQuestions] = useState(null);
	const [quizzes, setQuizzes] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3100/api/questions")
			.then((res) => res.json())
			.then((data) => setQuestions(data))
			.catch((err) => console.error(err));
		fetch("http://localhost:3100/api/quizzes")
			.then((res) => res.json())
			.then((data) => setQuizzes(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<main role="main">
			<Router>
				<nav className="navbar">
					<ul className="nav-element">
						<li className="nav-links">
							<Link to="/Students" exact="true">
                Student
							</Link>
						</li>
						<li className="nav-links">
							<Link to="/Mentors" exact="true">
                Mentor
							</Link>
						</li>
						<li className="nav-links">
							<Link to="/Results" exact="true">
                Quiz rezults
							</Link>
						</li>
						<li className="nav-links">
							<Link to="/NewQuestion" exact="true">
                New question
							</Link>
						</li>
					</ul>
				</nav>
				<div className="body">
					<Switch>
						<Route exact path="/Mentors">
							<Mentors questions={questions} quizes={quizzes} />
						</Route>
						<Route exact path="/Results">
							<Results questions={questions} quizes={quizzes} />
						</Route>
						<Route exact path="/Students">
							{quizzes.length > 0 ? (
								<Students quizData={quizzes} />
							) : (
								<p>There is no quiz to show</p>
							)}
						</Route>
						<Route exact path="/NewQuestion">
							<NewQuestion />
						</Route>
					</Switch>
				</div>
			</Router>
		</main>
	);
};

export default App;
