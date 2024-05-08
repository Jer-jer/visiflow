import { DateTime } from "luxon";

import { UserActionLogType, NotificationType } from "./enums";

import { NotificationContent } from "./interfaces";

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

export const formatDateStringToUTC = (dateString: string) => {
	// Parse the date string into a DateTime object
	let dt = DateTime.fromFormat(dateString, "yyyy-MM-dd hh:mm:ss a");

	// Convert the DateTime object to UTC
	let dtUTC = dt.toUTC();

	return dtUTC;
};

export const notificationType = (type: NotificationType) => {
	let message: string = "";
	switch (type) {
		case NotificationType.Confirmation:
			message = "Visitor Confirmation";
			break;
		case NotificationType.Declined:
			message = "Visitor Declined";
			break;
		case NotificationType.Pending:
			message = "New Visitor";
			break;
		case NotificationType.TimeIn:
			message = "Nearing Scheduled Time In";
			break;
		case NotificationType.TimeOut:
			message = "Exceeded Scheduled Time Out";
			break;
	}
	return message;
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
		case "add_announce":
			return "Added Announcement";
		case "update_announce":
			return "Updated Announcement";
		case "delete_announce":
			return "Deleted Announcement";
		case "add_office":
			return "Added Office";
		case "update_office":
			return "Updated Office";
		case "delete_office":
			return "Deleted Office";
		case "add_event":
			return "Added Event";
		case "update_event":
			return "Updated Event";
		case "delete_event":
			return "Deleted Event";
		case "add_employee":
			return "Added Employee";
		case "update_employee":
			return "Updated Employee";
		case "delete_employee":
			return "Deleted Employee";
		case "add_reason":
			return "Added Reason";
		case "update_reason":
			return "Updated Reason";
		case "delete_reason":
			return "Deleted Reason";
		case "add_building":
			return "Added Building";
		case "update_building":
			return "Updated Building";
		case "delete_building":
			return "Deleted Building";
		default:
			return "Unknown";
	}
};

export const notificationMessage = (
	type: NotificationType,
	content: NotificationContent,
) => {
	let message: string = "An error occurred. Please try again.";

	switch (type) {
		case NotificationType.Confirmation:
			message = "has been confirmed on";
			break;
		case NotificationType.Declined:
			message = "has been declined on";
			break;
		case NotificationType.Pending:
			message = `has planned an appointment with the following: ${content.host_name} at the following: ${content.location} on`;
			break;
		case NotificationType.TimeIn:
			message = "has yet to time in on";
			break;
		case NotificationType.TimeOut:
			message = "has exceeded their scheduled time out on";
			break;
	}
	return message;
};

export const capitilizeFirstLetter = (str: string) => {
	return str[0].toUpperCase() + str.slice(1);
};

export const capitalizeEachWord = (str: string) => {
	return str
		.split(" ")
		.map((word: string) => {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join(" ");
};
