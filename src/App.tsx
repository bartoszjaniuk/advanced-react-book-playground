import { Outlet } from "react-router-dom";
import { Layout } from "./layout/Layout";

export const App = () => {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};
