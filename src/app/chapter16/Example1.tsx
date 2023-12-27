import { useEffect } from "react";

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
