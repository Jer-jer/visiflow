export interface VisitorLogDetails {
	key: string;
	purpose: string;
	timeIn: string;
	timeOut: string;
}

export interface VisitorFullNameProps {
	firstName: string;
	middleName: string;
	lastName: string;
}

export interface CompanionDetailsProps {
	key: string;
	fullName: VisitorFullNameProps;
	email: string;
}

export interface VisitorDetailsProps {
	fullName: VisitorFullNameProps;
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
