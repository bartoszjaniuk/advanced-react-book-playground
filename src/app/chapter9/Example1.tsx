import { ChangeEvent, useEffect, useRef, useState } from "react";

type BasicModalDialogProps = {
	onClose: () => void;
};

export const ModalDialog = ({ onClose }: BasicModalDialogProps) => {
	return (
		<div className="border bg-blue-200">
			<div className="content">modal content</div>

			<div className="footer">
				<button className="border" onClick={onClose}>
					close dialog
				</button>
			</div>
		</div>
	);
};

export const Example1 = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className="container flex gap-4">
				<FormWithState />
				<FormWithRef />
			</div>
			<div className="container">
				<button className="border" onClick={() => setIsOpen(true)}>
					Open dialog
				</button>
				{isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
			</div>
		</div>
	);
};

const FormWithState = () => {
	const [value, setValue] = useState<string>();

	useEffect(() => {
		console.log("re-render FormWithState");
	});
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const submit = () => {
		console.log(value);
	};
	const numberOfLetters = value?.length ?? 0;
	return (
		<div className="column border">
			<h3>Form with state</h3>
			<input type="text" onChange={onChange} />
			<br />
			Number of letters: {numberOfLetters}
			<br />
			<button
				className="border border-purple-500 text-purple-500"
				onClick={submit}
			>
				submit
			</button>
		</div>
	);
};

const FormWithRef = () => {
	const ref = useRef("");

	useEffect(() => {
		console.log("re-render FormWithRef");
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		(ref.current = e.target.value);

	const submit = () => console.log(ref.current);

	// It will update only if something will cause re-render
	const numberOfLetters = ref.current?.length ?? 0;
	return (
		<div className="column border">
			<h3>Form with ref</h3>
			<input type="text" onChange={onChange} />
			<br />
			Number of letters: {numberOfLetters}
			<br />
			<button
				className="border border-purple-500 text-purple-500"
				onClick={submit}
			>
				submit
			</button>
		</div>
	);
};
