/*
	?	GENERALLY USED TO HANDLE DATA SENT FROM THE DATABASE AND SEND DATA TO THE DATABASE
*/

export interface VisitorLogDetails {
	key: string;
	purpose: string;
	timeIn: string;
	timeOut: string;
}

export interface FullNameProps {
	first_name: string;
	middle_name?: string;
	last_name: string;
}

export interface AddressProps {
	house_no?: string;
	street?: string;
	barangay: string;
	city: string;
	province: string;
	country: string;
}

export interface CompanionListProps {
	key: string;
	fullName: FullNameProps;
	email: string;
}

export enum VisitorStatus {
	Approved = "Approved",
	InProgress = "In progress",
	Declined = "Declined",
}

export enum VisitorType {
	PreRegistered = "Pre-Registered",
	WalkIn = "Walk-In",
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
}

export interface CompanionDetailsProps {
	companion_id: string;
	companion_details: VisitorDetailsProps;
}

//TODO Lacking Plate Number and ID Picture
export interface VisitorDataType {
	key: number;
	id: string;
	visitor_details: VisitorDetailsProps;
	companions_details?: CompanionDetailsProps[];
	date: string;
	purpose: string;
	status: VisitorStatus;
	visitor_type: VisitorType;
}

export interface IDPictureProps {
	type: String;
	front: string;
	back: string;
	selfie: string;
}

// export interface VisitorDataType {
// 	visitor_id: string;
// 	name: FullNameProps;
// 	address: AddressProps;
// 	email: string;
// 	mobile: string;
// 	plate_num?: string;
// 	visitor_type: VisitorType;
// 	status: string;
// 	id_picture?: IDPictureProps;
// 	companions?: string[];
// 	status: string
// }

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
	user_id: string;
	name: FullNameProps;
	username: string;
	email: string;
	password: string;
	phone: string;
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
