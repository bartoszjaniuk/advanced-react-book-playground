export enum Routes {
	HOME = "/",
}

export enum ChapterRoutes {
	CHAPTER1 = "/chapter-1",
	CHAPTER2 = "/chapter-2",
	CHAPTER3 = "/chapter-3",
	CHAPTER4 = "/chapter-4",
	CHAPTER5 = "/chapter-5",
	CHAPTER6 = "/chapter-6",
	CHAPTER7 = "/chapter-7",
	CHAPTER8 = "/chapter-8",
	CHAPTER9 = "/chapter-9",
	CHAPTER10 = "/chapter-10",
	CHAPTER11 = "/chapter-11",
	CHAPTER12 = "/chapter-12",
	CHAPTER13 = "/chapter-13",
	CHAPTER14 = "/chapter-14",
	CHAPTER15 = "/chapter-15",
}

export const AppRoutes = { ...Routes, ...ChapterRoutes };
