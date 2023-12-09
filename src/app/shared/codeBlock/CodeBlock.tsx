import { CodeBlock as Block, dracula } from "react-code-blocks";

export const CodeBlock = ({ code }: { code: string }) => {
	return <Block text={code} showLineNumbers theme={dracula} language="jsx" />;
};
