import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import Questions from "../mockData/Questions.json";

import "../App.css";
import "../grid.css";

export default function Mentors() {
	const [fetchedQuestions,setfetchedQuestions]=useState(Questions);
	console.log(fetchedQuestions.toString());

	if(fetchedQuestions){
		return(<div className='row'>
			{fetchedQuestions.map((quest)=>
				<div className='col-3 card'>
					<div>{quest.question}</div>


					<div className='row answers'>
						{Object.entries(quest.answers).map(([key, value]) =>{
						// use keyName to get current key's name
							return(
								<div>
									<input type="checkbox" id="horns" name="horns" />
									<label htmlFor="horns">{value}</label>

									{/* <div className='col-6'>{value}</div> */}

								</div>);

						}
			  )}</div></div>
			)
			}</div>);
	} else{
		return(<div>no questions loaded</div>);
	}


}