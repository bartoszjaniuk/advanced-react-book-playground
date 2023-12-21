import {
	ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import "./styles.css";

export const Example3 = () => <Form />;

const Form = () => {
	const ref = useRef<Api>(null);
	const [name, setName] = useState("");

	const onSubmitClick = () => {
		if (!name) {
			ref.current?.focus();
			ref.current?.shake();
			console.log("Input should be focused and shaken if empty!");
		} else console.log("Submit the name here!", name);
	};

	return (
		<form className="p-4 border flex gap-4">
			<Input onChange={setName} ref={ref} />
			<button onClick={onSubmitClick}>Submit</button>
		</form>
	);
};

type Api = {
	focus: () => void;
	shake: () => void;
};

type InputProps = {
	onChange: (val: string) => void;
};

const Input = forwardRef(({ onChange }: InputProps, ref: ForwardedRef<Api>) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [shouldShake, setShouldShake] = useState(false);

	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				inputRef.current?.focus();
			},
			shake: () => {
				setShouldShake(true);
			},
		}),

		[],
	);

	const className = shouldShake ? "shake" : "";

	return (
		<input
			ref={inputRef}
			type="text"
			onChange={(e) => onChange(e.target.value)}
			className={className}
			onAnimationEnd={() => {
				setShouldShake(false);
			}}
		/>
	);
});
