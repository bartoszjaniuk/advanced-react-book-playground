import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";

const EXAMPLE_1 = `
export const Example1 = () => {
	const [showModal, setShowModal] = useState(false);
	const ref = useRef<HTMLButtonElement>(null);
	return (
		<div className="p-8 relative border ">
			<h1 className="py-4 text-xl">
				The combination of <code className="bg-gray-300 p-1">position</code> and{" "}
				<code className="bg-gray-300 p-1">z-index</code> on the same element
				will create its own Stacking Context.
			</h1>
			<Box
				text="red"
				className="p-16 border-2 bg-red-500"
				style={{ zIndex: 1, position: "relative" }}
			>
				<button ref={ref} className="border" onClick={() => setShowModal(true)}>
					Open dialog
				</button>
				{showModal && (
					<Modal triggerRef={ref} onClick={() => setShowModal(false)} />
				)}
			</Box>
			<Box
				text="Green"
				className="p-16 border-2 bg-green-500"
				style={{
					zIndex: 2,
					position: "relative",
					marginTop: "-2rem",
					marginLeft: "2rem",
				}}
			/>
			<Box
				text="Blue"
				className="p-16 border-2 bg-blue-500"
				style={{
					marginTop: "-4rem",
					marginLeft: "4rem",
					zIndex: 999,
				}}
			/>
		</div>
	);
};

type BoxProps = {
	className?: HTMLProps<HTMLElement>["className"];
	style?: HTMLProps<HTMLElement>["style"];
	text: string;
};

const Box = ({ text, children, ...props }: PropsWithChildren<BoxProps>) => (
	<div {...props}>
		<p>{text}</p>
		{children}
	</div>
);

const Modal = ({
	onClick,
	triggerRef,
}: {
	onClick: VoidFunction;
	triggerRef: MutableRefObject<HTMLButtonElement | null>;
}) => {
	const [state, setState] = useState({ top: 0, left: 0 });

	useLayoutEffect(() => {
		setState({
			left: (triggerRef?.current?.offsetLeft || 0) - 10,
			top: (triggerRef?.current?.offsetTop || 0) + 30,
		});
	}, [triggerRef]);

	return (
		<div
			role="dialog"
			className="border w-full h-full bg-gray-300 absolute"
			style={{ top: state.top, left: state.left }}
		>
			<h1>Example 1 Modal</h1>
			<button onClick={onClick} className="border">
				Close modal
			</button>
		</div>
	);
};
`;

const EXAMPLE_2 = `
export const Example2 = () => {
	const [showDialog, setShowDialog] = useState(false);

	return (
		<div className="App">
			<div className="header">Header is sticky</div>
			<h1>Hello CodeSandbox</h1>
			<div className="layout">
				<div className="main">
					main part
					<br />
					<button className="border" onClick={() => setShowDialog(true)}>
						open fixed dialog
					</button>
					{showDialog &&
						createPortal(
							<ModalDialog onClose={() => setShowDialog(false)} />,
							document.getElementById("root") as any,
						)}
				</div>
			</div>
		</div>
	);
};

const ModalDialog = ({ onClose }: { onClose: () => void }) => {
	return (
		<div className="modal center" style={{ zIndex: 99, position: "fixed" }}>
			Dialog should be in the middle of the screen
			<br />
			<br />
			and it is!
			<br />
			<br />
			<button onClick={onClose} className="border">
				close dialog
			</button>
		</div>
	);
};
`;

export const Chapter13 = () => {
	return (
		<div>
			<InfoNote variant="info" text="Stacking context: position + zIndex" />
			<Example1 />
			<CodeBlock code={EXAMPLE_1} />
			<InfoNote variant="info" text="Stacking context: position + zIndex" />
			<Example2 />
			<CodeBlock code={EXAMPLE_2} />
		</div>
	);
};
