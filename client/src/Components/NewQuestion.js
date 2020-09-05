import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FormGroup } from "reactstrap";

export default function NewQuestion() {
	const [questionToSet, setQuestionToSet] = useState({
		question: "",
		description: "",
		answers: {
			answer_a: "",
			answer_b: "",
			answer_c: "",
			answer_d: "",
			answer_e: "",
			answer_f: "",
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
		tip: "",
		tags: [],
		question_code: "",
		difficulty: "",
	});

	const [markdown, setMarkdown] = useState("");
	const questionHandler = (e) => {
		setMarkdown(e.target.value);
		setQuestionToSet({
			...questionToSet,
			question: e.target.value,
		});
	};
	const submitQuestion = () => {
		fetch("http://localhost:3100/api/question", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(questionToSet),
		})
			.then((response) => response.json())
			.catch((err) => console.error(err));
		alert("question submitted");
	};
	const codeHandler = (event) => {
		setQuestionToSet({
			...questionToSet,
			question_code: event.target.value,
		});
	};
	const tagHandler = (event) => {
		setQuestionToSet({
			...questionToSet,
			tags: event.target.value.split(","),
		});
	};

	const answerHandler = (event) => {
		setQuestionToSet({
			...questionToSet,
			answers: {
				...questionToSet.answers,
				[event.target.name]: event.target.value,
			},
		});
	};

	const answerCheck = (event) => {
		setQuestionToSet({
			...questionToSet,
			correct_answers: {
				...questionToSet.correct_answers,
				[event.target.name]: event.target.checked ? true : false,
			},
		});
	};

	return (
		<div className="col-12">
			<form className="survey-form" onSubmit={submitQuestion}>
				<FormGroup className="question-elements">
          Code Illustration:{" "}
					<textarea onKeyUp={codeHandler} className="text-area" />
          Question,use markdown:
					<textarea onKeyUp={questionHandler} className="text-area" />
				</FormGroup>
				<FormGroup className="form-element">
					<input
						type="text"
						onKeyUp={tagHandler}
						placeholder="Tags, coma separated *required"
						name="answer_a"
						required
					/>
					<input
						type="text"
						onKeyUp={answerHandler}
						placeholder="answer a"
						name="answer_a"
					/>
					<input
						type="checkbox"
						name={"answer_a_correct"}
						onChange={answerCheck}
					/>
				</FormGroup>
				<FormGroup className="form-element">
					<input
						type="text"
						onKeyUp={answerHandler}
						placeholder="answer b"
						name="answer_b"
					/>
					<input
						type="checkbox"
						name={"answer_b_correct"}
						onChange={answerCheck}
					/>
				</FormGroup>
				<FormGroup className="form-element">
					<input
						type="text"
						onKeyUp={answerHandler}
						placeholder="answer c"
						name="answer_c"
					/>
					<input
						type="checkbox"
						name={"answer_c_correct"}
						onChange={answerCheck}
					/>
				</FormGroup>
				<FormGroup className="form-element">
					<input
						type="text"
						onKeyUp={answerHandler}
						placeholder="answer d"
						name="answer_d"
					/>
					<input
						type="checkbox"
						name={"answer_d_correct"}
						onChange={answerCheck}
					/>
				</FormGroup>
				<FormGroup className="form-element">
					<input
						type="text"
						onKeyUp={answerHandler}
						placeholder="answer e"
						name="answer_e"
					/>
					<input
						type="checkbox"
						name={"answer_e_correct"}
						onChange={answerCheck}
					/>
				</FormGroup>
				<FormGroup className="form-element">
					<input
						type="text"
						onKeyUp={answerHandler}
						placeholder="answer f"
						name="answer_f"
					/>
					<input
						type="checkbox"
						name={"answer_f_correct"}
						onChange={answerCheck}
					/>
				</FormGroup>
				<button> submit question</button>
			</form>
			<ReactMarkdown className="code" source={questionToSet.question_code} />
			<ReactMarkdown source={markdown} />
		</div>
	);
}
