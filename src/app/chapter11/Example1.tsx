import { ChangeEventHandler, PropsWithChildren } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

export const Example1 = () => {
	return (
		<div className="py-16 flex gap-8">
			<Card title="onChange on every key stroke">
				<NormalInput />
			</Card>

			<Card title="onChange debounce">
				<DebouncedInput />
			</Card>

			<Card title="onChange throttle">
				<ThrottledInput />
			</Card>
		</div>
	);
};

type CardProps = {
	title: string;
};

export const Card = ({ title, children }: PropsWithChildren<CardProps>) => {
	return (
		<div className="border p-4 flex flex-col gap-4">
			<h1>{title}</h1>
			{children}
		</div>
	);
};

const NormalInput = () => {
	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log("NormalInput: ", e.target.value);
	};
	return <input type="text" onChange={onChange} />;
};

const DebouncedInput = () => {
	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log("DebouncedInput: ", e.target.value);
	};
	const debouncedOnChange = debounce(onChange, 1000);
	return <input type="text" onChange={debouncedOnChange} />;
};

const ThrottledInput = () => {
	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log("ThrottledInput: ", e.target.value);
	};
	const debouncedOnChange = throttle(onChange, 1000);
	return <input type="text" onChange={debouncedOnChange} />;
};
