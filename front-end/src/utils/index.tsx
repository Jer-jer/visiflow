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
	companionsDetails?: VisitorDetailsProps[];
	date: string;
	visitorType: string;
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
