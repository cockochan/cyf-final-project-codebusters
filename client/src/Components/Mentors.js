import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Navbar from "./Navbar";
import ReactMarkdown from "react-markdown";
import RunQuiz from "./RunQuiz";
import Modal from "../Modal/Modal";
export default function Mentors(props) {
	const [newQuizQuestions, setNewQuizQuestions] = useState([]);
	const [numberOfQuestions,setNumberOfQuestions]=useState(5);
	const [filteredQuestionsByTag, setFilteredQuestionsByTag]=useState(props.questions);
	const [tagsCollection, setTagsCollection] = useState([]);
	const [modalText,setModalText]=useState(null);
	const [newQuiz, setNewQuiz] = useState({
		name: "",
		publishingDate: "",
		questions_id: [],
		code:"",
	});
	const clearQuiz = () => {
		setNewQuiz({
			name: "",
			publishingDate: "",
			questions_id: [],
			code:"",
		});
		setNewQuizQuestions([]);
	};
	const autofillQuizz = () => {
		clearQuiz();
		const shuffled = filteredQuestionsByTag.sort(() => 0.5 - Math.random());
		// Get sub-array of first n elements after shuffled
		let selected = shuffled.slice(0, numberOfQuestions);
		let selectedIds = [];
		selected.map((question) => selectedIds.push(question._id));
		setNewQuiz({
			...newQuiz,
			questions_id: selectedIds,
		});
	};
	const resetFilters = () => {
		setFilteredQuestionsByTag(props.questions);
	};
	let tempFilteredData = [];
	const tagClickHandler = (e) => {
		setFilteredQuestionsByTag(null);
		props.questions.map((question) => {
			if (question.tags.includes(e.target.value)) {
				tempFilteredData = [...tempFilteredData, question];
			} else {
				null;
			}
		});
		setFilteredQuestionsByTag(tempFilteredData);
	};
	const findTags = () => {
		let tempTags = [];
		if (props.questions) {
			tempTags = props.questions.map((question) => {
				question.tags.map((tag) => {
					if (!tempTags.includes(tag) && tag !== undefined) {
						tempTags.push(tag);
					} else {
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
				let found = filteredQuestionsByTag.find(
					(question) => question._id === selectedId
				);
				selectedQuestions.push(found);
				setNewQuizQuestions(selectedQuestions);
			});
		};
		makeQuestions();
		findTags();
		setFilteredQuestionsByTag(props.questions);
	}, [newQuiz.questions_id, props.questions, newQuiz]);

	const addQuestion = (event) => {
		setNewQuiz({
			...newQuiz,
			questions_id: [...newQuiz.questions_id, event.target.value],
		});
	};

	const submitQuiz = () => {
		if (newQuiz.name.length < 8) {
			setModalText("Quiz name should have at least 8 characters");
		} else if (newQuizQuestions.length < 5) {
			setModalText("Quiz  should have at least 5 questions");
		} else {
			sendQuiz();
		}
	};
	const sendQuiz = () => {
		fetch("/api/quiz", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(newQuiz),
		})
			.then((response) => {
				response.json();
				setModalText(response.statusText);
			})
			.catch((err) => console.error(err));
	};

	const newQuizName = (event) => {
		setNewQuiz({
			...newQuiz,
			publishingDate: dayjs().format(),
			name: event.target.value,
			code:Math.random().toString(36).replace(/[^a-z0-9]+/g, "").substr(0, 4),
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
	const selectHandler=(event)=>{
		setNumberOfQuestions(event.target.value);
	};
	if (filteredQuestionsByTag) {
		return (
			<div className='main'>
				<Navbar mentors="Mentors" results="Results" newquestion ="New Question" />
				<div className="container">
					<div className='row'>
					{modalText?(modalText==="OK"?<Modal modalText={"submitted successfully"} />:<Modal modalText={"something went wrong"} />):null}
						<RunQuiz quizzes={props.quizzes} />
						<div className="filterButtons row">
							<select  onChange={tagClickHandler}>
								<option value="" disabled selected hidden>select tag filter</option>
								{tagsCollection.map((tag, index) => {
									return (
										<option value={tag} name={tag} key={index} >{tag}</option>
									);
								})}
							</select>
							<div>
					 <select onChange={selectHandler}>
						 <option selected disabled>Number of question</option>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
								</select>
					 </div>
							<button onClick={autofillQuizz}>autofill quiz</button>
							<button onClick={resetFilters}>reset filters</button>
						</div>
						{modalText?<Modal modalText={modalText} setModalText={setModalText} />:null}
						<div className="col-9 card-block">
							{filteredQuestionsByTag.map((question, index) => (

								<div className=" col-3 card" key={index}>
									<div className="question-and-code-containter">
										{question.question_code ? (
											<div>
												<ReactMarkdown className="code">
													{question.question_code}
												</ReactMarkdown></div>
										) : null}
										<div>
											<ReactMarkdown className="question">
												{question.question}
											</ReactMarkdown>
										</div>
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
									<button
										className="quiz-button card-button"
										id={question._id}
										value={question._id}
										onClick={addQuestion}
									>

                Add to Quiz
									</button>
								</div>

							))}
						</div>
						<div className="col-3 quizQuestions">
							<div className="form-title">New quiz</div>
							<div className="quiz-handler">
								<button onClick={clearQuiz} className="quiz-button"> clear quiz</button>
								<input
									type="text"
									onKeyUp={newQuizName}
									placeholder={"Enter quiz name"}
									className="input"
								/>
								<button onClick={submitQuiz} className="quiz-button">Submit</button>
							</div>
							{newQuizQuestions.map((question) => (
								<div className="col-12 card" key={question.question}>
									<div className="question-and-code-containter">
										{question.question_code ? (
											<ReactMarkdown className="code">
												{question.question_code}
											</ReactMarkdown>
										) : null}
										<ReactMarkdown className="question">{question.question}</ReactMarkdown>
									</div>
									<div className="answers">
										{Object.entries(question.answers).map(([index, value]) => {
											return (
												<div key={index}>
													<div className="col-6 answer">{value}</div>
												</div>
											);
										})}
									</div>
									<button
										key={question._id + question.question}
										type="checkbox"
										checked="checked"
										id="horns"
										value={question._id}
										onClick={removeQuestion}
										className="quiz-button card-button"
									>
                Delete
									</button>
								</div>
							))}
						</div>
					</div></div></div>
		);
	} else {
		return <div>No questions loaded</div>;
	}
}
