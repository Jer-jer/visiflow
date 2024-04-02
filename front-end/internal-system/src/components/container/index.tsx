import React from "react";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface OuterContainerProps {
	header: string;
	containerStyling?: string;
	headerStyling?: string;
	children: React.ReactNode;
}

export default function OuterContainer({
	header,
	containerStyling,
	headerStyling,
	children,
}: OuterContainerProps) {
	return (
		<div
			className={`${containerStyling} container-shadow mr-[25px] flex flex-col items-center rounded-[20px] bg-white`}
		>
			<div className="mb-[30px] mt-[30px]">
				<span
					className={`font-medium text-black ${
						headerStyling === undefined ? "text-2xl" : headerStyling
					}`}
				>
					{header}
				</span>
			</div>
			{children}
		</div>
	);
}
