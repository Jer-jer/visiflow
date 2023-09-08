import React from "react";

interface ButtonProps {
	color: string;
	globalCustomStyling?: string;
	buttonStyling?: string;
	label: string;
}

function Button({
	color,
	globalCustomStyling,
	buttonStyling,
	label,
}: ButtonProps) {
	return (
		<div className={`${globalCustomStyling}`}>
			<button className={`${buttonStyling} ${color}`}>{label}</button>
		</div>
	);
}

export default Button;
