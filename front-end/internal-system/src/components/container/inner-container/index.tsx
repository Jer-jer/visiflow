import React from "react";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface InnerContainerProps {
	additionalStyles?: string;
	children: React.ReactNode;
}

export default function InnerContainer({
	children,
	additionalStyles,
}: InnerContainerProps) {
	return <div className={`w-[95%] ${additionalStyles}`}>{children}</div>;
}
