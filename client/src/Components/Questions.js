import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import dayjs from "dayjs";

const Questions = (props) => {

	const [i, setI] = useState(0);
	const [route, setRoute] = useState("");
	const [fetchData, setFetchData] = useState([]);
	const [requestOption, setRequestOption] = useState({ method: "GET" });
	const [answer, setAnswer] = useState({
		question: "",
		correct: "",
		value: "",
		quiz_id:props.quizId,
		timestamp:"",
	});
	console.log(props.quizName);
	useEffect(() => {
		fetch(
			`http://localhost:3100/api/question/${props.fetchedData.questions_id[i]}`
		)
			.then((res) => res.json())
			.then((data) => setFetchData(data))
			.catch((err) => console.error(err));
		fetch(`http://localhost:3100/api/${route}`, requestOption)
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	}, [props.fetchedData.questions_id[i], route, requestOption]);

	const submitHandler = (e) => {
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});
		e.preventDefault();
		setI(i + 1);
	};

	const submitForm = ()=>{
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});

		if(i>=props.fetchedData.questions_id.length-1){
			alert("You submited the form successfully!");
		}
	};

	const checkHandler = (e) => {
		console.log(e.target.value);
		setAnswer({
			...answer,
			question: fetchData.question,
			value: e.target.value,
			correct: fetchData.correct_answer === e.target.name,
			timestamp :dayjs().format(),
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

	return (
		<div style={{ margin: "10%" }}>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<FormGroup>
						<p>{fetchData.question}</p>
						{fetchData.question_code ? <p>{fetchData.question_code}</p> : null}
					</FormGroup>
					<FormGroup>
						{answer_a ? (
							<Input
								type="radio"
								name="answer"
								value={answer_a}
								onClick={checkHandler}
							></Input>
						) : null}
						{answer_a ? <Label for="answer_a">{answer_a}</Label> : null}
					</FormGroup>

					<FormGroup>
						{answer_b ? (
							<Input
								type="radio"
								name="answer"
								value={answer_b}
								onClick={checkHandler}
							></Input>
						) : null}
						{answer_b ? <Label for="answer_b">{answer_b}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_c ? (
							<Input
								type="radio"
								name="answer"
								value={answer_c}
								onClick={checkHandler}
							></Input>
						) : null}
						{answer_c ? <Label for="answer_c">{answer_c}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_d ? (
							<Input
								type="radio"
								name="answer"
								value={answer_d}
								onClick={checkHandler}
							></Input>
						) : null}
						{answer_d ? <Label for="answer_d">{answer_d}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_e ? (
							<Input
								type="radio"
								name="answer"
								value={answer_e}
								onClick={checkHandler}
							></Input>
						) : null}
						{answer_e ? <Label for="answer_e">{answer_e}</Label> : null}
					</FormGroup>
					<FormGroup>
						{answer_f ? (
							<Input
								type="radio"
								name="answer"
								value={answer_f}
								onClick={checkHandler}
							></Input>
						) : null}
						{answer_f ? <Label for="answer_f">{answer_f}</Label> : null}
					</FormGroup>
					<hr style={{ margin: "40px 0" }} />
				</FormGroup>
				{i<props.fetchedData.questions_id.length-1?<Button>Next</Button>:<Button type="button" onClick={submitForm}>Submit</Button>}
			</Form>
		</div>
	);
};

export default Questions;
