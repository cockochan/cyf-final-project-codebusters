
import { Router } from "express";

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

export default router;
