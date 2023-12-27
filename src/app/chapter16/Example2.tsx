import { useState } from "react";

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
	return (
		<div className="border w-full flex gap-4 p-4">
			<p>Example 2</p>
			<button className="border  hover:cursor-pointer" onClick={onClick}>
				click me
			</button>
		</div>
	);
};
