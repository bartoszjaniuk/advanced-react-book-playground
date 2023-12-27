import { Outlet } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { AppWithErrorBoundary } from "./app/chapter16/AppWithErrorBoundary";

export const App = () => {
	return (
		<AppWithErrorBoundary>
			<Layout>
				<Outlet />
			</Layout>
		</AppWithErrorBoundary>
	);
};
