import React from "react";

import { Tooltip } from "@material-tailwind/react";

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
			<Tooltip
				className=" bg-white px-3 py-2 text-black shadow-xl shadow-black/10"
				content="Material Tailwind"
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 25 },
				}}
			>
				<button className={`${buttonStyling} ${color}`}>{label}</button>
			</Tooltip>
		</div>
	);
}

export default Button;
