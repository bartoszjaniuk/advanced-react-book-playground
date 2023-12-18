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
