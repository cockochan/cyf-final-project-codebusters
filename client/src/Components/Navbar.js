import React from "react";
import "../App.css";
import { BrowserRouter as Link } from "react-router-dom";

const Navbar = (props) => {
	return (
		<nav className="navbar">
			<div className="col-3">
				<a className="logo-container" href="/">
					<img
						src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
						alt="cyf_brand.png"
						className="cyf-logo"
					/>
				</a>
			</div>
			<div className="links-container col-9">
				{props.mentors ? (
					<a href="/mentors/5wjhfxnr" className="link-button">
						{props.mentors}
					</a>
				) : null}
				{props.results ? (
					<a href="/results/5wjhfxnr" className="link-button">
						{props.results}
					</a>
				) : null}
				{props.newquestion ? (
					<a href="/newquestion/5wjhfxnr" className="link-button">
						{props.newquestion}
					</a>
				) : null}
			</div>
		</nav>
	);
};

export default Navbar;
