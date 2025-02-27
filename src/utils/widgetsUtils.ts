export enum WidgetType {
	BookmarkWidget,
}

export type WidgetData = {
	type: WidgetType;
	name?: string;
	link: string;
};

const defaultWidgetsData: WidgetData[] = [
    { type: WidgetType.BookmarkWidget, name: "Google", link: "https://www.google.com" },
    { type: WidgetType.BookmarkWidget, name: "YouTube", link: "https://www.youtube.com" },
    { type: WidgetType.BookmarkWidget, name: "Amazon", link: "https://www.amazon.com" },
    { type: WidgetType.BookmarkWidget, name: "Twitter", link: "https://www.twitter.com" },
    { type: WidgetType.BookmarkWidget, name: "ChatGPT", link: "https://www.chatgpt.com" },
    { type: WidgetType.BookmarkWidget, name: "Claude AI", link: "https://www.claude.ai" },
    { type: WidgetType.BookmarkWidget, name: "Perplexity", link: "https://www.perplexity.ai" },
    { type: WidgetType.BookmarkWidget, name: "Gemini", link: "https://www.gemini.com" },
    { type: WidgetType.BookmarkWidget, name: "Reddit", link: "https://www.reddit.com" },
    { type: WidgetType.BookmarkWidget, name: "Hacker News", link: "https://news.ycombinator.com" },
];


export const initializeDefaultWidgets = () => {
	const localStorageWidgetsData = localStorage.getItem("widgetsData");
	if (!localStorageWidgetsData) {
		localStorage.setItem("widgetsData", JSON.stringify(defaultWidgetsData));
	}
};

export const getWidgets = () => {
	const localStorageWidgetsData = localStorage.getItem("widgetsData");

	try {
		if (!localStorageWidgetsData) {
			console.log("No Widget Found!");
			return [];
		}
		const widgetsData: WidgetData[] = JSON.parse(localStorageWidgetsData || "") || [];

		return widgetsData;
	} catch (e) {
		console.error("Invalid Widgets Data:", e);
		return [];
	}
};

export const addWidget = (newWidgetData: WidgetData) => {
	const oldWidgetsData = getWidgets();
	try {
		const newWidgetsData = [...oldWidgetsData, newWidgetData];
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
		return newWidgetsData;
	} catch (e) {
		console.error("Failed while adding new widget:", e);
	}
	return oldWidgetsData;
};

export const editWidget = (updatedWidgetData: WidgetData, atIndex: number) => {
	const oldWidgetsData = getWidgets();
	try {
		// Filter widget to be editted
		const newWidgetsData = oldWidgetsData.filter((_, ind) => atIndex !== ind);
		// Insert the updated widget into newWidgetsData
		newWidgetsData.splice(atIndex, 0, updatedWidgetData);
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));

		return newWidgetsData;
	} catch (e) {
		console.error("Failed while editing widget:", e);
	}
	return oldWidgetsData;
};

export const updateWidgetsData = (newWidgetsData: WidgetData[]) => {
	try {
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
	} catch (e) {
		console.error("Failed while updating widgets data:", e);
	}
};

// Call initializeDefaultWidgets when the module is loaded
initializeDefaultWidgets();
