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
