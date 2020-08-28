import React from "react";

export default function Results(props) {

	if(props.quizes){
		return (
			<div className='col-12'>
				we need to do something to have results
				{/* <h1>Welcome to QuizzTime</h1>

				<select name="quizzez" id="quizzez" onChange={(e) => quizzChosen(e.target.value)}>
					<option >select a quiz</option>

					{props.quizes.map((quiz)=>{
						return(<option value={quiz.name}>{quiz.name}</option>);
					})}

		  </select> */}
		  </div>
		);
	} else{
		return(<div>"no props"</div>);
	}
}
