import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "../App.css";
import "../grid.css";
import ReactMarkdown from "react-markdown";
export default function Mentors(props) {
	const [newQuizQuestions, setNewQuizQuestions] = useState([]);
	const [tagsCollection, setTagsCollection]=useState([]);
	const [filteredQuestionsByTag, setFilteredQuestionsByTag]=useState(props.questions);
	const [newQuiz, setNewQuiz] = useState({
		name: "",
		publishingDate: "",
		questions_id: [],
	});
	let tempFilterdData;
	const tagClickHandler =(e)=>{
		setFilteredQuestionsByTag(null);
		tempFilterdData=props.questions.filter((question)=>{

			question.tags.find((tag)=>tag==e.target.value);
			console.log(e.target.value,question.tags);
		});

		console.log(tempFilterdData);
		setFilteredQuestionsByTag(tempFilterdData);
	};


	const findTags=()=>{

		let tempTags=[];
		if(props.questions){
			tempTags=props.questions.map((question)=>{
				question.tags.map((tag)=>{
					if(!tempTags.includes(tag)&&tag!==undefined){
						console.log(tag);
						tempTags.push(tag);
					} else{
						null;
					}

				});
				setTagsCollection(tempTags);
			});

		}

	};
	useEffect(() => {
		const makeQuestions = () => {
			let selectedQuestions = [];
			selectedQuestions = newQuiz.questions_id.map((selectedId) => {
				let found = props.questions.find((question) => question._id === selectedId);
				selectedQuestions.push(found);
				setNewQuizQuestions(selectedQuestions);
			});
		};
		makeQuestions();
		findTags();
		setFilteredQuestionsByTag(props.questions);
	}, [newQuiz.questions_id, props.questions]);

	const addQuestion = (event) => {
		setNewQuiz({
			...newQuiz,
			questions_id: [...newQuiz.questions_id, event.target.value],
		});
	};

	const submitQuiz = () => {
		if (newQuiz.name.length < 8) {
			alert("Quiz name should have at least 8 sybols");
		} else if (newQuizQuestions.length < 5) {
			alert("Quizz  should have at least 5 questions");
		} else {
			sendQuiz();
		}
	};
	const sendQuiz = () => {
		alert("done");
		fetch("http://localhost:3100/api/quiz", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(newQuiz),
		})
			.then((response) => response.json())
			.catch((err) => console.error(err));
	};
	const newQuizName = (event) => {
		setNewQuiz({
			...newQuiz,
			publishingDate:dayjs().format(),
			name: event.target.value,
		});
	};
	const removeQuestion = (event) => {
		let filteredQustionIds = newQuiz.questions_id.filter((questionId) => {
			return questionId != event.target.value;
		});
		setNewQuiz({
			...newQuiz,
			questions_id: filteredQustionIds,
		});
		setNewQuizQuestions(
			newQuizQuestions.filter((question) => question._id !== event.target.value)
		);
	};
	if (props.questions) {
		return (
			<div className="row">
				<div className='filterButtons col-6'>
					{tagsCollection.map((tag)=>{
						return(<button value={tag} onClick={tagClickHandler}>{tag}</button>);
					})}
				</div>
				<div className="col-8 cardBlock">
					{props.questions.map((question, index) => (
						<div className="col-6 card" key={index}>
							<div className="quizzQuestion">
								{question.question_code?<ReactMarkdown className="code">{question.question_code}</ReactMarkdown>:null}
								<ReactMarkdown className='centered'>{question.question}</ReactMarkdown>
							</div>
							<div className="answers">
								{Object.values(question.answers).map((value, index) => {
									return (
										<div key={index}>
											<div className="col-12 answer">{value}</div>
										</div>
									);
								})}
							</div>
							<button className ='addQuestionButton'
								id={question._id}
								value={question._id}
								onClick={addQuestion}
							>
                Add to quiz
							</button>
						</div>
					))}
				</div>
				<div className="col-4 newQuiz">
					<h1>New quiz</h1>
					<input
						type="text"
						onKeyUp={newQuizName}
						placeholder={"Enter quiz name"}
					/>
					{newQuizQuestions.map((question) => (
						<div className="col-12 card" key={question.question}>
							<button
								key={question._id + question.question}
								type="checkbox"
								checked="checked"
								id="horns"
								value={question._id}
								onClick={removeQuestion}
							>
                x
							</button>
							{question.question_code?<ReactMarkdown className="code">{question.question_code}</ReactMarkdown>:null}
							<ReactMarkdown>{question.question}</ReactMarkdown>
							<div className="answers">
								{Object.entries(question.answers).map(([index, value]) => {
									return (
										<div key={index}>
											<div className="col-6">{value}</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
					<button onClick={submitQuiz}>Submit</button>
				</div>
			</div>
		);
	} else {
		return <div>No questions loaded</div>;
	}
}
