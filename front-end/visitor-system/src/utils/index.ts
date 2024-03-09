import { VisitorDetailsProps } from "./interfaces";

export function formatDateTimeRange(startDate: Date, endDate: Date) {
	// Format the date part (e.g., "April 30, 2023")
	const startd = startDate.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	const endd = endDate.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	// Format the time part (e.g., "2:00 PM to 5:00 PM")
	const startTime = startDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	const endTime = endDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	return `${startd} ${
		startd !== endd && `to ${endd}`
	} | ${startTime} to ${endTime}`;
}

export const mainOrCompanion = (
	increment: number,
	mainVisitor: VisitorDetailsProps,
	companions: VisitorDetailsProps[],
) => {
	return increment === 0 ? mainVisitor : companions[increment - 1];
};

export const tabName = (id: string) => {
	return id === "1" ? "Main Visitor" : `Companion ${parseInt(id) - 1}`;
};
