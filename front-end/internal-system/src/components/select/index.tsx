/* Created using Ant Design */
import React, {useEffect, useState} from "react";
import { Select } from "antd";

//Libs
import AxiosInstance from "../../lib/axios";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface SelectProps {
	label: string;
	options?: [{ value: string; label: string }];
	handleChange?: (value: string) => void;
}

export default function MainSelect({ label, options, handleChange }: SelectProps) {
	return (
		<div className="flex items-center gap-[10px]">
			<span className="line-normal font-normal">{label}</span>
			<Select
				defaultValue={options![0].value}
				onChange={handleChange}
				options={options}
			/>
		</div>
	);
}
