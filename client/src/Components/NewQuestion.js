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
		multiple_correct_answers: false,
		correct_answers: {
			answer_a_correct: false,
			answer_b_correct: false,
			answer_c_correct: false,
			answer_d_correct: false,
			answer_e_correct: false,
			answer_f_correct: false,
		},
		explanation: "",
		tip: null,
		tags: [],
		question_code: "",
		difficulty: "",
	});
	const [md, setMd] = useState("");
	const [cd, setCd] = useState("");
	const textChanged = (e) => {
		setMd(e.target.value);
		setQuestionToSet({ ...questionToSet,
			question: `${e.target.value}`,

		},
		);
	};

	const submitQuestion =()=>{
		if(questionToSet.answers.answer_a.length<2){

			alert("answer a should have at least 2sybols");
		} else{
			sendQestion();
			alert("question submitted");
		}
	};
	const sendQestion =()=>{

		fetch("http://localhost:3100/api/question", { method:"POST",headers: { "Content-type": "application/json" },
			body: JSON.stringify(questionToSet) })
			.then((response) => response.json())
			.then((data) =>console.log(data))
			.catch((err) => console.error(err));
	};
	const codeChanged = (e) => {
		setCd(e.target.value);
		setQuestionToSet({ ...questionToSet,
			question_code: `${e.target.value}`,
		},
		);
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
	//checkboxes for correct answers
	const answerASwitched=(event)=>{
		setQuestionToSet({ ...questionToSet,
			correct_answers:{ ...questionToSet.correct_answers,
				answer_a_correct:event.target.checked?true:false,
			},
		});
	};
	const answerBSwitched=(event)=>{
		setQuestionToSet({ ...questionToSet,
			correct_answers:{ ...questionToSet.correct_answers,
				answer_b_correct:event.target.checked?true:false,
			},
		});
	};
	const answerCSwitched=(event)=>{
		setQuestionToSet({ ...questionToSet,
			correct_answers:{ ...questionToSet.correct_answers,
				answer_c_correct:event.target.checked?true:false,
			},
		});
	};
	const answerDSwitched=(event)=>{
		setQuestionToSet({ ...questionToSet,
			correct_answers:{ ...questionToSet.correct_answers,
				answer_d_correct:event.target.checked?true:false,
			},
		});
	};
	const answerESwitched=(event)=>{
		setQuestionToSet({ ...questionToSet,
			correct_answers:{ ...questionToSet.correct_answers,
				answer_e_correct:event.target.checked?true:false,
			},
		});
	};
	const answerFSwitched=(event)=>{
		setQuestionToSet({ ...questionToSet,
			correct_answers:{ ...questionToSet.correct_answers,
				answer_f_correct:event.target.checked?true:false,
			},
		});
	};
	return (
		<div className='col-12'>
			<div>


				<h1>code illustration</h1>
				<textarea onKeyUp={(e) => codeChanged(e)} />
				<h1>question,use markdown</h1>
				<textarea onKeyUp={(e) => textChanged(e)} />

				<h1>answers</h1>
				<input onKeyUp={(e) => answer_aChanged(e)} placeholder="answer a" />
				<input type='checkbox' name={"answer a"} value={"a"} onChange={answerASwitched} />
				<input onKeyUp={(e) => answer_bChanged(e)} placeholder="answer b" />
				<input type='checkbox'name={"answer b"} value={"b"} onChange={answerBSwitched} />

				<input onKeyUp={(e) => answer_cChanged(e)} placeholder="answer c" />
				<input type='checkbox'name={"answer c"} value={"c"} onChange={answerCSwitched} />

				<input onKeyUp={(e) => answer_dChanged(e)} placeholder="answer d" />
				<input type='checkbox'name={"answer d"} value={"d"} onChange={answerDSwitched}  />

				<input onKeyUp={(e) => answer_eChanged(e)} placeholder="answer e"  />
				<input type='checkbox'name={"answer e"} value={"e"} onChange={answerESwitched} />
				<input onKeyUp={(e) => answer_fChanged(e)} placeholder="answer f" />
				<input type='checkbox' name={"answer f"} value={"f"} onChange={answerFSwitched}  />
			</div>
			<button onClick={submitQuestion}> submit question</button>
			<ReactMarkdown className='code'source={questionToSet.question_code} />
			<ReactMarkdown source={md} />

			<div className='row'>
				<div>{questionToSet.answers.answer_a}</div>
				<div className='col-4'><strong>answer a is </strong>{` ${questionToSet.correct_answers.answer_a_correct}`}</div>
			</div>
			<div className='row'>
				<div>{questionToSet.answers.answer_b}</div>
				<div className='col-4'><strong>answer b is </strong>{` ${questionToSet.correct_answers.answer_b_correct}`}</div>
			</div>

			<div className='row'>
				<div>{questionToSet.answers.answer_c}</div>
				<div className='col-4'><strong>answer c is </strong>{` ${questionToSet.correct_answers.answer_c_correct}`}</div>
			</div>

			<div className='row'>
				<div>{questionToSet.answers.answer_d}</div>
				<div className='col-4'><strong>answer d</strong>{` ${questionToSet.correct_answers.answer_d_correct}`}</div>
			</div>
			<div className='row'>
				<div>{questionToSet.answers.answer_e}</div>
				<div className='col-4'><strong>answer e is </strong>{` ${questionToSet.correct_answers.answer_e_correct}`}</div>
			</div>
			<div className='row'>
				<div>{questionToSet.answers.answer_f}</div>
				<div className='col-4'><strong>answer f </strong>{` ${questionToSet.correct_answers.answer_f_correct}`}</div>
			</div></div>
	);
}
