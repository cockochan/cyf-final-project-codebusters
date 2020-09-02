import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import dayjs from "dayjs";

const Questions = (props) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [route, setRoute] = useState("");
	const [postData, setPostData] = useState({});
	const [questionData, setQuestionData] = useState({});
	const [requestOption, setRequestOption] = useState({ method: "GET" });
	const [answer, setAnswer] = useState({
		question_id: props.quizData.questions_id[currentQuestionIndex],
		correct: false,
		value: "",
		quiz_id: props.quizId,
		timestamp: dayjs().format(),
		studentName: "",
	});
	useEffect(() => {
		fetch(
			`http://localhost:3100/api/question/${props.quizData.questions_id[currentQuestionIndex]}`
		)
			.then((res) => res.json())
			.then((data) => setQuestionData(data))
			.catch((err) => console.error(err));
		fetch(`http://localhost:3100/api/${route}`, requestOption)
			.then((res) => res.json())
			.then((data) => setPostData(data))
			.catch((err) => console.error(err));
	}, [props.quizData.questions_id[currentQuestionIndex], route, requestOption]);
	const submitHandler = (e) => {
		setCurrentQuestionIndex(currentQuestionIndex + 1);
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});
		e.preventDefault();
		e.target.reset;
		setAnswer({
			...answer,
			question_id: props.quizData.questions_id[currentQuestionIndex + 1],
			timestamp: dayjs().format(),
			value: "",
			correct: false,
		});
	};

	const submitForm = (event) => {
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});
		event.target.reset;
		props.setIsSubmitted(true);
		props.setTextMessage("Form submitted successfully!");
		props.setRoute("");
		props.setOptionState("");
	};

	const checkHandler = (e) => {
		setAnswer({
			...answer,
			value: e.target.value,
			correct: questionData.correct_answer === e.target.id,
		});
	};

	if (!questionData.answers) {
		return <p>There is no question to show</p>;
	}
	let {
		answer_a,
		answer_b,
		answer_c,
		answer_d,
		answer_e,
		answer_f,
	} = questionData.answers;
	const changeHandler = (e) => {
		setAnswer({
			...answer,
			studentName: e.target.value,
		});
	};

	return (
		<Form onSubmit={submitHandler} className="survey-form">
			<input
				type="text"
				placeholder="Enter your name"
				onChange={changeHandler}
				className="answers"
				required
				autoFocus
			/>
			<FormGroup>
				<FormGroup className="answers">
					<p>
						<strong>{questionData.question}</strong>
					</p>
					{questionData.question_code ? (
						<p>{questionData.question_code}</p>
					) : null}
				</FormGroup>
				<FormGroup className="answers">
					{answer_a ? (
						<Input
							type="radio"
							name="answer"
							value={answer_a}
							onClick={checkHandler}
							id="answer_a"
						/>
					) : null}
					{answer_a ? <Label for="answer_a">{answer_a}</Label> : null}
				</FormGroup>

				<FormGroup className="answers">
					{answer_b ? (
						<Input
							type="radio"
							name="answer"
							value={answer_b}
							onClick={checkHandler}
							id="answer_b"
						/>
					) : null}
					{answer_b ? <Label for="answer_b">{answer_b}</Label> : null}
				</FormGroup>
				<FormGroup className="answers">
					{answer_c ? (
						<Input
							type="radio"
							name="answer"
							value={answer_c}
							onClick={checkHandler}
							id="answer_c"
						/>
					) : null}
					{answer_c ? <Label for="answer_c">{answer_c}</Label> : null}
				</FormGroup>
				<FormGroup className="answers">
					{answer_d ? (
						<Input
							type="radio"
							name="answer"
							value={answer_d}
							onClick={checkHandler}
							id="answer_d"
						/>
					) : null}
					{answer_d ? <Label for="answer_d">{answer_d}</Label> : null}
				</FormGroup>
				<FormGroup className="answers">
					{answer_e ? (
						<Input
							type="radio"
							name="answer"
							value={answer_e}
							onClick={checkHandler}
							id="answer_e"
						/>
					) : null}
					{answer_e ? <Label for="answer_e">{answer_e}</Label> : null}
				</FormGroup>
				<FormGroup className="answers">
					{answer_f ? (
						<Input
							type="radio"
							name="answer"
							value={answer_f}
							onClick={checkHandler}
							id="answer_f"
						/>
					) : null}
					{answer_f ? <Label for="answer_f">{answer_f}</Label> : null}
				</FormGroup>
				<hr style={{ margin: "40px 0" }} />
			</FormGroup>
			{currentQuestionIndex < props.quizData.questions_id.length - 1 ? (
				<Button className="answers">Next</Button>
			) : (
				<Button type="button" onClick={submitForm} className="answers">
          Submit
				</Button>
			)}
		</Form>
	);
};

export default Questions;
