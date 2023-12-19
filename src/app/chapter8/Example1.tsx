import { PropsWithChildren, useCallback, useMemo, useState } from "react";

import { createContext } from "react";
import { useContext } from "react";

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

export const Example1 = () => {
	return (
		<Layout>
			<Sidebar />
			<MainPart />
		</Layout>
	);
};
