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

export interface VisitorInput {
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobile: string;
	house: string;
	street: string;
	barangay: string;
	city: string;
	province: string;
	country: string;
}

export interface VisitorData {
	id: number;
	poi?: string;
	checkInOut?: string[];
	purpose?: string;
	termsConditions?: boolean;
	data: VisitorInput;
}
