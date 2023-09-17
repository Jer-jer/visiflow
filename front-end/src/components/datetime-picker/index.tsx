import React from "react";
import { DatePicker } from "antd";

// Styles
import "./styles.scss";

function DateTimePicker() {
	const { RangePicker } = DatePicker;
	const timeFormat = "h:mm A";

	return (
		<div>
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
