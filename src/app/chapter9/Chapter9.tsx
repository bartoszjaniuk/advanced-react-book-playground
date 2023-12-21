import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";
import { Example3 } from "./Example3";

const EXAMPLE_1 = `
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
`;

const EXAMPLE_2 = `
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
`;

const EXAMPLE_3 = `
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
`;

export const Chapter9 = () => {
	return (
		<>
			<InfoNote variant="info">
				<p className="py-4 text-lg">
					Some typical use cases for using the native DOM API in the React world
					would include:
				</p>
				<ul className="list-disc px-4">
					<li>
						Manually focusing an element after it's rendered, like an input
						field in a form.
					</li>
					<li>
						Detecting a click outside of a component when showing popup-like
						elements.
					</li>
					<li>
						Manually scrolling to an element after it appears on the screen.
					</li>
					<li>
						Calculating sizes and boundaries of components on the screen to
						correctly position something like a tooltip.
					</li>
				</ul>
			</InfoNote>

			<InfoNote
				variant="info"
				text="A Ref is a mutable object that React preserves between re-renders."
			/>

			<Example1 />
			<InfoNote
				variant="info"
				text="useState vs useRef behaviour | preserve state between re-renders"
			/>

			<CodeBlock code={EXAMPLE_1} />
			<InfoNote
				variant="warning"
				text="Ref update never triggers a re-render"
			/>

			<InfoNote variant="warning" text="IT'S NOT GOOD IDEA TO USE REF WHEN">
				<ul className="list-disc px-4">
					<li>
						Is this value passed as props to other components in any way, now or
						in the future?
					</li>
					<li>
						Is this value used for rendering components, now or in the future?
					</li>
				</ul>
			</InfoNote>

			<InfoNote>
				<h1>Passing Ref from parent to child as a prop</h1>
				<p>It can be done as ref or forwardRef(ref)</p>
				<p>
					The difference is that "ref" is preserved name and can be used only
					with forwardRef
				</p>
			</InfoNote>
			<Example2 />
			<CodeBlock code={EXAMPLE_2} />
			<p>Imperative API with useImperativeHandle</p>
			<Example3 />
			<CodeBlock code={EXAMPLE_3} />
		</>
	);
};
