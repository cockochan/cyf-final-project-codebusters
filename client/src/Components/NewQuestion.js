import React, { useState } from "react";
import ReactMarkdown from "react-markdown";


export default function NewQuestion() {
	const [md, setMd] = useState("");
	// const textChanged = (e) => {
	// 	setMd(e.target.value);
	// };
	return (
		<div>
			<h1>question</h1>
			{/* <textarea onKeyUp={(e) => textChanged(e)} /> */}

			<h1>answers</h1>
			<input placeholder="correct answer " />
			<input placeholder="wrong answer 1" />
			<input placeholder="wrong answer 2" />
			<input placeholder="wrong answer 3" />
			{/* <ReactMarkdown source={md} /> */}
		</div>
	);
}
