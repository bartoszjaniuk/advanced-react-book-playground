import { PropsWithChildren } from "react";
import "../css/styles.css";
import { Sidebar } from "./sidebar/Sidebar";
import { Container } from "./container/Container";

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<Container>{children}</Container>
		</div>
	);
};
