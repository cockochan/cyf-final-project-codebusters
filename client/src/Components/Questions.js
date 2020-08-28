import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import dayjs from "dayjs";

const Questions = (props) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [route, setRoute] = useState("");
	const [fetchData, setFetchData] = useState([]);
	const [requestOption, setRequestOption] = useState({ method: "GET" });
	const [answer, setAnswer] = useState({
		question_id: "",
		correct: "",
		value: "",
		quiz_id: props.quizId,
		timestamp: "",
		studentName: "",
	});
	useEffect(() => {
		fetch(
			`http://localhost:3100/api/question/${props.fetchedData.questions_id[currentQuestionIndex]}`
		)
			.then((res) => res.json())
			.then((data) => setFetchData(data))
			.catch((err) => console.error(err));
		fetch(`http://localhost:3100/api/${route}`, requestOption)
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	}, [
		props.fetchedData.questions_id[currentQuestionIndex],
		route,
		requestOption,
	]);

	const submitHandler = (e) => {
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});
		e.preventDefault();
		e.target.reset;
		setCurrentQuestionIndex(currentQuestionIndex + 1);
	};

	const submitForm = (event) => {
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});
		event.target.reset;

		if (currentQuestionIndex >= props.fetchedData.questions_id.length - 1) {
			alert("You submited the form successfully!");
		}
	};

	const checkHandler = (e) => {
		setAnswer({
			...answer,
			question_id: fetchData._id,
			value: e.target.value,
			correct: fetchData.correct_answer === e.target.name,
			timestamp: dayjs().format(),
		});
	};

	if (!fetchData.answers) {
		return <p>Loading...</p>;
	}
	let {
		answer_a,
		answer_b,
		answer_c,
		answer_d,
		answer_e,
		answer_f,
	} = fetchData.answers;
	const changeHandler = (e) => {
		setAnswer({
			...answer,
			studentName: e.target.value,
		});
	};

	return (
		<div style={{ margin: "10%" }}>
			<Form onSubmit={submitHandler}>
				<input
					type="text"
					placeholder="Enter your name"
					onChange={changeHandler}
				/>
				<FormGroup>
					<FormGroup>
						<p>{fetchData.question}</p>
						{fetchData.question_code ? <p>{fetchData.question_code}</p> : null}
					</FormGroup>
					<FormGroup>
						{answer_a ? (
							<Input
								type="radio"
								name="answer_a"
								value={answer_a}
								onClick={checkHandler}
							/>
						) : null}
						{answer_a ? <Label for="answer_a">{answer_a}</Label> : null}
					</FormGroup>

					<FormGroup>
						{answer_b ? (
							<Input
								type="radio"
								name="answer_b"
								value={answer_b}
								onClick={checkHandler}
							/>
						) : null}
						{answer_b ? <Label for="answer_b">{answer_b}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_c ? (
							<Input
								type="radio"
								name="answer_c"
								value={answer_c}
								onClick={checkHandler}
							/>
						) : null}
						{answer_c ? <Label for="answer_c">{answer_c}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_d ? (
							<Input
								type="radio"
								name="answer_d"
								value={answer_d}
								onClick={checkHandler}
							/>
						) : null}
						{answer_d ? <Label for="answer_d">{answer_d}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_e ? (
							<Input
								type="radio"
								name="answer_e"
								value={answer_e}
								onClick={checkHandler}
							/>
						) : null}
						{answer_e ? <Label for="answer_e">{answer_e}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_f ? (
							<Input
								type="radio"
								name="answer_f"
								value={answer_f}
								onClick={checkHandler}
							/>
						) : null}
						{answer_f ? <Label for="answer_f">{answer_f}</Label> : null}
					</FormGroup>
					<hr style={{ margin: "40px 0" }} />
				</FormGroup>
				{currentQuestionIndex < props.fetchedData.questions_id.length - 1 ? (
					<Button>Next</Button>
				) : (
					<Button type="button" onClick={submitForm}>
            Submit
					</Button>
				)}
			</Form>
		</div>
	);
};

export default Questions;
