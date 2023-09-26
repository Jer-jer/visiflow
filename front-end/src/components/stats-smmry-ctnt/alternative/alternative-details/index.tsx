import React from "react";

//Styles
import "../../../../utils/variables.scss";
import "./styles.scss";

interface AlternativeDetailsProps {
	lastRow: boolean;
	label: string;
	input: string;
}

export default function AlternativeDetails({
	lastRow,
	label,
	input,
}: AlternativeDetailsProps) {
	return (
		<div
			className={`mt-[20px] flex w-[35%] justify-between ${
				lastRow && "mb-[60px]"
			}`}
		>
			<span className="font-normal text-[#858585]">{label}</span>
			<span className="font-normal text-black">{input}</span>
		</div>
	);
}
