import {
	ChangeEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import debounce from "lodash/debounce";
import { Card } from "./Example1";

export const Example2 = () => {
	return (
		<div className="py-16 flex gap-4 ">
			<Card title="debounce with useMemo and useCallback">
				<DebouncedControlledInput />
			</Card>
			<Card title="debounce with useDebounce">
				<DebouncedControlledInputWithCustomHook />
			</Card>

			<Card title="debounce with ref">
				<DebouncedInputWithRef />
			</Card>

			<Card title="debounce with ref and custom hook">
				<DebouncedInputWithRefAndCustomHook />
			</Card>
		</div>
	);
};

const DebouncedInputWithRef = () => {
	const [value, setValue] = useState("");

	useEffect(() => {
		console.log("DebouncedInputWithRef");
	}, []);

	const apiCall = () => {
		console.log("Api call: ", value);
	};

	// initialize ref with debounced backend call
	const ref = useRef(apiCall);

	useEffect(() => {
		ref.current = apiCall;
	}, [value]);

	const debounced = useMemo(() => {
		const fn = () => {
			ref.current?.();
		};
		return debounce(fn, 1000);
	}, []);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
		debounced();
	};

	return <input type="text" value={value} onChange={onChange} />;
};

const DebouncedInputWithRefAndCustomHook = () => {
	const [value, setValue] = useState("");

	const apiCall = () => {
		if (!value) return;
		console.log("Api call: ", value);
	};

	const debouncedRequest = useDebounceRef(apiCall);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
		debouncedRequest();
	};

	return <input type="text" value={value} onChange={onChange} />;
};

const useDebounceRef = (callback: VoidFunction, duration = 1000) => {
	const ref = useRef<any>();

	useEffect(() => {
		// updating ref when state changes
		ref.current = callback;
	}, [callback]);

	// creating debounced callback only once - on mount
	const debouncedCallback = useMemo(() => {
		// fn will be created only one - on mount
		const fn = () => {
			// ref is mutable, ref.current is a reference to the latest apiCall
			ref.current?.();
		};
		// debounce the fn that was created one, but has access to the latest apiCall
		return debounce(fn, duration);
		// it has no dependencies, no its never get updated
	}, []);

	return debouncedCallback;
};

const DebouncedControlledInput = () => {
	const [value, setValue] = useState("");

	const callApi = useCallback((searchTerm: string) => {
		console.log("ApiCall: ", searchTerm);
	}, []);

	const debouncedApiCall = useMemo(() => debounce(callApi, 1000), [callApi]);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value;
		setValue(value);
		debouncedApiCall(value);
	};

	useEffect(() => {
		console.log("DebouncedControlledInput");
	}, []);

	return <input type="text" value={value} onChange={onChange} />;
};

const DebouncedControlledInputWithCustomHook = () => {
	const [value, setValue] = useState("");
	const debouncedSearchValue = useDebounce(value, 1000);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
		console.log("onChange");
		console.log({ debouncedSearchValue });
	};

	useEffect(() => {
		console.log("DebouncedControlledInputWithCustomHook");
	}, []);

	return (
		<div>
			<p>Value: {value}</p>
			<p>Debounced: {debouncedSearchValue}</p>
			<input type="text" value={value} onChange={onChange} />
		</div>
	);
};

const useDebounce = (value: string, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const id = setTimeout(() => {
			console.log("Setting new timeout");
			setDebouncedValue(value);
		}, delay);

		return () => {
			console.log("Clear timeout");
			clearTimeout(id);
		};
	}, [value, delay]);
	return debouncedValue;
};
