import { useState } from "react";

const ModalDialog = ({ onClose }: { onClose: VoidFunction }) => {
	return (
		<div className="w-40 h-40 border rounded-lg bg-white" role="dialog">
			<h1>Modal</h1>
			<button onClick={onClose}>close dialog</button>
		</div>
	);
};

const AnotherComponent = () => <div>AnotherComponent</div>;

const ButtonWithModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<button onClick={() => setIsOpen(true)}> Open dialog</button>
			{isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
		</>
	);
};

export const SeparatedState = () => {
	return (
		<div className="border border-blue-400 p-4 my-4">
			<ButtonWithModal />
			<AnotherComponent />
		</div>
	);
};
