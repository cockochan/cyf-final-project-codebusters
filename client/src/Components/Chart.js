
import React,{ useState, useEffect } from "react";
import * as V from "victory";
import ReactDOM from "react-dom";
import { VictoryBar, VictoryChart,VictoryAxis } from "victory";
import Results from "./Results";
export default function Chart(props) {

	const makeResultPerQuestion =(question)=>{
		(question)=>{
			const selquestResults =props.results.filter((res)=>res.question_id==question.question_id&&res.correct_answer=="correct");
			console.log(selquestResults);
		};
	};
	makeResultPerQuestion();
	const data
	= [
		{ quarter: 1, earnings: 13000 },
		{ quarter: 2, earnings: 16500 },
		{ quarter: 3, earnings: 14250 },
		{ quarter: 4, earnings: 19000 },
	  ];

	return (

			  <VictoryChart
			// domainPadding will add space to each side of VictoryBar to
			// prevent it from overlapping the axis
			domainPadding={20}
			  >
			<VictoryAxis
				  // tickValues specifies both the number of ticks and where
				  // they are placed on the axis
				  tickValues={[1, 2, 3, 4]}
				  tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
			/>
			<VictoryAxis
				  dependentAxis
				  // tickFormat specifies how ticks should be displayed
				  tickFormat={(x) => (`$${x / 1000}k`)}
			/>
			<VictoryBar
				  data={data}
				  x="quarter"
				  y="earnings"
			/>
			  </VictoryChart>
	);
		  }



