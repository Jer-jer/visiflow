import React from "react";

// Styles
import "./styles.scss";

interface HomeBoxProps {
	mainClass: String;
	headerSize: String;
	headerText: String;
	date?: String;
	children: React.ReactNode;
}

export default function HomeBox({
	children,
	mainClass,
	headerSize,
	headerText,
	date,
}: HomeBoxProps) {
	return (
		<div
			className={`${mainClass} h-[437.65px] rounded-[5px] border border-[#808080]`}
		>
			<div className="flex h-[inherit] flex-col items-center justify-center pt-[15px]">
				<div className="flex flex-col items-center justify-center gap-1 pb-[10px]">
					<h1 className={`${headerSize} text-center font-[500] text-[#4B4B4B]`}>
						{headerText}
					</h1>
					<h2>Posted at: {date}</h2>
				</div>

				{children}
			</div>
		</div>
	);
}
