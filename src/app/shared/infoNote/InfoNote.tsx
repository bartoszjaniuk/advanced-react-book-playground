const getVariant = (variant: "success" | "warning" | "info") => {
	if (variant === "warning") return "bg-orange-500";
	if (variant === "info") return "bg-blue-500";

	return "bg-green-500";
};

export const InfoNote = ({
	text,
	children,
	variant = "success",
}: {
	text?: string;
	variant?: "success" | "warning" | "info";
	children?: React.ReactNode;
}) => {
	return (
		<p className={`p-4 my-4 rounded-lg text-white ${getVariant(variant)}`}>
			{!!text && text}
			{!!children && children}
		</p>
	);
};
