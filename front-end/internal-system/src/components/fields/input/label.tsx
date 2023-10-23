import React from "react";

interface LabelProps {
	labelStyling?: string;
	spanStyling?: string;
	children?: React.ReactNode;
}

function Label({ labelStyling, spanStyling, children }: LabelProps) {
	return (
		<label className={`label ${labelStyling}`}>
			<span className={`label-text ${spanStyling}`}>{children}</span>
		</label>
	);
}

export default Label;
