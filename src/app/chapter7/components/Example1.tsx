import { PropsWithChildren } from "react";
import { withLoggingOnClick } from "../hocs/withLoggingOnClick";

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
