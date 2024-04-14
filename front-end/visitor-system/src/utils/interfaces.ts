import { VisitorStatus, VisitorType } from "./enums";

export interface EventsProps {
	header: {
		title: String;
		startDate: Date;
		endDate: Date;
		loc: String;
	};
	desc: String;
	img: string;
}

export interface EventsPropsAggregate {
	events: EventsProps[];
}

export interface OfficesProps {
	title?: String;
	op: String; // Operating Hours
	dayOp: String;
	pic: String; // Personnel in charge
	email: String;
	location: String;
	contact: String;
	img?: string;
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

export interface VisitorDetailsProps {
	name: FullNameProps;
	phone: string;
	email: string;
	address: AddressProps;
}

export interface PurposeProps {
	what: string[];
	when: Date;
	where: string[];
	who: string[];
}

export interface IDPictureProps {
	front: string;
	back: string;
	selfie: string;
}

export interface VisitorDataType {
	_id?: string;
	visitor_no: number;
	visitor_details: VisitorDetailsProps;
	expected_time_in: Date;
	expected_time_out: Date;
	purpose: PurposeProps;
	plate_num: string | null;
	status: VisitorStatus;
	visitor_type: VisitorType;
	termsConditions: boolean;
	id_picture: IDPictureProps;
}

export interface RecurringVisitorDataType {
	id: string;
	expected_time_in: Date;
	expected_time_out: Date;
	purpose: PurposeProps;
	plate_num: string | null;
	status: VisitorStatus;
	visitor_type: VisitorType;
	termsConditions: boolean;
	id_picture: IDPictureProps;
}

export interface SelectOption {
	value: string,
	label: string
}