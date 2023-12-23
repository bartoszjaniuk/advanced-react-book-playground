import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";

const DEBOUNCE_CONTROLLED_INPUT = `
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
`;

const DEBOUNCE_CUSTOM_HOOK = `
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
`;

const DEBOUNCE_WITH_REF = `
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

	const deboouncedCallback = useMemo(() => {
		const fn = () => {
			ref.current?.();
		};
		return debounce(fn, 1000);
	}, []);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
		deboouncedCallback();
	};

	return <input type="text" value={value} onChange={onChange} />;
};
`;

const DEBOUNCE_WITH_REF_AND_HOOK = `
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
`;

export const Chapter11 = () => {
	return (
		<div>
			<Example1 />
			<Example2 />
			<InfoNote
				variant="info"
				text="Debounce with controlled input and useMemo and useCallback"
			/>
			<CodeBlock code={DEBOUNCE_CONTROLLED_INPUT} />

			<InfoNote
				variant="info"
				text="Debounce with controlled input and custom hook"
			/>
			<CodeBlock code={DEBOUNCE_CUSTOM_HOOK} />

			<InfoNote variant="info" text="Debounce with controlled input ref" />
			<CodeBlock code={DEBOUNCE_WITH_REF} />

			<InfoNote
				variant="info"
				text="Debounce with controlled input, ref and custom hook"
			/>
			<CodeBlock code={DEBOUNCE_WITH_REF_AND_HOOK} />
		</div>
	);
};
