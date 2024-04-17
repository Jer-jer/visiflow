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
	withDateFilter?: boolean;
	onChange?: (dates: any, dateStrings: string[]) => void;
}

export default function StatisticsSummaryContent({
	title,
	bigNumber,
	bigNumberStatus,
	secondaryStatsProps,
	withDateFilter,
	onChange,
}: StatisticsSummaryContentProps) {
	return (
		<div className="flex flex-col items-center">
			<span
				className={`line-normal mt-[40px] text-center text-[80px] font-medium ${bigNumberStatus}`}
			>
				{bigNumber}
			</span>
			<span
				className={`line-normal ${withDateFilter ? "mb-[10px]" : "mb-[40px]"} mt-[40px] text-[14px] font-medium tracking-[0.77px] text-[#858585]`}
			>
				{title.toUpperCase()}
			</span>
			{withDateFilter && (
				<div className="flex justify-center">
					<DateTimePicker
						globalStyling="mb-[40px] w-full"
						size="middle"
						onRangeChange={onChange}
					/>
				</div>
			)}

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
