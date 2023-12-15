import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./components/Example1";

const PROBLEM_1 = `
const Button = ({ ... }) => {
    const [isHovered, setIsHovered] = useState();
    return <button onMouseOver={() => setIsHovered(true)} /> }
    // how to pass state into icon?
`;

const SOLUTION_1 = `
type ButtonProps = {
	appearance?: "primary" | "secondary";
	size?: "large" | "medium";
	renderIcon: (props: IconParams) => ReactElement;
};

export const Button = ({
	renderIcon,
	size = "medium",
	appearance = "primary",
}: ButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);
	// create default props for icon
	const defaultIconProps: IconProps = {
		size: size === "large" ? "large" : "medium",
		color: appearance === "primary" ? "purple" : "green",
	};
	return (
		<button
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			className="w-fit"
		>
			Button with{" "}
			{renderIcon({ iconProps: defaultIconProps, state: { isHovered } })}
		</button>
	);
};

export type IconParams = {
	iconProps: IconProps;
	state?: IconState;
};

const RocketIcon = ({ iconProps, state }: IconParams) => {
	const { size, color } = iconProps;
	const fontSize = getSize(size);

	return (
		<span
			className={w-3 h-3 $ {state?.isHovered ? "hover:bg-lime-200" : ""}}
			style={{ backgroundColor: color, fontSize }}
		>
			🚀
		</span>
	);
};

export const Example1 = () => {
	return (
		<div className="border p-4 w-full h-80 flex flex-col gap-4">
			<Button
				appearance="primary"
				size="large"
				renderIcon={(props) => <RocketIcon {...props} />}
			/>
			<Button
				appearance="secondary"
				size="medium"
				renderIcon={({ state }) =>
					state?.isHovered ? <div>Hovered</div> : <div>Not hovered</div>
				}
			/>
			{/* DEFAULT PROPS OVVERIDE */}
			<Button
				size="medium"
				renderIcon={(props) => (
					<RocketIcon {...props} iconProps={{ size: "small" }} />
				)}
			/>
		</div>
	);
};
`;

const SOLUTION_2 = `
const ScrollDetector = ({ children }) => { 
	const [scroll, setScroll] = useState();
	return ( 
	<div
	onScroll={(e) => setScroll(e.currentTarget.scrollTop)} >
	{children(scroll)}
	</div> 
	);
};
const Layout = () => { return (
    <ScrollDetector>
      {(scroll) => {
        return <>{scroll > 30 ? <SomeBlock /> : null}</>;
      }}
    </ScrollDetector>
  );
};
`;

export const Chapter4 = () => {
	return (
		<>
			<InfoNote
				variant="info"
				text="Problem: While previous approach with button works pretty well for simple cases, 
                it is not that good for something more complicated. 
                What if I want to introduce some state to the Button and give 
                Button 's consumers access to that state? 
                Like adjusting the icon while the button is hovered, for example? 
                It's easy enough to implement that state in the button"
			/>
			<CodeBlock code={PROBLEM_1} />
			<Example1 />
			<InfoNote text="Solution: instead of passing component as ReactElement, i can pass it as function which returns react element. Inside that function i can pass props. That's possible solution." />
			<InfoNote
				variant="warning"
				text="Wih render props pattern is possible to share state, but in nowadays custom hooks replaced render props pattern"
			/>
			<CodeBlock code={SOLUTION_1} />

			<InfoNote variant="info">
				<h5>So why learn this pattern at all?</h5>
				<ul className="list-disc pl-4">
					<li>
						Render props for configuration and flexibility use cases, described
						at the beginning, are still very viable. If you are working on a
						project that is a few years old, this pattern will be all over the
						codebase.
					</li>
					<li>
						It was really popular before the introduction of hooks, especially
						for encapsulating form validation logic. A few popular libraries
						still use it to this day.
					</li>
					<li>
						It can still be useful for specific scenarios, such as when the
						logic and state that you want to share depend on a DOM element.
					</li>
				</ul>
			</InfoNote>

			<InfoNote
				variant="info"
				text="Propably good use case could be for follow a DOM element interaction"
			/>
			<CodeBlock code={SOLUTION_2} />
			<InfoNote text="In above's example we can make use of render props for dedecting scroll. We could make it with customHooks aswell but, for that we would need use ref" />
		</>
	);
};
