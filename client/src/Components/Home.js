import React from "react";
import Quizpic from "../quiztime.png";
export default function Home() {
	return (
		<div className='container'>
			<div className='row welcomeContainer'>
				<div className=" welcomeBig col-6">Q</div>
				<div className=" welcome col-4">Welcome to QuizzTime</div>
			</div>
			{/* <img className='quizzTimeLogo' src={Quizpic} /> */}
		</div>
	);
}
