import { useState } from "react";

export const Example3 = () => {
	const [_, setState] = useState();

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
		<div className="border w-full flex gap-4 p-4">
			<p>Example 3</p>
			<button className="border  hover:cursor-pointer" onClick={onClick}>
				click me will cause error
			</button>
		</div>
	);
};
