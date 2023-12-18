import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./components/Example1";

const EXAMPLE_1 = `
type ClickableElementProps = {
	onClick: VoidFunction;
};

const Button = ({
	onClick,
	children,
}: PropsWithChildren<ClickableElementProps>) => {
	return (
		<button onClick={onClick} type="button">
			{children}
		</button>
	);
};

const ListItem = ({
	onClick,
	children,
}: PropsWithChildren<ClickableElementProps>) => {
	return (
		<li className="hover:cursor-pointer" onClick={onClick}>
			{children}
		</li>
	);
};

export const ButtonWithLogger = withLoggingOnClick(Button);
export const LiWithLogger = withLoggingOnClick(ListItem, {
	text: "LiWithLogger",
});

export const Example1 = () => {
	return (
		<div className="border py-8 px-4">
			<ButtonWithLogger componentName="Button" onClick={() => null}>
				Fancy button with logger
			</ButtonWithLogger>
			<ul>
				<li>Normal List Item</li>
				<LiWithLogger componentName="Li element" onClick={() => null}>
					Clickable List Item
				</LiWithLogger>
			</ul>
		</div>
	);
};

type Props = {
	onClick: VoidFunction;
	componentName?: string;
	children?: React.ReactNode;
};

export const withLoggingOnClick = (
	Component: (props: any) => JSX.Element,
	params?: {
		text: string;
	},
) => {
	return ({ componentName, ...props }: Props) => {
		const onClick = () => {
			console.log("Logged onClick for: ", componentName);
			console.log("Logged onClick params: ", params?.text);
			props.onClick();
		};
		return <Component {...props} onClick={onClick} />;
	};
};
`;

export const Chapter7 = () => {
	return (
		<>
			<InfoNote
				variant="info"
				text="Propably good use case for HOC will be situation when you need to add side action into some of you props"
			>
				<CodeBlock code={EXAMPLE_1} />
				<p>
					In above's example i created HOC for intercepting onClick, and logging
					information
				</p>
			</InfoNote>
			<Example1 />
		</>
	);
};
