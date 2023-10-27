import React from "react";

// Styles
import "./styles.scss";

interface HomeBoxProps {
	mainClass: String;
	headerSize: String;
	headerText: String;
	children: React.ReactNode;
}

export default function HomeBox({
	children,
	mainClass,
	headerSize,
	headerText,
}: HomeBoxProps) {
	return (
		<div className={`${mainClass} rounded-[5px] border border-[#808080]`}>
			<div className="flex flex-col items-center justify-center pt-[15px]">
				<h1 className={`pb-[10px] ${headerSize} font-[500] text-[#4B4B4B]`}>
					{headerText}
				</h1>
				{children}
			</div>
		</div>
	);
}
