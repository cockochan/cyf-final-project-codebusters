/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import "./App.css";
import Studentview from "./Components/Studentview.js";
import { getMessage } from "./service";
import Mentors from "./Components/Mentors.js";

export function App() {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		getMessage().then((message) => setMessage(message));
	}, []);

	return (
		<main role="main">
			<div>

				<h1 className="message" data-qa="message">{message}</h1>
			</div>
			<Router>
				<Link to="/Studentview">Home</Link>
				<Switch>
					<Route path="/Mentors">
						<Mentors />
					</Route>
					<Route path="/Studentview">
						<Studentview />
					</Route>
				</Switch>
			</Router>
		</main>
	);
}

export default App;
