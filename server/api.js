import { Router } from "express";
import mongodb from "mongodb";
import { getClient } from "./db";

const cors = require("cors");
const router = new Router();

router.use(cors());
const client = getClient();

router.get("/", (_, res, next) => {
	client.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
		client.close();
	});
});

client.connect(() => {
	router.get("/questions", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("questions");

		collection.find().toArray((err, questions) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(questions);
			}
		});
	});

	router.post("/question", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("questions");
		const {
			question,
			question_code,
			description,
			answers,
			multiple_correct_answers,
			correct_answers,
			explanation,
			tip,
			tags,
			difficulty,
		} = req.body;
		if (!question || !answers || !correct_answers) {
			return res.status(400).json("please try again!");
		}
		const questionObject = {
			question: question,
			question_code: question_code,
			description: description,
			answers: answers,
			multiple_correct_answers: multiple_correct_answers,
			correct_answers: correct_answers,
			explanation: explanation,
			tip: tip,
			tags: tags,
			difficulty: difficulty,
		};

		collection.insertOne(questionObject, (err, question) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(question.ops[0]);
			}
		});
	});

	router.post("/quiz", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("quizzes");
		const { name, questions_id, publishingDate } = req.body;
		const quizObject = {
			name: name,
			questions_id,
			publishingDate: publishingDate,
		};
		if (!name || questions_id.length <= 0) {
			return req.status(400).json("please provide the correct data!");
		}

		collection.insertOne(quizObject, (err, quiz) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(quiz.ops[0]);
			}
		});
	});

	router.get("/quizzes", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("quizzes");

		collection.find().toArray((err, questions) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(questions);
			}
		});
	});

	router.get("/quizzes/:id", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("quizzes");
		const quizId = req.params.id;
		if (!mongodb.ObjectID.isValid(quizId)) {
			return res.status(400).json("the 'id' is not correct!");
		}
		const id = mongodb.ObjectID(quizId);

		collection.findOne(id, (err, questions) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(questions);
			}
		});
	});

	router.get("/results/:id", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("results");
		const quizId = req.params.id;
		if (!mongodb.ObjectID.isValid(quizId)) {
			return res.status(400).json("the 'Quiz Id' is not valid");
		}
		const quizResults = { quiz_id: quizId };

		collection.find(quizResults).toArray((err, results) => {
			if (err) {
				res.status(500).send(err);
			} else if (results.length > 0) {
				res.status(200).send(results);
			} else {
				res.status(404).json("not found!");
			}
		});
	});

	router.get("/results", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("results");

		collection.find().toArray((err, results) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(results);
			}
		});
	});

	router.post("/results", (req, res) => {
		const {
			question_id,
			correct,
			value,
			quiz_id,
			timestamp,
			studentName,
		} = req.body;
		if (!studentName) {
			return req.status(400).json("please provide the correct data!");
		}
		const db = client.db("quiz");
		const collection = db.collection("results");
		const resultObject = {
			question_id: question_id,
			correct: correct,
			value: value,
			quiz_id: quiz_id,
			timestamp: timestamp,
			studentName: studentName,
		};

		collection.insertOne(resultObject, (err, result) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(result.ops[0]);
			}
		});
	});

	router.get("/question/:id", (req, res) => {
		const db = client.db("quiz");
		const collection = db.collection("questions");
		const questionId = req.params.id;
		if (!mongodb.ObjectID.isValid(questionId)) {
			return res.status(400).json("the ID is not valid");
		}
		const id = mongodb.ObjectID(questionId);
		collection.findOne({ _id: id }, (err, question) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(question);
			}
		});
	});
});

export default router;
