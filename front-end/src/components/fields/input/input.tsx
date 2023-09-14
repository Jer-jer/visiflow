import React from "react";

interface InputProps {
	inputStyling?: string;
	inputType: string;
	placeHolder?: string;
}

function Input({ inputStyling, inputType, placeHolder }: InputProps) {
	return (
		<input
			type={inputType}
			placeholder={placeHolder}
			className={`${inputStyling}`}
		></input>
	);
}

export default Input;
