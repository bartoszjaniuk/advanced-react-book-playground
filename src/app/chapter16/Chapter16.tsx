import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";
import { Example3 } from "./Example3";
import { Example4 } from "./Example4";

const ERROR_BOUNDARY = `
import { PropsWithChildren } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre style={{ color: "red" }}>{error.message}</pre>
			<button
				className="border hover:cursor-pointer"
				onClick={resetErrorBoundary}
			>
				Reset error boundary
			</button>
		</div>
	);
};

export const AppWithErrorBoundary = ({ children }: PropsWithChildren) => {
	return (
		<ErrorBoundary FallbackComponent={FallbackComponent}>
			{children}
		</ErrorBoundary>
	);
};

`;

const EXAMPLE_1 = `
export const Example1 = () => {
	// useEffect(() => {
	// this one will be caught by ErrorBoundary component
	// throw new Error("Destroy everything!");
	// }, []);
	const onClick = () => {
		// this error will just disappear into the void throw new Error('Hulk smash!');
	};
	useEffect(() => {
		// if this one fails, the error will also disappear fetch('/bla');
	}, []);
	return (
		<div className="w-full border p-4 flex gap-4">
			<p>Example1</p>{" "}
			<button className="border" onClick={onClick}>
				Clicking will not cause error
			</button>
		</div>
	);
};
`;

const EXAMPLE_2 = `
export const Example2 = () => {
	const [hasError, setHasError] = useState(false);
	// most of the errors in this component and in children will be
	// caught by the ErrorBoundary
	const onClick = () => {
		try {
			// this error will be caught by catch
			throw new Error("Hulk smash!");
		} catch (e) {
			setHasError(true);
		}
	};
	if (hasError) return "something went wrong";
	return <button onClick={onClick}>click me</button>;
`;

const EXAMPLE_3 = `
import { useState } from "react";

export const Example3 = () => {
	const [state, setState] = useState();

	const onClick = () => {
		try {
			throw new Error("break things");
		} catch (e) {
			console.log("here!");
			setState(() => {
				throw e;
			});
		}
	};

	return (
		<button className="button" onClick={onClick}>
			click me to cause an error
		</button>
	);
};

`;

const EXAMPLE_4 = `
import { useState } from "react";

export const Example4 = () => {
	const throwAsyncError = useThrowAsyncError();

	const onClick = () => {
		try {
			throw new Error("break things");
		} catch (e) {
			throwAsyncError(e);
		}
	};

	return (
		<div className="border w-full flex gap-4 p-4">
			<p>Example 4</p>
			<button className="border  hover:cursor-pointer" onClick={onClick}>
				click me will cause error
			</button>
		</div>
	);
};

const useThrowAsyncError = () => {
	const [_, setState] = useState(null);

	return (error: any) =>
		setState(() => {
			throw error;
		});
};

`;

export const Chapter16 = () => {
	return (
		<div>
			<InfoNote variant="info" text="Implementation of ErrorBoundary" />
			<CodeBlock code={ERROR_BOUNDARY} />

			<InfoNote
				variant="info"
				text="Error boundaries only catch errors that happen during the React lifecycle."
			/>
			<InfoNote
				variant="warning"
				text="Things that happen outside of it, like resolved promises, async code with setTimeout , various callbacks, and event handlers, will disappear if not dealt with explicitly."
			/>
			<CodeBlock code={EXAMPLE_1} />
			<Example1 />
			<CodeBlock code={EXAMPLE_2} />
			<Example2 />
			<CodeBlock code={EXAMPLE_3} />
			<Example3 />
			<CodeBlock code={EXAMPLE_4} />
			<Example4 />
		</div>
	);
};
