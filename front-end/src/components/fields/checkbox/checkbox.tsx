import React from "react";

interface CheckboxProps {
	globalStyling?: string;
	labelStyling?: string;
	spanStyling?: string;
	checkboxLabelSpacing?: string;
	inputStyling?: string;
	label: string;
}

function Checkbox({
	globalStyling,
	labelStyling,
	inputStyling,
	spanStyling,
	label,
}: CheckboxProps) {
	return (
		<div className={`${globalStyling}`}>
			<label className={`${labelStyling}`}>
				<input type="checkbox" className={`${inputStyling}`} />
				<span className={`${spanStyling}`}>{label}</span>
			</label>
		</div>
	);
}

export default Checkbox;
