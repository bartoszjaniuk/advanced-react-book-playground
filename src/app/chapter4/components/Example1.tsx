import { IconProps, IconState } from "../../shared/models/iconProps.types";
import { getSize } from "../../shared/utils/getSize";
import { Button } from "./button/Button";

export type IconParams = {
	iconProps: IconProps;
	state?: IconState;
};

const RocketIcon = ({ iconProps, state }: IconParams) => {
	const { size, color } = iconProps;
	const fontSize = getSize(size);

	return (
		<span
			className={`w-3 h-3 ${state?.isHovered ? "hover:bg-lime-200" : ""}`}
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
