import { createBrowserRouter } from "react-router-dom";
import { App } from "../../App";
import { Chapter1 } from "../../app/chapter1/Chapter1";
import { Chapter2 } from "../../app/chapter2/Chapter2";
import { Chapter3 } from "../../app/chapter3/Chapter3";
import { Chapter4 } from "../../app/chapter4/Chapter4";
import { Chapter5 } from "../../app/chapter5/Chapter5";
import { Chapter6 } from "../../app/chapter6/Chapter6";
import { Chapter7 } from "../../app/chapter7/Chapter7";
import { Chapter8 } from "../../app/chapter8/Chapter8";
import { Chapter9 } from "../../app/chapter9/Chapter9";
import { Chapter10 } from "../../app/chapter10/Chapter10";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/chapter-1", element: <Chapter1 /> },
			{ path: "/chapter-2", element: <Chapter2 /> },
			{ path: "/chapter-3", element: <Chapter3 /> },
			{ path: "/chapter-4", element: <Chapter4 /> },
			{ path: "/chapter-5", element: <Chapter5 /> },
			{ path: "/chapter-6", element: <Chapter6 /> },
			{ path: "/chapter-7", element: <Chapter7 /> },
			{ path: "/chapter-8", element: <Chapter8 /> },
			{ path: "/chapter-9", element: <Chapter9 /> },
			{ path: "/chapter-10", element: <Chapter10 /> },
		],
	},
]);
