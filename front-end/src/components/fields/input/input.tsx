import React from "react";

interface InputProps {
	globalCustomStyling?: string;
	leftLabelStyling?: string;
	formControlStyling?: string;
	inputStyling?: string;
	inputType: string;
	topLeftLabel: string;
	leftLabel?: string;
	bottomLeftLabel?: string;
	placeHolder?: string;
}

function Input({
	globalCustomStyling,
	formControlStyling,
	inputStyling,
	leftLabelStyling,
	inputType,
	topLeftLabel,
	leftLabel,
	bottomLeftLabel,
	placeHolder,
}: InputProps) {
	return (
		<div className={`${globalCustomStyling}`}>
			<div className={`${leftLabelStyling}`}>
				<label className="label">
					<span className="label-text">{leftLabel}</span>
				</label>
			</div>
			<div className={`${formControlStyling}`}>
				<label className="label">
					<span className="label-text">{topLeftLabel}</span>
				</label>
				<input
					type={inputType}
					placeholder={placeHolder}
					className={`${inputStyling}`}
				/>
				<label className="label">
					<span className="label-text-alt text-error">{bottomLeftLabel}</span>
				</label>
			</div>
		</div>
	);
}

export default Input;
