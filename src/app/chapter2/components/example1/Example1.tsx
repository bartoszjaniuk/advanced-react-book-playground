import { useState } from "react";
import "./styles.css";

export const VerySlowComponent = () => <div>Very slow component</div>;
export const AnotherSlowComponent = () => <div>Another slow component</div>;
export const MovingBlock = ({ position }: { position: number }) => (
	<div className="movable-block" style={{ top: position }}>
		Moving bock {position}
	</div>
);

export const getPosition = (val: number) => 150 - val / 2;

export const Example1 = () => {
	const [position, setPosition] = useState(300);

	const onScroll = (e: any) => {
		const calculated = getPosition(e.target.scrollTop);
		setPosition(calculated);
	};

	return (
		<div className="scrollable-block" onScroll={onScroll}>
			<MovingBlock position={position} />
			<VerySlowComponent />
			<AnotherSlowComponent />
		</div>
	);
};
