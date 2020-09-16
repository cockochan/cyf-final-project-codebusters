import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./grid.css";
 import 'bootstrap/dist/css/bootstrap.css';
import Students from "./Components/Students.js";
import Mentors from "./Components/Mentors.js";
import NewQuestion from "./Components/NewQuestion.js";
import Results from "./Components/Results.js";
import Navbar from "./Components/Navbar";

const App = () => {
	const [questions, setQuestions] = useState(null);
	const [quizzes, setQuizzes] = useState([]);

	useEffect(() => {
		fetch("/api/questions")
			.then((res) => res.json())
			.then((data) => setQuestions(data))
			.catch((err) => console.error(err));
		fetch("/api/quizzes")
			.then((res) => res.json())
			.then((data) => setQuizzes(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<main role="main">
			<Router>
				<Navbar />
				<div className="body">
					<Switch>
						<Route exact path="/mentors/5wjhfxnr">
							<Mentors
								questions={questions}
								quizzes={quizzes}
							/>
						</Route>
						<Route exact path="/results/5wjhfxnr">
							<Results questions={questions} quizzes={quizzes} />
						</Route>
						<Route exact path="/">
							{quizzes.length > 0 ? (
								<Students quizData={quizzes} />
							) : (
								<p>There is no quiz to show</p>
							)}
						</Route>
						<Route exact path="/newquestion/5wjhfxnr">
							<NewQuestion />
						</Route>
					</Switch>
				</div>
			</Router>
		</main>
	);
};

export default App;
