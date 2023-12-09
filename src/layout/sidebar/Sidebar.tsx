import { Link } from "react-router-dom";
import { AppRoutes, ChapterRoutes } from "./enums/appRoutes.enum";

export const Sidebar = () => {
	return (
		<nav className="min-h-full w-52 bg-white p-4">
			<Link to={AppRoutes.HOME}>
				<div className="flex flex-col items-center border-b pb-4">
					<h1 className="text-lg">Advanced React</h1>
					<p className="text-blue-500">Playground</p>
				</div>
			</Link>

			<ul className="list-disc pl-4 text-blue-400">
				{Object.values(ChapterRoutes).map((route, index) => (
					<li key={index} className="underline text-black py-1">
						<Link to={route}>Chapter {index + 1}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
