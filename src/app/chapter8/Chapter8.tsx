import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";

const EXAMPLE_1 = `
export const useStateContext = () => {
	const context = useContext(StateContext);
	if (context === undefined) {
		throw new Error(
			"StateContext is unavailable, make sure you are using FirstContextProvider",
		);
	}
	return context;
};

export const useActionContext = () => {
	const context = useContext(ActionContext);
	if (context === undefined) {
		throw new Error(
			"ActionContext is unavailable, make sure you are using FirstContextProvider",
		);
	}
	return context;
};

export type StateProps = {
	isOpen: boolean;
};

export type ActionProps = {
	open: VoidFunction;
	close: VoidFunction;
};

export const StateContext = createContext<StateProps | undefined>(undefined);
export const ActionContext = createContext<ActionProps | undefined>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const actionValue = useMemo(() => ({ open, close }), [open, close]);
	const stateValue = useMemo(() => ({ isOpen }), [isOpen]);

	return (
		<StateContext.Provider value={stateValue}>
			<ActionContext.Provider value={actionValue}>
				{children}
			</ActionContext.Provider>
		</StateContext.Provider>
	);
};

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<main className="flex gap-4">
			<AppContextProvider>{children}</AppContextProvider>
		</main>
	);
};

const Sidebar = () => {
	const { isOpen } = useStateContext();
	const { close, open } = useActionContext();
	const handleClick = () => {
		if (!isOpen) return open();
		return close();
	};
	return (
		<div
			className={border h-full border-blue-500 bg-gray-400 {
				isOpen ? "w-60" : "w-20"
			}}
		>
			<button onClick={handleClick}>{isOpen ? "Close" : "Open"}</button>
		</div>
	);
};

const MainPart = () => {
	return (
		<div className="h-full border border-purple-500 bg-gray-400">Main Part</div>
	);
};

export const Example1 = () => {
	return (
		<Layout>
			<Sidebar />
			<MainPart />
		</Layout>
	);
};
`;

const EXAMPLE_2 = `
type State = { isOpen: boolean };
const defaultState: State = { isOpen: false };
const ContextData = React.createContext(defaultState);
const ContextApi = React.createContext({
	open: () => {},
	close: () => {},
	toggle: () => {},
});

type Action = { type: "open-sidebar" | "close-sidebar" | "toggle-sidebar" };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "open-sidebar":
			return { ...state, isOpen: true };
		case "close-sidebar":
			return { ...state, isOpen: false };
		case "toggle-sidebar":
			return { ...state, isOpen: !state.isOpen };
	}
	return state;
};

const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, defaultState);

	// that one has a dependency on state
	const data = useMemo(() => ({ isOpen: state.isOpen }), [state]);

	// that one never changes - no dependencies
	const actions = useMemo(() => {
		return {
			open: () => dispatch({ type: "open-sidebar" }),
			close: () => dispatch({ type: "close-sidebar" }),
			toggle: () => dispatch({ type: "toggle-sidebar" }),
		};
		// don't depend on the state directly anymore!
	}, []);

	return (
		<ContextData.Provider value={data}>
			<ContextApi.Provider value={actions}>{children}</ContextApi.Provider>
		</ContextData.Provider>
	);
};

const useStateContext = () => useContext(ContextData);
const useActionContext = () => useContext(ContextApi);

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<main className="flex gap-4">
			<AppContextProvider>{children}</AppContextProvider>
		</main>
	);
};

const Sidebar = () => {
	const { isOpen } = useStateContext();
	const { close, open } = useActionContext();
	const handleClick = () => {
		if (!isOpen) return open();
		return close();
	};
	return (
		<div
			className={border h-full border-blue-500 bg-gray-400 {
				isOpen ? "w-60" : "w-20"
			}}
		>
			<button onClick={handleClick}>{isOpen ? "Close" : "Open"}</button>
		</div>
	);
};

const MainPart = () => {
	return (
		<div className="h-full border border-purple-500 bg-gray-400">Main Part</div>
	);
};

export const Example2 = () => {
	return (
		<Layout>
			<Sidebar />
			<MainPart />
		</Layout>
	);
};`;

const EXAMPLE_3 = `
const withNavigationOpen = (AnyComponent: any) => {
	// wrap the component from the arguments in React.memo here
	const AnyComponentMemo = React.memo(AnyComponent);
	return (props: any) => {
		const { open } = useContext(Context);
		// return memoized component here
		// now it won't re-render because of Context changes
		// make sure that whatever is passed as props here don't change between re-renders!
		return <AnyComponentMemo {...props} openNav={open} />;
	};
};
`;

export const Chapter8 = () => {
	return (
		<>
			<InfoNote variant="info" text="Context: split to prevent re-renders">
				<Example1 />
				<CodeBlock code={EXAMPLE_1} />
			</InfoNote>
			<InfoNote variant="info" text="Context: split with useReducer">
				<Example2 />
				<CodeBlock code={EXAMPLE_2} />
			</InfoNote>
			<InfoNote text="HOC selector">
				<CodeBlock code={EXAMPLE_3} />
			</InfoNote>
		</>
	);
};
