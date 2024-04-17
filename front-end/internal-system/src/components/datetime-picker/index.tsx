/* Created using Ant Design */

import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Components
import { DatePicker } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

// Styles
import "./styles.scss";

interface DefaultProps {
	from: string;
	to: string;
}

interface DatePickerProps {
	globalStyling?: string;
	onRangeChange?: (dates: any, dateStrings: string[]) => void;
	rangePickerStyling?: string;
	size: SizeType;
	placeHolder?: string[];
	defaultVal?: DefaultProps;
	visitorMngmnt?: boolean;
	disabled?: boolean;
}

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

function DateTimePicker({
	globalStyling,
	rangePickerStyling,
	onRangeChange,
	size,
	placeHolder,
	defaultVal,
	visitorMngmnt,
	disabled,
}: DatePickerProps) {
	const { RangePicker } = DatePicker;
	const timeFormat = "hh:mm A";
	console.log(defaultVal);

	return (
		<div className={`${globalStyling}`}>
			<RangePicker
				className={`!border-[#d9d9d9] hover:!border-primary-500 focus:!border-primary-500 ${
					rangePickerStyling && rangePickerStyling
				} ${disabled && "picker-disabled"} ${
					visitorMngmnt && "vm-placeholder"
				}`}
				size={size}
				defaultValue={
					defaultVal === undefined
						? undefined
						: [
								dayjs(defaultVal?.from, `YYYY-MM-DD ${timeFormat}`),
								dayjs(defaultVal?.to, `YYYY-MM-DD ${timeFormat}`),
							]
				}
				onChange={onRangeChange}
				placeholder={["From", "To"]}
				changeOnBlur={false}
				format={`YYYY-MM-DD ${timeFormat}`}
				showTime={{ format: timeFormat }}
				style={{
					borderColor: "#0db284",
				}}
				disabled={disabled}
			/>
		</div>
	);
}

export default DateTimePicker;
