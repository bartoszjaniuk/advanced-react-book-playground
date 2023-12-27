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
