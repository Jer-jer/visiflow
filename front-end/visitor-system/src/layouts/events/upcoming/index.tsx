import React from "react";

// Utils
import { formatDateTimeRange } from "../../../utils";

// Interfaces
import { EventsPropsAggregate } from "../../../utils/interfaces";

// Components
import EventCard from "../../../components/card";

// Styles
import "./styles.scss";

export default function UpcomingEvents({ events }: EventsPropsAggregate) {
	return (
		<>
			{events.map((event, key) => (
				<EventCard
					key={key}
					header={{
						title: event.header.title,
						date: formatDateTimeRange(
							event.header.startDate,
							event.header.endDate,
						),
						loc: event.header.loc,
					}}
					desc={event.desc}
				>
					<img className="max-h-[233px]" alt="example" src={event.img} />
				</EventCard>
			))}
		</>
	);
}
