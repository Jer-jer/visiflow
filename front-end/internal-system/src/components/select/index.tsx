/* Created using Ant Design */
import React, { useEffect, useState } from "react";
import { Select } from "antd";

//Libs
import AxiosInstance from "../../lib/axios";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface SelectProps {
	label: string;
	placeholder: string;
	options?: [{ value: string; label: string }];
	handleChange?: (value: string) => void;
}

// Filter `option.label` match the user type `input`
const filterOption = (
	input: string,
	option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function MainSelect({
	label,
	placeholder,
	options,
	handleChange,
}: SelectProps) {
	return (
		<div className="flex items-center gap-[10px]">
			<span className="line-normal font-normal">{label}</span>
			<Select
				// defaultValue={options![0].value}
				placeholder={placeholder}
				showSearch
				filterOption={filterOption}
				onChange={handleChange}
				options={options}
			/>
		</div>
	);
}
