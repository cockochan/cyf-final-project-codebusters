import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Questions from "../mockData/Questions.json";

export default function NewQuestion() {
	const [questionToSet, setQuestionToSet]=useState( {

		question: null,
		description: "",
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
		explanation: "",
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
			answers:{ ...questionToSet.answers,
				answer_a:`${e.target.value}`,
			},
		},
		);
	};
	const  answer_bChanged = (e) => {
		setQuestionToSet({ ...questionToSet,
			answers:{ ...questionToSet.answers,
				answer_b:`${e.target.value}`,
			},
		},
		);
	};
	const  answer_cChanged = (e) => {
		setQuestionToSet({ ...questionToSet,
			answers:{ ...questionToSet.answers,
				answer_c:`${e.target.value}`,
			},
		},
		);
	};
	const  answer_dChanged = (e) => {
		setQuestionToSet({ ...questionToSet,
			answers:{ ...questionToSet.answers,
				answer_d:`${e.target.value}`,
			},
		},
		);
	};
	const  answer_eChanged = (e) => {
		setQuestionToSet({ ...questionToSet,
			answers:{ ...questionToSet.answers,
				answer_e:`${e.target.value}`,
			},
		},
		);
	};
	const  answer_fChanged = (e) => {
		setQuestionToSet({ ...questionToSet,
			answers:{ ...questionToSet.answers,
				answer_f:`${e.target.value}`,
			},
		},
		);
	};

	return (
		<div className='col-12'>
			<div>
				<div>{questionToSet.answers.answer_a}</div>
				<h1>question,use markdown</h1>
				<textarea onKeyUp={(e) => textChanged(e)} />

				<h1>answers</h1>
				<input onKeyUp={(e) => answer_aChanged(e)} placeholder="answer a" />
				<input type='checkbox' />
				<input onKeyUp={(e) => answer_bChanged(e)} placeholder="answer b" />
				<input type='checkbox' />

				<input onKeyUp={(e) => answer_cChanged(e)} placeholder="answer c" />
				<input type='checkbox' />

				<input onKeyUp={(e) => answer_dChanged(e)} placeholder="answer d" />
				<input type='checkbox' />

				<input onKeyUp={(e) => answer_eChanged(e)} placeholder="answer e" />
				<input type='checkbox' />
				<input onKeyUp={(e) => answer_eChanged(e)} placeholder="answer f" />
				<input type='checkbox' />
				<ReactMarkdown source={md} />

			</div>
			<button>submit answers</button>
		</div>
	);
}
