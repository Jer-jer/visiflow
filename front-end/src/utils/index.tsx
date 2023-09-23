export interface VisitorFullNameProps {
	firstName: string;
	middleName: string;
	lastName: string;
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
}

export interface VisitorDataType {
	key: number;
	id: string;
	visitorDetails: VisitorDetailsProps;
	date: string;
	visitorType: string;
}
