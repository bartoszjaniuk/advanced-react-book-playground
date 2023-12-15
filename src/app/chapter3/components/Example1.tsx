import { IconProps } from "../../shared/models/iconProps.types";
import { getSize } from "../../shared/utils/getSize";
import { Button } from "./Button";

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
		<div className="border p-4 w-full h-80 flex flex-col gap-4">
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
