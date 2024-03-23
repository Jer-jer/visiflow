/* Created Using Ant Design */
import React, { ReactNode } from "react";

//Components
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface CustomDropdownProps {
	overlayClassName?: string;
	items: MenuProps["items"];
	children: ReactNode;
}

export default function CustomDropdown({
	overlayClassName,
	items,
	children,
}: CustomDropdownProps) {
	return (
		<Dropdown
			overlayClassName={`${overlayClassName}`}
			menu={{ items }}
			trigger={["click"]}
		>
			{children}
		</Dropdown>
	);
}
