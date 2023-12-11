import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./components/Example1";

const PROBLEM_1 = `
const Button = ({ isLoading, iconLeftName, iconLeftColor, iconLeftSize, isIconLeftAvatar, ...
}) => {
  // no one knows what's happening here and how all those props work
return ...
}
`;

const SOLUTION_1 = `
const Button = ({ icon }) => {
    return <button>Submit {icon}</button>;
    };
    // default Loading icon
<Button icon={<Loading />} /> // red Error icon
<Button icon={<Error color="red" />} /> // yellow large Warning icon
<Button icon={<Warning color="yellow" size="large" />} />
// avatar instead of icon
<Button icon={<Avatar />} />
`;

const PROBLEM_2 = `
// primary button should have white icons
<Button appearance="primary" icon={<Loading color="white" />} /> // secondary button should have black icons
<Button appearance="secondary" icon={<Loading color="black" />} />
// large button should have large icons
<Button size="large" icon={<Loading size="large" />} />
`;

const SOLUTION_2 = `
import { Button } from "./Button";

type IconProps = {
	color?: string;
	size?: "large" | "medium" | "small";
};
const getSize = (size: "large" | "medium" | "small" | undefined) => {
	if (!size) return "1rem";
	if (size === "large") return "2rem";
	if (size === "medium") return "1.5rem";
};

const BrocoliIcon = ({ color, size }: IconProps) => {
	const fontSize = getSize(size);

	return (
		<span className="w-3 h-3" style={{ backgroundColor: color, fontSize }}>
			ICON🥦
		</span>
	);
};

export const Example1 = () => {
	return (
		<div className="border p-4 w-full h-80">
			<Button appearance="primary" size="large" icon={<BrocoliIcon />} />
			<Button appearance="secondary" size="medium" icon={<BrocoliIcon />} />
			{/* DEFAULT PROPS OVVERIDE */}
			<Button
				appearance="secondary"
				size="medium"
				icon={<BrocoliIcon size="small" color="red" />}
			/>
		</div>
	);
};

type ButtonProps = {
	appearance: "primary" | "secondary";
	size: "large" | "medium";
	icon: ReactElement;
};

export const Button = ({
	icon,
	size = "medium",
	appearance = "primary",
}: ButtonProps) => {
	// create default props for icon
	const defaultIconProps = {
		size: size === "large" ? "large" : "medium",
		color: appearance === "primary" ? "purple" : "green",
	};

	const newProps = {
		...defaultIconProps,
		// make sure that props that are coming from the icon override
		// default if they exist
		...icon.props,
	};

	const clonedIcon = React.cloneElement(icon, newProps);

	return <button> {clonedIcon}</button>;
};

`;

export const Chapter3 = () => {
	return (
		<>
			<InfoNote
				variant="info"
				text="Chapter 3. Configuration concerns with elements as props"
			/>
			<InfoNote
				variant="info"
				text="Problem: Component with many (sometimes too many) configuration props"
			/>
			<InfoNote>
				<ul className="list-disc">
					<li>
						How elements as props can drastically improve configuration concerns
						for such components.
					</li>
					<li>
						How conditional rendering of components influences performance.
					</li>
					<li>When a component passed as props is rendered exactly.</li>
					<li>
						How to set default props for components passed as props by using the
						cloneElement function, and what the downsides of that are.
					</li>
				</ul>
			</InfoNote>
			<CodeBlock code={PROBLEM_1} />
			<InfoNote text="Possible solution, pass element as prop" />
			<CodeBlock code={SOLUTION_1} />
			<InfoNote text="Essentially, an element as a prop for a component is a way to tell the consumer: give me whatever you want, I don't know or care what it is, I am just responsible for putting it in the right place. The rest is up to you." />
			<InfoNote
				variant="warning"
				text="Solution for configuration props can be also problematic due to too many flexibility. For eg. dev would need remember all it's configuration props "
			/>
			<InfoNote text="Solution: Default values for the elements from props" />
			<CodeBlock code={PROBLEM_2} />
			<Example1 />
			<CodeBlock code={SOLUTION_2} />
		</>
	);
};
