export const InfoNote = ({
	text,
	variant = "success",
}: {
	text: string;
	variant?: "success" | "warning";
}) => {
	return (
		<p
			className={`p-4 my-4 rounded-lg text-white ${
				variant === "success" ? "bg-green-700" : "bg-orange-700"
			}`}
		>
			{text}
		</p>
	);
};
