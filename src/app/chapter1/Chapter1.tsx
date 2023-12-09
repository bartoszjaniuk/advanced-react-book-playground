import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { SeparatedState } from "./components/SeparatedState";

const PROBLEM_1 = `
export default function App() {
	const [isOpen, setIsOpen] = useState(false);
	return (
	  <>
		<Button onClick={() => setIsOpen(true)}>Open dialog</Button>
		{isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
		<VerySlowComponent />
		<BunchOfStuff />
		<OtherStuffAlsoComplicated />
	  </>
	);
  }
	`;

const SOLUTION_1 = `
const ButtonWithModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<button onClick={() => setIsOpen(true)}> Open dialog</button>
			{isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
		</>
	);
};

export const SeparatedState = () => {
	return (
		<>
			<ButtonWithModal />
			<AnotherComponent />
		</>
	);
};
`;

export const Chapter1 = () => {
	return (
		<>
			<CodeBlock code={PROBLEM_1} />
			<InfoNote text="Aktualny problem polega na tym ze kazda zmiana stanu spowoduje przeładowanie wszystkich komponentów, nawet tych, które tego stanu nie uzywają." />
			<InfoNote text="Rowziązanie: izolacja. Czyli, wyniesienie stanu w dół do komponentów, które go faktycznie uzywają. " />
			<SeparatedState />
			<CodeBlock code={SOLUTION_1} />
		</>
	);
};
