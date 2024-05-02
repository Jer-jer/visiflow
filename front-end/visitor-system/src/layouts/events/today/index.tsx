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
		<div className="flex flex-col justify-center gap-4 px-5 lg:flex-row lg:flex-wrap lg:px-0">
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
