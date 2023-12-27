import { PropsWithChildren } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre style={{ color: "red" }}>{error.message}</pre>
			<button
				className="border hover:cursor-pointer"
				onClick={resetErrorBoundary}
			>
				Reset error boundary
			</button>
		</div>
	);
};

export const AppWithErrorBoundary = ({ children }: PropsWithChildren) => {
	return (
		<ErrorBoundary FallbackComponent={FallbackComponent}>
			{children}
		</ErrorBoundary>
	);
};
