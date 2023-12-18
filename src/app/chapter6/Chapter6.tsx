import { CodeBlock } from "../shared/codeBlock/CodeBlock";
import { InfoNote } from "../shared/infoNote/InfoNote";

const PROBLEM_1 = `
const Form = () => {
    const [isCompany, setIsCompany] = useState(false);
    return ( <>
    {/* checkbox somewhere here */} {isCompany ? (
    <Input id="company-tax-id-number" placeholder="Enter you company ID"  />
    ):( <TextPlaceholder />)} 
    </>) 
}
    `;

const PROBLEM_2 = `
const Form = () => {
    const [isCompany, setIsCompany] = useState(false);
    return ( <>
    {/*checkbox somewhere here*/} {isCompany ? (
    <Input id="company-tax-id-number" placeholder="Enter you company Tax ID" ... />
    ):(
    <Input id="person-tax-id-number" placeholder="Enter you
    personal Tax ID" ... /> )}
    </> )
    }
`;

const PROBLEM_3 = `
const Component = () => {
    const Input = () => <input />;
      return <Input />;
    };
`;

const ARRAYS_AND_KEYS_4 = `
const data = [
    { id: 'business', placeholder: 'Business Tax' },
    { id: 'person', placeholder: 'Person Tax' },
  ];
  const InputMemo = React.memo(Input); const Component = () => {
    // array's index is fine here, the array is static
  return data.map((value, index) => ( 
    <InputMemo
    key={index}
    placeholder={value.placeholder} />
  )); 
};
`;

const STATE_RESET_TECHNIQUE = `
const Form = () => {
    const [isCompany, setIsCompany] = useState(false);
    return ( <>
        <Checkbox onChange={() => setIsCompany(!isCompany)} /> {
        isCompany ? (
            <Input id="company-tax-id-number" ... /> )
            :
            (<Input id="person-tax-id-number" ... /> )}
        </> )
        }

        // To make React realize that those Input components between re-renders are actually different
        // components and should not be re-used. If we add a "key" to those inputs, we'll achieve exactly that.
        // this will cause mouting and unmounting
`;

export const Chapter6 = () => {
	return (
		<>
			<InfoNote variant="info" text="In react we can meet:">
				<ul>
					<li>Mounting - unmounting</li>
					<li>Render - re-render</li>
				</ul>
				<p>
					If element is initialy created and avaliable in the DOM | It is
					monting
				</p>
				<p>
					If element is avaliable in the DOM, and state is updated | It is
					re-render
				</p>
				<p>Conditional rendering causes mounting - unmounting</p>
				<p>
					Conditional rendering of the same component but with different props
					eg. id will cause only re-render
				</p>
			</InfoNote>
			<InfoNote variant="info" text="Example of mounting - unmounting">
				<CodeBlock code={PROBLEM_1} />
			</InfoNote>
			<InfoNote variant="info" text="Example of re-render">
				<CodeBlock code={PROBLEM_2} />
			</InfoNote>

			<InfoNote
				variant="warning"
				text="We can't define components inside other components"
			>
				<CodeBlock code={PROBLEM_3} />
				<ul className="pt-4 list-disc pl-4">
					<li>
						In above's scenario function (compomnent) will be mounting and
						unmounting every render, because React can't compare functions
					</li>
					<li>
						If the component is heavy enough, we will even see a "flickering"
						effect on the screen
					</li>
				</ul>
			</InfoNote>
			<InfoNote
				variant="info"
				text="Key helps
React to identify which already existing instance it should re-use when it re-renders those items."
			>
				<CodeBlock code={ARRAYS_AND_KEYS_4} />
				<ul>
					<li>Index as key is fine until an array is in the same order</li>
					<li>
						If array order is for eg. reversed, there is need to set key as
						other unique identifier
					</li>
				</ul>
			</InfoNote>
			<InfoNote text="State reset technique">
				<CodeBlock code={STATE_RESET_TECHNIQUE} />
			</InfoNote>
		</>
	);
};
