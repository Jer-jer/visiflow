/*
	?	GENERALLY USED TO HANDLE DATA SENT FROM THE DATABASE AND SEND DATA TO THE DATABASE
*/

import {
	VisitorStatus,
	VisitorType,
	UserRole,
	UserActionLogType,
	NotificationType,
} from "./enums";

export interface NotificationContent {
	visitor_name: string;
	host_name: string;
	date: Date;
	time_in: Date;
	time_out: Date;
	location: string;
	purpose: string;
	visitor_type: VisitorType;
}

export interface NotificationProps {
	key: string;
	_id: string;
	type: NotificationType;
	recipient: string;
	content: NotificationContent;
	is_read: boolean;
	created_at: Date;
}

export interface PurposeProps {
	what: string[];
	when: Date;
	where: string[];
	who: string[];
}

export interface VisitorLogDetails {
	key: string;
	purpose?: PurposeProps;
	check_in_time: Date;
	check_out_time: Date;
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
	companions?: string[];
	date: string;
	purpose: PurposeProps;
	plate_num: string | null;
	expected_time_in: Date;
	expected_time_out: Date;
	status: VisitorStatus;
	visitor_type: VisitorType;
	id_picture: IDPictureProps;
	created_at: Date;
}

export interface GuardVisitorDataType {
	visitor_details: VisitorDetailsProps;
	expected_time_out: Date;
	purpose: PurposeProps;
	plate_num: string | null;
	status: VisitorStatus;
	visitor_type: VisitorType;
}

export interface IDPictureProps {
	front: string;
	back: string;
	selfie: string;
}

export interface UserActionLogsDetails {
	user_id: string;
	name: FullNameProps;
	role: string;
	type: UserActionLogType;
	status: string;
	created_at: Date;
}

export interface UserDataType {
	key: string;
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
	prio: number;
	createdAt: Date;
}

export interface Employee {
	name: string;
	email: string;
	contact: string;
}

export interface Reason {
	reason: string;
}

export interface OfficeSchedule {
	name: string;
	roomNo: string;
	pic: string;
	contact: string;
	email: string;
}

export interface EventsSchedule {
	name: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
}

export interface Building {
	name: string;
	roomNo: string;
}
