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

import Questions from "../src/mockData/Questions.json";
export function App() {
	const [questionData, setQuestionData]=useState({});
	const [route, setRoute]=useState("quizes");
	useEffect(()=>{
		fetch(`http://localhost:3100/api/${route}`)
			.then((res) => res.json())
			.then((data) => setQuestionData(data))
			.catch((err) => console.error(err));
	},[route]);

	return (
		<main className='container'role="main">
			<div>


			</div>
			<Router>
				<nav className="col-12">
					<ul style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}><li style={{ listStyleType: "none" , padding:"20px 0",margin:"20px 0" }}>
						<Link to="/NewQuestion" >New question</Link>
					</li>
		  <li style={{ listStyleType: "none", padding:"20px 0",margin:"20px 0" }}>
						<Link to="/Students" exact='true'>for students </Link>
					</li>
					<li style={{ listStyleType: "none", padding:"20px 0",margin:"20px 0" }}>
						<Link to="/Mentors"exact='true'> for mentors</Link>
					</li>

					</ul>
					<hr />
				</nav>
				<Switch>
					<Route exact path="/NewQuestion">
						<NewQuestion />
					</Route>
					<Route exact path="/Mentors">
						<Mentors />
					</Route>
					<Route exact path="/Students">
						{questionData.length >0?<Students questionData={questionData} />:<p>Loading...</p>}
					</Route>

				</Switch>
			</Router>
		</main>
	);
}

export default App;