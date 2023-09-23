import React from "react";

import "./styles.scss";

interface InputProps {
	inputStyling?: string;
	inputType: string;
	placeHolder?: string;
	visitorMngmnt?: boolean;
}

function Input({
	inputStyling,
	inputType,
	placeHolder,
	visitorMngmnt,
}: InputProps) {
	return (
		<input
			type={inputType}
			placeholder={placeHolder}
			className={`${inputStyling} ${visitorMngmnt && "vm-placeholder"}`}
		></input>
	);
}

export default Input;
