import { useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

export const Example2 = () => {
	const [showDialog, setShowDialog] = useState(false);

	return (
		<div className="App">
			<div className="header">Header is sticky</div>
			<h1>Hello CodeSandbox</h1>
			<div className="layout">
				<div className="main">
					main part
					<br />
					<button className="border" onClick={() => setShowDialog(true)}>
						open fixed dialog
					</button>
					{showDialog &&
						createPortal(
							<ModalDialog onClose={() => setShowDialog(false)} />,
							document.getElementById("root") as any,
						)}
				</div>
			</div>
		</div>
	);
};

const ModalDialog = ({ onClose }: { onClose: () => void }) => {
	return (
		<div className="modal center" style={{ zIndex: 99, position: "fixed" }}>
			Dialog should be in the middle of the screen
			<br />
			<br />
			and it is!
			<br />
			<br />
			<button onClick={onClose} className="border">
				close dialog
			</button>
		</div>
	);
};
