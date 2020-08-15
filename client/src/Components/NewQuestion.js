import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Questions from "../mockData/Questions.json";

export default function NewQuestion() {
	const [questionToSet, setQuestionToSet]=useState( {
		id: 1,
		question: null,
		description: "delete folder",
		answers: {
		  answer_a: null,
		  answer_b: null,
		  answer_c: null,
		  answer_d: null,
		  answer_e: null,
		  answer_f: null,

		},
		multiple_correct_answers: "false",
		correct_answers: {
		  answer_a_correct: "false",
		  answer_b_correct: "false",
		  answer_c_correct: "false",
		  answer_d_correct: "true",
		  answer_e_correct: "false",
		  answer_f_correct: "false",
		},
		explanation: "rmdir deletes an empty directory",
		tip: null,
		tags: [],
		code: "linux",
		difficulty: "Easy",
	  });
	const [md, setMd] = useState("");
	const textChanged = (e) => {
		setMd(e.target.value);
	};
	console.log( JSON.parse(JSON.stringify(Questions)));
	const  answer_aChanged = (e) => {
		setQuestionToSet({ ...questionToSet,
			answers:{
				answer_a:`${e.target.value}`,
			},
		},
		);
	};
	return (
		<div className='col-12'>
			<div>
				<div>{questionToSet.answers.answer_a}</div>
				<h1>question</h1>
				<textarea onKeyUp={(e) => textChanged(e)} />

				<h1>answers</h1>
				<input onKeyUp={(e) => answer_aChanged(e)} placeholder="answer a" />
				<input type='checkbox' />

				<input placeholder="answer b" />
				<input placeholder="answer c" />
				<input placeholder="answer d" />
				<input placeholder="answer e" />
				<ReactMarkdown source={md} />

			</div>
			<button>submit answers</button>
		</div>
	);
}
