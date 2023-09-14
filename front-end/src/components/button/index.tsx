import React from "react";

interface ButtonProps {
	color: string;
	buttonStyling?: string;
	children?: React.ReactNode;
}

Button.defaultProps = {
	color: "btn-primary",
	buttonStyling: "btn rounded-3xl w-28 text-base normal-case font-medium",
	children: "Button",
};

function Button({ buttonStyling, color, children }: ButtonProps) {
	return <button className={`${buttonStyling} ${color}`}>{children}</button>;
}

export default Button;
