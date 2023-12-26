import { useEffect, useState } from "react";
import {
	SidebarType,
	CommentType,
	IssueType,
	sidebarUrl,
	issueUrl,
	commentsUrl,
} from "../data";
import { LoadingScreen } from "../LoadingScreen";
import { Sidebar } from "../Example1";

const useAllData = () => {
	const [sidebar, setSidebar] = useState<SidebarType[]>();
	const [comments, setComments] = useState<CommentType[]>();
	const [issue, setIssue] = useState<IssueType>();

	useEffect(() => {
		const dataFetch = async () => {
			const result = (
				await Promise.all([
					fetch(sidebarUrl),
					fetch(issueUrl),
					fetch(commentsUrl),
				])
			).map((r) => r.json());

			const [sidebarResult, issueResult, commentsResult] = await Promise.all(
				result,
			);

			setSidebar(sidebarResult);
			setIssue(issueResult);
			setComments(commentsResult);
		};

		dataFetch();
	}, []);

	return { sidebar, comments, issue };
};

export const Example2 = () => {
	const { sidebar, issue, comments } = useAllData();

	if (!sidebar || !issue || !comments) return <LoadingScreen />;

	return (
		<div className="layout border border-green">
			<Sidebar data={sidebar} />
			<Issue comments={comments} issue={issue} />
		</div>
	);
};

const Issue = ({
	issue,
	comments,
}: {
	issue: IssueType;
	comments: CommentType[];
}) => {
	return (
		<div className="issue">
			<h3>{issue.author}</h3>
			<p>{issue.description}</p>
			<Comments comments={comments} />
		</div>
	);
};

const Comments = ({ comments }: { comments: CommentType[] }) => {
	return (
		<div className="comments">
			<ul>
				{comments.map(({ id, comment }) => (
					<li key={id}>{comment}</li>
				))}
			</ul>
		</div>
	);
};
