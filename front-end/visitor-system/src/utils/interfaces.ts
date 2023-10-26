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
