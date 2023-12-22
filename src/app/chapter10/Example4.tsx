import React, { useCallback, useEffect, useRef, useState } from "react";

type HeavyComponentProps = {
	onClick: () => void;
	title: string;
};

export const Example4 = () => {
	const [value, setValue] = useState<string>();
	const ref = useRef<() => void>();

	useEffect(() => {
		ref.current = () => {
			console.log(value);
		};
	});

	const onClick = useCallback(() => {
		ref.current?.();
	}, []);

	return (
		<div className="App">
			<h1>Closures example</h1>

			<>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<HeavyComponentMemo title="Welcome closures" onClick={onClick} />
			</>
		</div>
	);
};

const HeavyComponent = ({ onClick, title }: HeavyComponentProps) => {
	return (
		<>
			<h3>{title}</h3>
			<p>Some other stuff here</p>
			<button className="button" onClick={onClick}>
				Done!
			</button>
		</>
	);
};

const HeavyComponentMemo = React.memo(HeavyComponent);
