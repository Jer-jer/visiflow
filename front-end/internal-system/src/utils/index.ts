import { DateTime } from "luxon";

// export const formatDate = (date: any) => {
// 	const convertDate = typeof date === "string" ? new Date(date) : date;

// 	const formattedDateTime = new Intl.DateTimeFormat("en-CA", {
// 		hour12: true,
// 		year: "numeric",
// 		month: "2-digit",
// 		day: "2-digit",
// 		hour: "2-digit",
// 		minute: "2-digit",
// 	}).format(convertDate);
// 	const removeColumn = formattedDateTime.replace(/,\s*/, " ");
// 	const timePart = removeColumn.split(" ");
// 	const amPm = timePart[2];

// 	let finalDateTime = removeColumn;

// 	if (amPm === "a.m.") finalDateTime = finalDateTime.replace("a.m.", "AM");
// 	else if (amPm === "p.m.") finalDateTime = finalDateTime.replace("p.m.", "PM");

// 	return finalDateTime;
// };

export const formatDateString = (date: string) => {
	//? Convert ISO8601 date string to date object
	const dateObject = DateTime.fromISO(date, {
		zone: "utc",
	});

	const formattedDateTime = dateObject.toFormat("yyyy-MM-dd hh:mm:ss a");

	return formattedDateTime;
};

export const formatDateObjToString = (dateObj: Date) => {
	//? Convert date object to date string
	const DateObject = DateTime.fromISO(dateObj.toString(), {
		zone: "utc",
	});

	const formattedDateTime = DateObject.toFormat("yyyy-MM-dd hh:mm:ss a");

	return formattedDateTime;
};
