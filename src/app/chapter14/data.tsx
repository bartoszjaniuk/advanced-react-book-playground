import { useState, useEffect } from "react";

export const issueUrl =
	"https://run.mocky.io/v3/3ea256b9-fd6c-47ce-9a27-fa3567584967?mocky-delay=2000ms";

export type IssueType = {
	id: string;
	description: string;
	author: string;
};

export const sidebarUrl =
	"https://run.mocky.io/v3/d6155d63-938f-484c-8d87-6f918f126cd4?mocky-delay=1000ms";

export type SidebarType = {
	id: string;
	name: string;
};

export const commentsUrl =
	"https://run.mocky.io/v3/c05e0cd6-d1d6-481d-a0f3-49ce02d4d99b?mocky-delay=3000ms";

export type CommentType = {
	id: string;
	comment: string;
};

export const useData = <T extends unknown>(url: string) => {
	const [state, setState] = useState<T>();

	useEffect(() => {
		const dataFetch = async () => {
			const data = await (await fetch(url)).json();

			setState(data);
		};

		dataFetch();
	}, [url]);

	return { data: state };
};
