export const getSize = (size: "large" | "medium" | "small" | undefined) => {
	if (!size) return "1rem";
	if (size === "large") return "2rem";
	if (size === "medium") return "1.5rem";
};
