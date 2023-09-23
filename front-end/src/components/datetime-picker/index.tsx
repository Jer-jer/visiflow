/* Created using Ant Design */

import React from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

//Components
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
	rangePickerStyling?: string;
	size: SizeType;
	placeHolder?: string[];
	defaultVal?: DefaultProps;
	visitorMngmnt?: boolean;
}

dayjs.extend(weekday);
dayjs.extend(localeData);

function DateTimePicker({
	globalStyling,
	rangePickerStyling,
	size,
	placeHolder,
	defaultVal,
	visitorMngmnt,
}: DatePickerProps) {
	const { RangePicker } = DatePicker;
	const timeFormat = "hh:mm A";

	return (
		<div className={`${globalStyling}`}>
			<RangePicker
				className={`hover:border-primary focus:border-primary ${rangePickerStyling} ${
					visitorMngmnt && "vm-placeholder"
				}`}
				size={size}
				defaultValue={
					defaultVal === undefined
						? null
						: [
								dayjs(`${dayjs(defaultVal?.from)}`, `YYYY-MM-DD ${timeFormat}`),
								dayjs(`${dayjs(defaultVal?.to)}`, `YYYY-MM-DD ${timeFormat}`),
						  ]
				}
				placeholder={["From", "To"]}
				changeOnBlur={false}
				format={`YYYY-MM-DD ${timeFormat}`}
				showTime={{ format: timeFormat }}
				style={{
					borderColor: "#0db284",
				}}
			/>
		</div>
	);
}

export default DateTimePicker;
