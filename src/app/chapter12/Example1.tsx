import { useLayoutEffect, useRef, useState } from "react";

const Box = ({ number }: { number: string }) => {
	return <div className="border p-4">BOX: {number}</div>;
};

export const Example1 = () => {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const listener = () => {
			if (!ref.current) return;
			const { width } = ref.current.getBoundingClientRect();

			if (width <= 800) return setIsVisible(true);

			setIsVisible(false);
		};

		window.addEventListener("resize", listener);

		return () => {
			window.removeEventListener("resize", listener);
		};
	}, [ref]);

	return (
		<div className="flex gap-4 border border-blue-500 py-20" ref={ref}>
			<Box number="1" />
			<Box number="2" />
			{isVisible && <Box number="2.5" />}
			<Box number="3" />
			<Box number="4" />
		</div>
	);
};
