import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";

const PROBLEM_1 = `
const Component = () => {
	const submit = () => {} 
	useEffect(() => {
	submit();
		// submit will be triggered in every re-render (loop)
	  }, [submit]);
	
	}`;

const SOLUTION_1 = `const Component = () => {
	const submit = useCallback(() => {
		// submit something here
	}, []) 
	useEffect(() => {
	submit();
		// submit is memoized, so useEffect won't be triggered on every re-render
	  }, [submit]);
	  return ...
	}`;

const SOLUTION_1_1 = `
const submit = useMemo(() => { 
	return () => {
    // this is out submit function - it's returned from the function that is passed to memo
	}; 
}, []);`;

const SOLUTION_2 = `
const Parent = () => {
	// this needs to be memoized!
	// Child uses it inside useEffect const fetch = () => {};
	return <Child onMount={fetch} />; 
};
	const Child = ({ onMount }) => {
		 useEffect(() => {
		 onMount();
		}, [onMount]);
	};
	// if a non-primitive value goes into a dependency, 
	// it should have a stable reference between re-renders, 
	// even if it comes from a chain of props.
	`;

const PROBLEM_3 = `
	const Child = ({ data, onChange }) => {}; const ChildMemo = React.memo(Child);
const Component = () => {
// object and function declared inline
// will change with every re-render
return <ChildMemo data={{ ...some_object }} onChange={() => {...}} /> }
	`;

const SOLUTION_3 = `
	const Child = ({ data, onChange }) => {}; const ChildMemo = React.memo(Child);
const Component = () => {
const data = useMemo(() => ({ ... }), []); // some object const onChange = useCallback(() => {}, []); // some callback
// data and onChange now have stable reference
// re-renders of ChildMemo will be prevented
return <ChildMemo data={data} onChange={onChange} />
}
	`;

const PROBLEM_4 = `
const Child = () => {};
const ChildMemo = React.memo(Child);

const Component = (props) => <ChildMemo {...props} />;
const ComponentInBetween = (props) => <Component {...props} />

const InitialComponent = (props) => {
// this one will have state and will trigger re-render of Component
return <ComponentInBetween {...props} data={{ id: '1' }} />
};
`;

const PROBLEM_5 = `
const ChildMemo = React.memo(Child);

const Component = () => (
    <ChildMemo>
      <div>Some text here</div>
    </ChildMemo>
  );

// OTHER PERSPECTIVE AT THE SAME CODE

const Component = () => <ChildMemo children={<div>Some text here</div>} />;
// children is non primitive (object) props - so this breaks memoization and need to me memoized
`;

const SOLUTION_5 = `
const Component = () => { 
	// memoization
	const content = useMemo(
	() => <div>Some text here</div>,
	[], );
	return <ChildMemo children={content} />; };
`;

export const Chapter5 = () => {
	return (
		<>
			<InfoNote variant="warning" text="The problem: comparing values" />
			<InfoNote variant="info">
				<ul>
					<li>Primitive values are comapring by ther actual values</li>
					<li>
						<CodeBlock
							code={`
							const a = 1; 
							const b = 1; 
							a === b; will be true, values are exactly the same`}
						/>
					</li>
					<li>
						Non primitive values like arrays, object are comparing by their
						reference
					</li>
					<li>
						<CodeBlock
							code={`
						const a = { id: 1 };
						const b = { id: 1 };
						a === b; // will always be false`}
						/>
					</li>
				</ul>
			</InfoNote>
			<div className="flex flex-col gap-4">
				<CodeBlock code={PROBLEM_1} />
				<CodeBlock code={SOLUTION_1} />
				<CodeBlock code={SOLUTION_1_1} />
			</div>
			<InfoNote
				variant="info"
				text="There are only two major use cases where we actually need to memoize props on a component. "
			>
				<ul>
					<li>
						The first one is when this prop is used as a dependency in another
						hook in the downstream component.
					</li>
					<li>
						<CodeBlock code={SOLUTION_2} />
					</li>
				</ul>
			</InfoNote>
			<InfoNote variant="info">
				<ul>
					<li>
						And the second one is when a component is wrapped in React.memo
					</li>

					<li>
						<InfoNote
							text="If a component's re-render is triggered by its parent (and only
						then), and if this component is wrapped in React.memo , then and
						only then will React stop and check its props. If none of the props
						change, then the component will not be re- rendered, and the normal
						chain of re-renders will be stopped"
						/>
					</li>
					<li>
						<CodeBlock code={SOLUTION_2} />
					</li>
				</ul>
			</InfoNote>
			<InfoNote
				variant="warning"
				text="Object and fuction declared inline will be recreated in every render"
			>
				<CodeBlock code={PROBLEM_3} />
			</InfoNote>

			<InfoNote text="Solution: useCallback and useMemo">
				<CodeBlock code={SOLUTION_3} />
			</InfoNote>
			<InfoNote variant="warning" text="React.memo and props from props">
				<CodeBlock code={PROBLEM_4} />
			</InfoNote>
			<InfoNote variant="info" text="Solution">
				<ul>
					<li>
						Rule 1: never spread props that are coming from other components.
					</li>
					<li>
						Rule 2: avoid passing non-primitive props that are coming from other
						components.
					</li>
					<li>
						Rule 3: avoid passing non-primitive values that are coming from
						custom hooks.
					</li>
				</ul>
			</InfoNote>

			<InfoNote
				variant="warning"
				text="React.memo and children | broken memoization"
			>
				<CodeBlock code={PROBLEM_5} />
			</InfoNote>
			<CodeBlock code={SOLUTION_5} />
		</>
	);
};
