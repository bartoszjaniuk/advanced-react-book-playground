import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";
import { Example3 } from "./Example3";
import { Example4 } from "./Example4";

const EXAMPLE_1 = `
const [value, setValue] = useState<string>();

const onClick = useCallback(() => {
  // state will always be the initial state value here
  // the closure is never refreshed
  console.log(value);

  // forgot about dependencies
}, []);

return (
  <div className="App">
    <h1>Closures example</h1>
    <>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="button" onClick={onClick}>
        click
      </button>
    </>
  </div>
);
`;

const EXAMPLE_2 = `
export const Example2 = ({ someProp }: { someProp: string }) => {
	const [state, setState] = useState<string>();
	// initialize ref - creates closure!
	const ref = useRef(() => {
		// both of them will be stale and will never change
		console.log(someProp);
		console.log(state);
	});

	const refStale = useRef(() => {
		// value is stale and never changes
		console.log("stale", state);
	});

	useEffect(() => {
		console.log(someProp);
		console.log(state);
	}, [state, someProp]);

	const onClick = () => {
		// stale closure, logs undefined
		refStale.current();
		// updated closure, logs latest
		ref.current();
	};

	return (
		<>
			<h1>Closures example</h1>
			<input
				type="text"
				value={state}
				onChange={(e) => setState(e.target.value)}
			/>
			<button className="button" onClick={onClick}>
				click
			</button>
		</>
	);
};
`;

const EXAMPLE_3 = `
const HeavyComponent = ({ onClick, title }: HeavyComponentProps) => {
	useEffect(() => {
		console.log("HeavyComponent");
	}, []);
	return (
		<>
			<h3>{title}</h3>
			<p>Some other stuff here</p>
			<button className="button" type="button" onClick={onClick}>
				Done!
			</button>
		</>
	);
};

const HeavyComponentMemo = React.memo(HeavyComponent);

export const Example3 = () => {
	useEffect(() => {
		console.log("Example3");
	}, []);

	const [value, setValue] = useState<string>();

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
		},
		[value],
	);

	const onClick = useCallback(() => {
		console.log("onClick", value);
	}, [value]);

	return (
		<div>
			<h1>Correct memoization with useCallback</h1>
			<p>Value: {value}</p>
			<input type="text" value={value} onChange={onChange} />
			<HeavyComponentMemo title="Heavy Component" onClick={onClick} />
		</div>
	);
};
`;

const EXAMPLE_4 = `
export const Example4 = () => {
	const [value, setValue] = useState<string>();
	const ref = useRef<() => void>();

	useEffect(() => {
		ref.current = () => {
			console.log(value);
		};
	});

	const onClick = useCallback(() => {
		ref.current?.();
	}, []);

	return (
		<div className="App">
			<h1>Closures example</h1>

			<>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<HeavyComponentMemo title="Welcome closures" onClick={onClick} />
			</>
		</div>
	);
};

const HeavyComponent = ({ onClick, title }: HeavyComponentProps) => {
	return (
		<>
			<h3>{title}</h3>
			<p>Some other stuff here</p>
			<button className="button" onClick={onClick}>
				Done!
			</button>
		</>
	);
};

const HeavyComponentMemo = React.memo(HeavyComponent);
`;

export const Chapter10 = () => {
	return (
		<>
			<InfoNote text="useCallback stale clousre" />
			<CodeBlock code={EXAMPLE_1} />
			<Example1 />
			<InfoNote text="useRef stale clousre" />
			<CodeBlock code={EXAMPLE_2} />
			<Example2 someProp={"someProp"} />
			<InfoNote
				variant="info"
				text="memoization with useCallback and React.memo"
			>
				<Example3 />
				<CodeBlock code={EXAMPLE_3} />
			</InfoNote>
			<InfoNote
				variant="info"
				text="memoization with useCallback, useRef and React.memo"
			>
				<Example4 />
				<CodeBlock code={EXAMPLE_4} />
			</InfoNote>
		</>
	);
};
