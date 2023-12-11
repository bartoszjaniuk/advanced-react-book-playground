import { createBrowserRouter } from "react-router-dom";
import { App } from "../../App";
import { Chapter1 } from "../../app/chapter1/Chapter1";
import { Chapter2 } from "../../app/chapter2/Chapter2";
import { Chapter3 } from "../../app/chapter3/Chapter3";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/chapter-1", element: <Chapter1 /> },
			{ path: "/chapter-2", element: <Chapter2 /> },
			{ path: "/chapter-3", element: <Chapter3 /> },
			{ path: "/chapter-4", element: <Chapter1 /> },
			{ path: "/chapter-5", element: <Chapter1 /> },
			{ path: "/chapter-6", element: <Chapter1 /> },
			{ path: "/chapter-7", element: <Chapter1 /> },
			{ path: "/chapter-8", element: <Chapter1 /> },
			{ path: "/chapter-9", element: <Chapter1 /> },
		],
	},
]);
