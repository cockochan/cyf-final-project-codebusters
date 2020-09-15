import React, { useState } from "react";
import "./Modal.css";
export default function Mentors(props) {
	const [isOpen,setIsOpen]=useState(true);

    	return(
    		<React.Fragment>
    			{/* <button onClick={()=> this.setState({ isOpen:true })}>Open modal</button> */}
    			{isOpen && (<div className='modal'>
    				<div className='modal-body'>
    					{/* <h1>{props.modalText}</h1> */}
    					<h1>{props.modalText}</h1>
					{props.func?<button onClick={()=> {
						setIsOpen(false);
						props.func();
					}
					}>proceed</button>:null}
					<button onClick={()=> {
						setIsOpen(false);
						props.setModalText(null);
					}
					}>ok</button>
    				</div>
    			</div>)}
    		</React.Fragment>
    	);
}