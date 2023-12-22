import React, { useCallback, useEffect, useState } from "react";

type HeavyComponentProps = {
	onClick: () => void;
	title: string;
};

const HeavyComponent = ({ onClick, title }: HeavyComponentProps) => {
	useEffect(() => {
		console.log("HeavyComponent");
	}, []);
	return (
		<>
			<h3>{title}</h3>
			<p>Some other stuff here</p>
			<button className="button" type="button" onClick={onClick}>
				Done!
			</button>
		</>
	);
};

const HeavyComponentMemo = React.memo(HeavyComponent);

export const Example3 = () => {
	useEffect(() => {
		console.log("Example3");
	}, []);

	const [value, setValue] = useState<string>();

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
		},
		[value],
	);

	const onClick = useCallback(() => {
		console.log("onClick", value);
	}, [value]);

	return (
		<div>
			<h1>Correct memoization with useCallback</h1>
			<p>Value: {value}</p>
			<input type="text" value={value} onChange={onChange} />
			<HeavyComponentMemo title="Heavy Component" onClick={onClick} />
		</div>
	);
};
