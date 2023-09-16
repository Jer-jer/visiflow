import React from "react";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface OuterContainerProps {
	header: string;
	children: React.ReactNode;
}

export default function OuterContainer({
	header,
	children,
}: OuterContainerProps) {
	return (
		<div className="container-shadow mb-[35px] mr-[25px] flex h-full flex-col items-center rounded-[20px] bg-white">
			<div className="mb-[30px] mt-[30px]">
				<span className="line-normal text-[26px] font-medium text-black">
					{header}
				</span>
			</div>
			{children}
		</div>
	);
}
