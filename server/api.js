
import { Router } from "express";
import mongodb from "mongodb";

import { getClient } from "./db";
const cors = require("cors");


const router = new Router();
router.use(cors());

router.get("/", (_, res, next) => {
	const client = getClient();

	client.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
		client.close();
	});
});

router.get("/questions",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("questions");
		collection.find().toArray((err, questions)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(questions);
			}
		});
	});
});

router.post("/question",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("questions");
		const question = req.body;

		collection.insertOne(question,(err, question)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(question);
			}
		});
	});
});

router.post("/quiz",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("quizes");
		const question = req.body;

		collection.insertOne(question,(err, quiz)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(quiz);
			}
		});
	});
});

router.get("/quizes",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("quizes");
		collection.find().toArray((err, questions)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(questions);
			}
		});
	});
});

router.get("/quizes/search",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("quizes");
		const quiz = { quiz_name:req.query.quiz_name };
		collection.findOne(quiz,(err, questions)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(questions);
			}
		});
	});
});

router.get("/results/search",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("results");
		const quiz = { name:req.query.name };
		collection.find(quiz).toArray((err, results)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(results);
			}
		});
	});
});
router.get("/results",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("results");
		collection.find().toArray((err, results)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(results);
			}
		});
	});
});

router.post("/results",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("results");
		const question = req.body;

		collection.insertOne(question,(err, result)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(result.ops[0]);
			}
		});
	});
});

router.get("/question/:id",(req, res)=>{
	const client = getClient();
	client.connect(()=>{
		const db = client.db("quiz");
		const collection = db.collection("questions");

		const questionId = req.params.id;
		if (!mongodb.ObjectID.isValid(questionId)) {
			return res.status(400).json("the ID is not valid");
		}
		const id = mongodb.ObjectID(questionId);
		collection.findOne(id,(err, questions)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(questions);
			}
		});
	});
});

export default router;
