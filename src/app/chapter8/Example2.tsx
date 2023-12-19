import React, {
	PropsWithChildren,
	ReactNode,
	useContext,
	useMemo,
	useReducer,
} from "react";

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
			<h1>Context splited into two parts</h1>
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
			className={`border h-full border-blue-500 bg-gray-400 ${
				isOpen ? "w-60" : "w-20"
			}`}
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
};
