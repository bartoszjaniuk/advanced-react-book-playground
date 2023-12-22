import { useEffect, useRef, useState } from "react";

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
