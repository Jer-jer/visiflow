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
	pic: String; // Personnel in charge
	location: String;
	contact: String;
	img?: string;
	availability: Boolean;
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
	time_in: string;
	time_out: string;
}

export interface PurposeProps {
	what: string[];
	when: string;
	where: string[];
	who: string[];
	// why?: string;
}

//TODO Lacking ID Picture
export interface VisitorDataType {
	visitor_details: VisitorDetailsProps;
	companions_details: VisitorDetailsProps[] | null;
	expected_time_in: string;
	expected_time_out: string;
	purpose: PurposeProps;
	plate_num: string | null;
	status: VisitorStatus;
	visitor_type: VisitorType;
	termsConditions: boolean;
}
