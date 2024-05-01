import React from "react";

// Utils
import { formatDateTimeRange } from "../../../utils";

// Interfaces
import { EventsPropsAggregate } from "../../../utils/interfaces";

// Components
import EventCard from "../../../components/card/events";

// Styles
import "./styles.scss";

export default function UpcomingEvents({ events }: EventsPropsAggregate) {
	return (
		<div className="flex flex-col gap-4 lg:flex-row">
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
					<img
						className="h-64 w-full object-cover"
						alt="example"
						src={event.img}
					/>
				</EventCard>
			))}
		</div>
	);
}
