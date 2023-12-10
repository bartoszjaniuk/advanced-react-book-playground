import { PropsWithChildren, useState } from "react";
import {
	AnotherSlowComponent,
	MovingBlock,
	VerySlowComponent,
	getPosition,
} from "./Example1";

const ScrollWithMovingBlock = ({ children }: PropsWithChildren) => {
	const [position, setPosition] = useState(300);

	const onScroll = (e: any) => {
		const calculated = getPosition(e.target.scrollTop);
		setPosition(calculated);
	};

	return (
		<div className="scrollable-block" onScroll={onScroll}>
			<MovingBlock position={position} />
			{children}
		</div>
	);
};

export const Solution1 = () => {
	return (
		<ScrollWithMovingBlock>
			<VerySlowComponent />
			<AnotherSlowComponent />
		</ScrollWithMovingBlock>
	);
};
