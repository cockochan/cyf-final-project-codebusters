import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import "./App.css";
import "./grid.css";
import Studentview from "./Components/Students.js";
import { getMessage } from "./service";
import Mentors from "./Components/Mentors.js";
import NewQuestion from "./Components/NewQuestion.js";

import Questions from "../src/mockData/Questions.json";
export function App() {

	// const [message, setMessage] = useState("Loading...");

	// useEffect(() => {
	// 	getMessage().then((message) => setMessage(message));
	// }, []);

	return (
		<main className='container'role="main">
			<div>


			</div>
			<Router>
				<nav className="col-4">
					<ul><li style={{ listStyleType: "none" }}>
						<Link to="/NewQuestion"> new question</Link>
					</li>
		  <li style={{ listStyleType: "none" }}>
						<Link to="/Students">for students </Link>
					</li>
					<li style={{ listStyleType: "none" }}>
						<Link to="/Mentors"> for mentors</Link>
					</li>

					</ul></nav>
				<Switch>
					<Route path="/Mentors">
						<Mentors />
					</Route>
					<Route path="/">
						<Studentview />
					</Route>
					<Route path="/NewQuestion">
						<NewQuestion />
					</Route>
				</Switch>
			</Router>
		</main>
	);
}

export default App;