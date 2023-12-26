import { Example1 } from "./Example1";
import { Example2 } from "./example2/Example2";

export const Chapter14 = () => {
	return (
		<div className="flex flex-col gap-4">
			<Example1 />
			<Example2 />
		</div>
	);
};
