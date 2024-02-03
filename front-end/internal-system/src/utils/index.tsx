export interface VisitorLogDetails {
	key: string;
	purpose: string;
	timeIn: string;
	timeOut: string;
}

export interface FullNameProps {
	firstName: string;
	middleName: string;
	lastName: string;
}

export interface CompanionDetailsProps {
	key: string;
	fullName: FullNameProps;
	email: string;
}

export interface VisitorDetailsProps {
	fullName: FullNameProps;
	mobile: string;
	email: string;
	houseNo?: string;
	city: string;
	street?: string;
	province: string;
	brgy: string;
	country?: string;
	timeIn: string;
	timeOut: string;
	status: string;
}

export interface VisitorDataType {
	key: number;
	id: string;
	visitorDetails: VisitorDetailsProps;
	companionNumber: number,
	companionsDetails?: VisitorDetailsProps[];
	date: string;
	visitorType: string;
	personOfInterest: string;
	purpose: string;
}

export interface UserActionLogs {
	logId: string;
	userId: string;
	action: string;
	logDate: string;
	system: string;
}

export enum UserRole {
	Admin = "admin",
	Security = "security",
}

export interface UserDataType {
	userId: number;
	officeId: number;
	fullName: FullNameProps;
	username: string;
	email: string;
	password: string;
	mobile: string;
	role: UserRole;
}

export interface HomeEditor {
	title: string;
	body: string;
}

export interface OfficeSchedule {
	officeName: string;
	operatingHours: string;
	inCharge: string;
	location: string;
	contact: string;
	availability: string;
}

export interface EventsSchedule {
	name: string;
	date: string;
	start: string;
	end: string;
	location: string;
	description: string;
}

// export interface VisitorDataType {
// 	key: number;
// 	id: string;
// 	scheduleDetails: ScheduleDetailsProps;
// 	companionsDetails?: ScheduleDetailsProps[];
// 	date: string;
// }

// export interface ScheduleDetailsProps {
// 	id: string,
// 	fullName: FullNameProps;
// 	mobile: string;
// 	email: string;
// 	houseNo?: string;
// 	city: string;
// 	street?: string;
// 	province: string;
// 	brgy: string;
// 	country?: string;
// 	timeIn: string;
// 	timeOut: string;
// 	status: string;
// 	noOfVisitors: string,
// 	purpose: string,
// 	personOfInterest: string,
// }