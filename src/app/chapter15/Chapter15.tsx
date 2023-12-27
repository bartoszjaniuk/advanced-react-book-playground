import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";
import { Example3 } from "./Example3";
import { Example4 } from "./Example4";
import { Example5 } from "./Example5";

const PROBLEM_1 = `
export const Example1 = () => {
	const [id, setId] = useState(0);
	const handleClick = (id: number) => setId(id);
	return (
		<div className="flex gap-4">
			<nav className="border p-4">
				<ul>
					<li
						className="border p-4 bg-gray-300 hover:cursor-pointer"
						onClick={() => handleClick(1)}
					>
						Issue 1
					</li>
					<li
						className="border p-4 bg-gray-300 hover:cursor-pointer"
						onClick={() => handleClick(2)}
					>
						Issue 2
					</li>
				</ul>
			</nav>
			<Page id={id} />
		</div>
	);
};

const Page = ({ id }: { id: number }) => {
	const [data, setData] = useState<Issue>({} as Issue);
	const [loading, setLoading] = useState(false);
	const url = id === 1 ? URL_1 : URL_2;

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

	if (!data.id || loading) return <div className="border p-4">loading issue {id}...</div>;

	return (
		<div className="border p-4">
			<h1>My issue number {data.id}</h1>
			<h2>{data.title}</h2>
			<p>{data.description}</p>
		</div>
	);
};
`;

const PROBLEM_2 = `

// COMPONENTS ARE NOT RE-RENDERED
// COMPONENTS ARE MOUNTED AND UN-MOUNTED

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
`;

const PROBLEM_3 = `
const Page = ({ id }: { id: string }) => {
	const [data, setData] = useState<Issue>({} as Issue);
	const [loading, setLoading] = useState(false);
	const url = id === "1" ? URL_1 : URL_2;

	const ref = useRef(id);

	useEffect(() => {
		// update ref value with the latest url
		ref.current = url;

		setLoading(true);
		fetch(url).then((result) => {
			// compare the latest url with the result's url
			// only update state if the result actually belongs to that url
			if (result.url === ref.current) {
				result.json().then((r) => {
					setData(r);
					console.log(r);
				});
			}

			setLoading(false);
		});
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
`;

const PROBLEM_4 = `
const Page = ({ id }: { id: string }) => {
	const [data, setData] = useState<Issue>({} as Issue);
	const [loading, setLoading] = useState(false);
	const url = id === "1" ? URL_1 : URL_2;

	useEffect(() => {
		let active = true;
		setLoading(true);
		fetch(url)
			.then((r) => r.json())
			.then((r) => {
                // if the clouse is active - update the state
				if{active} {
                    setData(r);
                }
				setLoading(false);
			});
		return () => {
            // // set this closure to not active before next re-render
			active = false;
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
`;

const PROBLEM_5 = `
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
`;

export const Chapter15 = () => {
	return (
		<div>
			<InfoNote variant="warning" text="Promises and race conditions ⬇️" />
			<Example1 />
			<CodeBlock code={PROBLEM_1} />
			<InfoNote variant="info">
				<div>
					<h1 className="text-xl"> Race condition reasons:</h1>
					<p className="pl-4">
						- promise, an asynchronous operation. It sends the actual request,
						and then React just moves on with its life without waiting for the
						result.
					</p>
					<p className="pl-4">
						- async is out of normal thread, js continue executing next code
					</p>

					<p className="pl-4">
						- it can be triggered up to 6 requests in one race
					</p>
				</div>
			</InfoNote>
			<InfoNote text="Possible solution #1: Different Strategy" />
			<Example2 />
			<CodeBlock code={PROBLEM_2} />
			<InfoNote text="Possible solution #2: useRef and drop incorrect result" />
			<Example3 />
			<CodeBlock code={PROBLEM_3} />
			<InfoNote text="Possible solution #3: Drop all previous results with cleanUp fn" />
			<Example4 />
			<CodeBlock code={PROBLEM_4} />
			<InfoNote text="Possible solution #4: Cancel all previous requests with AbortController" />
			<Example5 />
			<CodeBlock code={PROBLEM_5} />
		</div>
	);
};
