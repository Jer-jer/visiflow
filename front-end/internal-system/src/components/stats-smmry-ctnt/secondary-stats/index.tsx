import React from "react";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface SecondaryStatsProps {
	label: string;
	calculation: string;
	lastStatsSpacing?: boolean;
}

export default function SecondaryStats({
	label,
	calculation,
	lastStatsSpacing,
}: SecondaryStatsProps) {
	return (
		<div
			className={`${
				lastStatsSpacing ? "mb-[66px]" : "mb-[6.5px]"
			} flex w-[40%] justify-between`}
		>
			<span className="line-normal text-[14px] font-[400] text-[#858585]">
				{label}
			</span>
			<span className="line-normal text-[14px] font-[400] text-black">
				{calculation}
			</span>
		</div>
	);
}
