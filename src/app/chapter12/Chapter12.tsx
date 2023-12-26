import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";

const EXAMPLE_1 = `
const app = document.getElementById('app'); const child = document.createElement('div'); child.innerHTML = '<h1>Heyo!</h1>'; app.appendChild(child);
child.style = 'border: 10px solid red';
child.style = 'border: 20px solid green';
child.style = 'border: 30px solid blue';
// In vanilla JS it it treated as one task, and every single line is triggered one after another
// and only then draw last line
// sync code, not async
`;

const EXAMPLE_2 = `
setTimeout(() => {
	child.style = 'border: 10px solid red'; wait(1000);
	setTimeout(() => {
	child.style = 'border: 20px solid green'; wait(1000);
	setTimeout(() => {
		  child.style = 'border: 30px solid black';
	wait(1000); }, 0);
	}, 0); }, 0);
	// THIS IS HOW REACT WORKS
`;

const EXAMPLE_3 = `
	// useLayoutEffect is something that React runs synchronously during component updates. 
	// In this code:

	const Component = () => { 
		useLayoutEffect(() => {
		// do something
		})
		return ...
	}
	// Whatever we render inside the Component will be run with useLayoutEffect as the same "task". 
	// React guarantees this. Even if we update state inside useLayoutEffect , which we usually think of
	// as an asynchronous task, React will still make sure that the entire flow is run synchronously.
`;

export const Chapter12 = () => {
	return (
		<div>
			<Example1 />
			<InfoNote variant="info" text="rendering, painting, and browsers" />
			<CodeBlock code={EXAMPLE_1} />
			<InfoNote
				variant="info"
				text=" The way to break a giant task like rendering an entire app into smaller ones is by using various asynchronous methods: callbacks, event handlers, promises, and so on."
			/>
			<CodeBlock code={EXAMPLE_2} />
			<InfoNote text="useEffect vs useLayoutEffect" />
			<CodeBlock code={EXAMPLE_3} />
		</div>
	);
};
