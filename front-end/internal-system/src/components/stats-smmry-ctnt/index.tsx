import React from "react";

//Components
import SecondaryStats from "./secondary-stats";
import DateTimePicker from "../datetime-picker";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface SecondaryStatsProps {
	label: string;
	calculation: string;
}

interface StatisticsSummaryContentProps {
	title: string;
	bigNumber: string;
	bigNumberStatus: string;
	secondaryStatsProps: SecondaryStatsProps[];
}

//TODO: Integrate Statistics with existing data
//TODO: Add Statistics per week

export default function StatisticsSummaryContent({
	title,
	bigNumber,
	bigNumberStatus,
	secondaryStatsProps,
}: StatisticsSummaryContentProps) {
	return (
		<div className="flex flex-col items-center">
			<span
				className={`line-normal mt-[40px] text-center text-[80px] font-medium ${bigNumberStatus}`}
			>
				{bigNumber}
			</span>
			<span className="line-normal mb-[10px] mt-[40px] text-[14px] font-medium tracking-[0.77px] text-[#858585]">
				{title.toUpperCase()}
			</span>
			{/* Optional */}
			<div className="flex justify-center">
				<DateTimePicker globalStyling="mb-[40px] w-4/5" size="middle" />
			</div>
			{secondaryStatsProps.map((item, index) => (
				<SecondaryStats
					key={index}
					label={item.label}
					calculation={item.calculation}
					lastStatsSpacing={
						index === secondaryStatsProps.length - 1 ? true : false
					}
				/>
			))}
		</div>
	);
}
