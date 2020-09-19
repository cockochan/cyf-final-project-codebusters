import React, { useState } from "react";
import "./Modal.css";
export default function Mentors(props) {

	const [isOpen,setIsOpen]=useState(true);
    	return(
    		<React.Fragment>
    			{isOpen && (<div className='modal'>
    				<div className='modal-body'>
    					<h4 className='modalText'>{props.modalText}</h4>
					{props.func?<button onClick={()=> {
						setIsOpen(false);
						props.func();
						props.setModalText(null);
					}
					}>proceed</button>:null}
					<button className="card-button btn btn-primary btn-sm w-25" onClick={()=> {
						setIsOpen(false);
						props.setModalText(null);
					}
					}>close</button>
    				</div>
    			</div>)}
    		</React.Fragment>
    	);
}
