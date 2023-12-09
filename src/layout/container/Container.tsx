import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
	return <div className="min-h-full w-full p-4">{children}</div>;
};
