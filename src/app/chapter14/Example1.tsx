import { LoadingIssue, LoadingScreen } from "./LoadingScreen";
import {
	CommentType,
	IssueType,
	SidebarType,
	commentsUrl,
	issueUrl,
	sidebarUrl,
	useData,
} from "./data";
import "./style.css";

export const Example1 = () => {
	const { data: sidebar } = useData<SidebarType[]>(`${sidebarUrl}`);

	if (!sidebar) return <LoadingScreen />;

	return (
		<div>
			<p className="pb-4">Requests waterfalls: how they appear</p>
			<div className="layout border border-red-500">
				<Sidebar data={sidebar} />
				<Issue />
			</div>
		</div>
	);
};

export const Sidebar = ({ data }: { data: SidebarType[] }) => {
	return (
		<div className="sidebar sidebar-base">
			<ul>
				{data.map(({ name, id }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</div>
	);
};

export const Comments = () => {
	const { data } = useData<CommentType[]>(`${commentsUrl}`);

	if (!data) return <div className="loading issue-loading" />;

	return (
		<div className="comments">
			<ul>
				{data.map(({ id, comment }) => (
					<li key={id}>{comment}</li>
				))}
			</ul>
		</div>
	);
};

export const Issue = () => {
	const { data } = useData<IssueType>(`${issueUrl}`);

	if (!data) return <LoadingIssue />;

	return (
		<div className="issue">
			<h3>{data.author}</h3>
			<p>{data.description}</p>
			<Comments />
		</div>
	);
};
