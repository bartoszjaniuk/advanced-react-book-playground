import { ReactElement, useState } from "react";
import { IconProps } from "../../../shared/models/iconProps.types";
import { IconParams } from "../Example1";

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
