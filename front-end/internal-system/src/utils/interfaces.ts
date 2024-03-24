/*
	?	GENERALLY USED TO HANDLE DATA SENT FROM THE DATABASE AND SEND DATA TO THE DATABASE
*/

import {
	VisitorStatus,
	VisitorType,
	UserRole,
	NotificationType,
} from "./enums";

export interface PurposeProps {
	what: string[];
	when: string;
	where: string[];
	who: string[];
	// why?: string;
}

export interface VisitorLogDetails {
	key: string;
	purpose?: PurposeProps;
	timeIn: string;
	timeOut: string;
}

export interface FullNameProps {
	first_name: string;
	middle_name?: string;
	last_name: string;
}

export interface AddressProps {
	house?: string;
	street?: string;
	brgy: string;
	city: string;
	province: string;
	country: string;
}

export interface CompanionListProps {
	key: string;
	fullName: FullNameProps;
	email: string;
}

export interface VisitorDetailsProps {
	_id: string;
	name: FullNameProps;
	phone: string;
	email: string;
	address: AddressProps;
}

export interface IDPictureProps {
	front: string;
	back: string;
	selfie: string;
}
export interface VisitorDataType {
	key: string;
	_id: string;
	visitor_details: VisitorDetailsProps;
	companion_details?: VisitorDetailsProps[];
	date: string;
	purpose: PurposeProps;
	plate_num: string;
	expected_time_in: string;
	expected_time_out: string;
	status: VisitorStatus;
	visitor_type: VisitorType;
	id_picture: IDPictureProps;
	created_at: Date;
}

export interface IDPictureProps {
	front: string;
	back: string;
	selfie: string;
}

export interface UserActionLogsDetails {
	logId: string;
	action: string;
	logDate: string;
	system: string;
}

export interface UserDataType {
	_id: string;
	name: FullNameProps;
	username: string;
	email: string;
	password: string;
	phone: string;
	role: UserRole;
	created_at: Date;
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
