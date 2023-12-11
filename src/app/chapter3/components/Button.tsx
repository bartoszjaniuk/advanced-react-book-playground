import React, { ReactElement } from "react";

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

	return <button className="w-fit"> Button with {clonedIcon}</button>;
};
