import React from "react";

// Utils
import { formatDateTimeRange } from "../../../utils";

// Interfaces
import { EventsPropsAggregate } from "../../../utils/interfaces";

// Components
import EventCard from "../../../components/card/events";

// Styles
import "./styles.scss";

export default function TodayEvents({ events }: EventsPropsAggregate) {
	return (
		<div className="grid grid-cols-2 gap-4">
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
					<img className="w-full h-64 object-cover" alt="example" src={event.img} />
				</EventCard>
			))}
		</div>
	);
}
