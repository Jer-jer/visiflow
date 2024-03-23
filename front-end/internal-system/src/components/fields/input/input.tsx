import React, { Dispatch, SetStateAction } from "react";

import "./styles.scss";

interface InputProps {
	inputStyling?: string;
	inputType: string;
	placeHolder?: string;
	input?: string;
	setInput?: Dispatch<SetStateAction<string>>;
	visitorMngmnt?: boolean;
	disabled?: boolean;
}

function Input({
	inputStyling,
	inputType,
	placeHolder,
	input,
	setInput,
	visitorMngmnt,
	disabled,
}: InputProps) {
	return (
		<input
			type={inputType}
			placeholder={placeHolder}
			className={`${inputStyling} ${visitorMngmnt && "vm-placeholder"}`}
			disabled={disabled}
			value={input}
			onChange={(e) => setInput!(e.target.value)}
		></input>
	);
}

export default Input;
