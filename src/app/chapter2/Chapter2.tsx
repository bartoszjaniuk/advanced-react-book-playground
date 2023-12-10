import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";
import { Solution1 } from "./components/example1/Solution1";

const PROBLEM_1 = `
const MainScrollableArea = () => {
    const [position, setPosition] = useState(300);
    const onScroll = (e) => {
    // calculate position based on the scrolled value const calculated = getPosition(e.target.scrollTop); // save it to state
    setPosition(calculated); };
    return (
    <div className="scrollable-block" onScroll={onScroll}>
    {/* pass position value to the new movable component */} <MovingBlock position={position} />
    <VerySlowComponent />
    <BunchOfStuff />
          <OtherStuffAlsoComplicated />
        </div>
    ); };
`;

const SOLUTION_1 = `
const ScrollWithMovingBlock = ({ children }: PropsWithChildren) => {
	const [position, setPosition] = useState(300);

	const onScroll = (e: any) => {
		const calculated = getPosition(e.target.scrollTop);
		setPosition(calculated);
	};

	return (
		<div className="scrollable-block" onScroll={onScroll}>
			<MovingBlock position={position} />
			{children}
		</div>
	);
};

export const Solution1 = () => {
	return (
		<ScrollWithMovingBlock>
			<VerySlowComponent />
			<AnotherSlowComponent />
		</ScrollWithMovingBlock>
	);
};
`;

export const Chapter2 = () => {
	return (
		<>
			<CodeBlock code={PROBLEM_1} />
			<InfoNote
				variant="warning"
				text="Aktualny problem polega na tym ze kazdy scroll będzie powodował przerenderowanie wszystkich komponentów."
			/>
			<InfoNote
				variant="warning"
				text="Komponent, jest wrapperem dla pozostałych komponentów, przez co nie jest mozliwe zastosowanie poprzedniego rozwiązania jakim było przeniesienie stanu w dól."
			/>
			<CodeBlock code={SOLUTION_1} />
			<Solution1 />
			<InfoNote text="Rozwiązanie: stworzenie komponentu wrappera, przekazanie komponentów children as props." />
		</>
	);
};
