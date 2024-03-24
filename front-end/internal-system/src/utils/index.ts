import { DateTime } from "luxon";

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
