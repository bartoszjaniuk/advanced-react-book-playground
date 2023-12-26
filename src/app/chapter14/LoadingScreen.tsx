import "./style.css";
export const LoadingSidebar = () => (
	<>
		<div className="sidebar-base">
			<div className="loading sidebar-loading" />
			<div className="loading sidebar-loading" />
			<div className="loading sidebar-loading" />
			<div className="loading sidebar-loading" />
		</div>
	</>
);

export const LoadingIssue = () => (
	<>
		<div className="issue">
			<div className="loading issue-loading" style={{ height: "20rem" }} />
			<div className="loading issue-loading" />
		</div>
	</>
);

export const LoadingScreen = () => {
	return (
		<div className="layout">
			<LoadingSidebar />
			<LoadingIssue />
		</div>
	);
};
