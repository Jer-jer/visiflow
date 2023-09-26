import React from "react";

interface AlertProps {
	globalCustomStyling?: string;
	statusStyling?: string;
	statusColor: string;
	spanStyling?: string;
	statusTextHeaderColor: string;
	descStyling?: string;
	header: string;
	desc: string;
}

function Alert({
	globalCustomStyling,
	statusStyling,
	statusColor,
	spanStyling,
	statusTextHeaderColor,
	descStyling,
	header,
	desc,
}: AlertProps) {
	return (
		<div className={`${globalCustomStyling}`}>
			<div className={`${statusStyling} ${statusColor}`}>
				<svg
					className="h-6 w-6 fill-current text-white"
					viewBox="0 0 40 40"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
				</svg>
			</div>

			<div className="-mx-3 px-4 py-2">
				<div className="mx-3">
					<span className={`${spanStyling} ${statusTextHeaderColor}`}>
						{header}
					</span>
					<p className={`${descStyling}`}>{desc}</p>
				</div>
			</div>
		</div>
	);
}

export default Alert;
