import { ForwardedRef, RefObject, forwardRef, useRef, useState } from "react";

export const Example2 = () => <Form />;

const Form = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const ref = useRef<HTMLInputElement>(null);
	const [name, setName] = useState("");

	const handleSubmit = () => {
		if (!name) {
			console.log("Input should be filled");
			inputRef.current?.focus();
			ref.current?.focus();
			return;
		}
		console.log("Submit with: ", name);
	};

	return (
		<div className="container border">
			<form>
				<InputFieldWithRef inputRef={inputRef} onChange={setName} />
				<InputFieldWithForwardRef ref={ref} onChange={setName} />
				<button type="button" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
};

type InputFieldWithRefProps = {
	onChange: (val: string) => void;
	inputRef: RefObject<HTMLInputElement>;
};
const InputFieldWithRef = ({ inputRef, onChange }: InputFieldWithRefProps) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="inputRef">Input Ref</label>
			<input
				id="inputRef"
				type="text"
				ref={inputRef}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

type InputFieldWithForwardRefProps = {
	onChange: (val: string) => void;
};

const InputFieldWithForwardRef = forwardRef(
	(
		{ onChange }: InputFieldWithForwardRefProps,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		return (
			<div className="flex flex-col gap-2">
				<label htmlFor="forwardRef">Input forwardRef</label>
				<input
					id="forwardRef"
					type="text"
					ref={ref}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
		);
	},
);
