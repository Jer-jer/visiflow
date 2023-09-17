/* Created using Ant Design */
import React from "react";
import { Select } from "antd";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

//Temporary
const years = [
	{ value: "2021", label: "2021" },
	{ value: "2022", label: "2022" },
	{ value: "2023", label: "2023" },
];

const months = [
	{ value: "jan", label: "January" },
	{ value: "feb", label: "Febuary" },
	{ value: "mar", label: "March" },
	{ value: "apr", label: "April" },
	{ value: "may", label: "May" },
	{ value: "jun", label: "June" },
	{ value: "jul", label: "July" },
	{ value: "aug", label: "August" },
	{ value: "sep", label: "September" },
	{ value: "oct", label: "October" },
	{ value: "nov", label: "November" },
	{ value: "dev", label: "December" },
];

interface SelectProps {
	options: string;
}

export default function MainSelect({ options }: SelectProps) {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const optionSelect = (items: string) => {
		switch (items) {
			case "months":
				return months;
			case "years":
				return years;
			default:
				console.error("Invalid option was used");
				break;
		}
	};

	const selectLabel = (items: string) => {
		switch (items) {
			case "months":
				return "Month";
			case "years":
				return "Year";
			default:
				console.error("Invalid option was used");
				break;
		}
	};

	const defaultVal = (items: string) => {
		switch (items) {
			case "months":
				return months[0].value;
			case "years":
				return years[0].value;
			default:
				console.error("Invalid option was used");
				break;
		}
	};

	return (
		<div className="flex items-center gap-[10px]">
			<span className="line-normal font-normal">{selectLabel(options)}</span>
			<Select
				defaultValue={defaultVal(options)}
				onChange={handleChange}
				options={optionSelect(options)}
			/>
		</div>
	);
}
