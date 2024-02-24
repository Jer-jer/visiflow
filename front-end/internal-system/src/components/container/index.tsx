import React from "react";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload } from "../../assets/svg";

interface OuterContainerProps {
	header: string;
	headerStyling?: string;
	children: React.ReactNode;
	exportFile?: boolean;
}

export default function OuterContainer({
	exportFile,
	header,
	headerStyling,
	children,
}: OuterContainerProps) {
	return (
		<div className="container-shadow mr-[25px] flex h-full flex-col items-center rounded-[20px] bg-white">
			<div className="mb-[30px] mt-[30px]">
				<span
					className={`font-medium text-black ${
						headerStyling === undefined ? "text-base md:text-2xl" : headerStyling
					}`}
				>
					{header}
				</span>
				{exportFile && (
					<span className="line-normal">
						<ExcelDownload />
					</span>
				)}
			</div>
			{children}
		</div>
	);
}
