import React from "react";

//Components
import SecondaryStats from "./secondary-stats";

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
	secondaryStatsProps: SecondaryStatsProps[];
}

export default function StatisticsSummaryContent({
	title,
	bigNumber,
	secondaryStatsProps,
}: StatisticsSummaryContentProps) {
	return (
		<div className="flex flex-col items-center">
			<span className="line-normal mt-[40px] text-center text-[80px] font-medium text-primary-500">
				{bigNumber}
			</span>
			<span className="line-normal my-[40px] text-[14px] font-medium tracking-[0.77px] text-[#858585]">
				{title.toUpperCase()}
			</span>
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

			{/* <div className="mb-[6.5px] flex w-[40%] justify-between">
				<span className="line-normal text-[14px] font-[400] text-[#858585]">
					Percentage
				</span>
				<span className="line-normal text-[14px] font-[400] text-black">
					20%
				</span>
			</div>
			<div className="mb-[66px] mt-[6.5px] flex w-[40%] justify-between">
				<span className="line-normal text-[14px] font-[400] text-[#858585]">
					Average
				</span>
				<span className="line-normal text-[14px] font-[400] text-black">5</span>
			</div> */}
		</div>
	);
}
