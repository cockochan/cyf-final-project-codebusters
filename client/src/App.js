/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import "./App.css";
import { getMessage } from "./service";
import Mentors from "./Components/Mentors";

export function App() {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		getMessage().then((message) => setMessage(message));
	}, []);

	return (
		<main role="main">
			<div>
				<img className="logo" data-qa="logo" src={logo} alt="Just the React logo" />
				<h1 className="message" data-qa="message">{message}</h1>
			</div>
			<Router>

				<Switch>
					<Route path="/Mentors">
						<Mentors />
					</Route>
				</Switch>
			</Router>
		</main>
	);
}

export default App;
