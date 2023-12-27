import { useEffect, useState } from "react";

type IdType = "issue" | "about";

export const Example2 = () => {
	const [id, setId] = useState<IdType | "">("");
	const handleClick = (id: IdType) => setId(id);
	return (
		<div className="flex gap-4">
			<nav className="border p-4">
				<ul>
					<li
						className="border p-4 bg-gray-300 hover:cursor-pointer"
						onClick={() => handleClick("issue")}
					>
						Issue 1
					</li>
					<li
						className="border p-4 bg-gray-300 hover:cursor-pointer"
						onClick={() => handleClick("about")}
					>
						Issue 2
					</li>
				</ul>
			</nav>
			{id === "issue" && <Issue />}
			{id === "about" && <About />}
		</div>
	);
};

const useFetchData = (url: string) => {
	const [data, setData] = useState<Issue>({} as Issue);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((r) => r.json())
			.then((r) => {
				setData(r);
				console.log(r);
				setLoading(false);
			});
	}, [url]);

	return {
		isLoading: loading,
		data,
	};
};

const Issue = () => {
	const { data, isLoading } = useFetchData(URL_1);

	if (!data.id || isLoading)
		return <div className="border p-4">loading issue 1...</div>;

	return (
		<div className="border p-4">
			<h1>My issue number {data.id}</h1>
			<h2>{data.title}</h2>
			<p>{data.description}</p>
		</div>
	);
};

const About = () => {
	const { data, isLoading } = useFetchData(URL_2);

	if (!data.id || isLoading)
		return <div className="border p-4">loading issue 2...</div>;

	return (
		<div className="border p-4">
			<h1>My issue number {data.id}</h1>
			<h2>{data.title}</h2>
			<p>{data.description}</p>
		</div>
	);
};

const URL_1 =
	"https://run.mocky.io/v3/c67bcb3a-81e7-4684-bee9-13d55481b5cc?mocky-delay=2000ms";
const URL_2 =
	"https://run.mocky.io/v3/89addf69-b25f-44e5-9ae9-0ddb4d9f0103?mocky-delay=2000ms";

type Issue = {
	id: string;
	title: string;
	description: string;
	author: string;
};
