import React, { Dispatch, SetStateAction } from "react";

import "./styles.scss";

interface InputProps {
	inputStyling?: string;
	inputType: string;
	placeHolder?: string;
	input?: string;
	setInput?: Dispatch<SetStateAction<string>>;
	setValue?: any;
	formValue?: string;
	visitorMngmnt?: boolean;
	disabled?: boolean;
	onChange?:React.ChangeEventHandler<HTMLInputElement> | undefined
}

function Input({
	inputStyling,
	inputType,
	placeHolder,
	input,
	setInput,
	visitorMngmnt,
	disabled,
	//address this
	setValue,
	formValue,
}: InputProps) {
	return (
		<input
			type={inputType}
			placeholder={placeHolder}
			className={`${inputStyling} ${visitorMngmnt && "vm-placeholder"}`}
			disabled={disabled}
			value={input}
			onChange={(e) => {setInput!(e.target.value)}}
		></input>
	);
}

export default Input;
