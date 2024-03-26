import { DateTime } from "luxon";

import { UserActionLogType } from "./enums";

export const formatDateString = (date: string) => {
	//? Convert ISO8601 date string to date object
	const dateObject = DateTime.fromISO(date);

	const formattedDateTime = dateObject.toFormat("yyyy-MM-dd hh:mm:ss a");

	return formattedDateTime;
};

export const formatDateObjToString = (dateObj: Date) => {
	//? Convert date object to date string
	const DateObject = DateTime.fromISO(dateObj.toString());

	const formattedDateTime = DateObject.toFormat("yyyy-MM-dd hh:mm:ss a");

	return formattedDateTime;
};

export const formatDateObjToString2 = (dateObj: Date) => {
	//? Convert date object to date string
	const DateObject = DateTime.fromJSDate(dateObj);

	const formattedDateTime = DateObject.toFormat("yyyy-MM-dd hh:mm:ss a");

	return formattedDateTime;
};

export const formatDateToISO = (dateObj: Date) => {
	//? Convert date object to date string
	const DateObject = DateTime.fromJSDate(dateObj);

	const formattedDateTime = DateObject.toISO();

	return formattedDateTime;
};

export const actionType = (type: UserActionLogType) => {
	switch (type) {
		case "time_in":
			return "Time In";
		case "time_out":
			return "Time Out";
		case "add_visitor":
			return "Add Visitor";
		case "update_visitor":
			return "Update Visitor";
		case "delete_visitor":
			return "Delete Visitor";
		case "approve_status":
			return "Approve Status";
		case "decline_status":
			return "Decline Status";
		case "add_user":
			return "Add User";
		case "update_user":
			return "Update User";
		case "delete_user":
			return "Delete User";
		case "log_in":
			return "Log In";
		case "log_out":
			return "Log Out";
		case "generate_badge":
			return "Generate Badge";
		default:
			return "Unknown";
	}
};
