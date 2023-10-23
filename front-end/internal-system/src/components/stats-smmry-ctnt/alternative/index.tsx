import React from "react";

//Components
import DateTimePicker from "../../datetime-picker";
import AlternativeDetails from "./alternative-details";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface StatisticsDetailsAltProps {
	label: string;
	input: string;
}

interface StatisticsSummaryContentAltProps {
	title: string;
	statisticsAltDetails: StatisticsDetailsAltProps[];
}

export default function StatisticsSummaryContentAlt({
	title,
	statisticsAltDetails,
}: StatisticsSummaryContentAltProps) {
	return (
		<div className="flex w-full flex-col items-center justify-center">
			<span className="mt-[30px] text-[40px] font-medium tracking-[12.8px] text-[#858585]">
				{title.toUpperCase()}
			</span>
			<div className="mb-[10px] mt-[10px] flex justify-center">
				<DateTimePicker globalStyling="w-4/5" size="middle" />
			</div>
			{statisticsAltDetails.map((item, index) => (
				<AlternativeDetails
					key={index}
					label={item.label}
					input={item.input}
					lastRow={index === statisticsAltDetails.length - 1 ? true : false}
				/>
			))}
		</div>
	);
}
