import { useEffect, useState } from "react";

export const Example5 = () => {
	const [id, setId] = useState("");
	const handleClick = (id: string) => setId(id);
	return (
		<div className="flex gap-4">
			<nav className="border p-4">
				<ul>
					<li
						className="border p-4 bg-gray-300 hover:cursor-pointer"
						onClick={() => handleClick("1")}
					>
						Issue 1
					</li>
					<li
						className="border p-4 bg-gray-300 hover:cursor-pointer"
						onClick={() => handleClick("2")}
					>
						Issue 2
					</li>
				</ul>
			</nav>
			<Page id={id} />
		</div>
	);
};

const Page = ({ id }: { id: string }) => {
	const [data, setData] = useState<Issue>({} as Issue);
	const [loading, setLoading] = useState(false);
	const url = id === "1" ? URL_1 : URL_2;

	useEffect(() => {
		const controller = new AbortController();
		setLoading(true);
		fetch(url, { signal: controller.signal })
			.then((r) => r.json())
			.then((r) => {
				setData(r);
				console.log(r);

				setLoading(false);
			})
			.catch((error) => {
				// error because of AbortController
				if (error.name === "AbortError") {
					alert("AbortError");
				} else {
					// do something, it's a real error!
				}
			});
		return () => {
			//So, on every re-render, the request in progress will be cancelled,
			//and the new one will be the only one allowed to resolve and set state.
			// Aborting a request in progress will cause the promise to reject!!!
			controller.abort();
		};
	}, [url]);

	if (!data.id || loading)
		return <div className="border p-4">loading issue {id}...</div>;

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