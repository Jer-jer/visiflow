import React from "react";
import { DatePicker } from "antd";

// Styles
import "./styles.scss";

interface DatePickerProps {
	globalStyling?: string;
}

function DateTimePicker({ globalStyling }: DatePickerProps) {
	const { RangePicker } = DatePicker;
	const timeFormat = "h:mm A";

	return (
		//Custom Div Styling
		<div className={`${globalStyling}`}>
			{/* Custom Range Picker Values:
            className
            placeholder
            format 
            showTime */}
			<RangePicker
				className="hover:border-primary focus:border-primary"
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
