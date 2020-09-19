import React, { useState } from "react";
import "./Modal.css";
export default function Mentors(props) {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<React.Fragment>
			{isOpen && (
				<div className="modal">
					<div className="modal-body">
						<p className="modalText">{props.modalText}</p>
						<div className="modal-buttons">
							{props.func ? (
								<button
									className="btn btn-primary"
									onClick={() => {
										setIsOpen(false);
										props.func();
										props.setModalText(null);
									}}
								>
                  Ok
								</button>
							) : null}
							<button
								className="btn btn-primary"
								onClick={() => {
									setIsOpen(false);
									props.setModalText(null);
								}}
							>
                Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
}
