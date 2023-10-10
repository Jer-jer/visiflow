import React, { Dispatch, SetStateAction } from "react";

//Components
import { Modal } from "antd";

//Styles
import "./styles.scss";

interface ModalProps {
	header: string;
	size?: number;
	centered?: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	footer?: false;
	children: React.ReactNode;
}

export default function StandardModal({
	header,
	size,
	centered,
	open,
	setOpen,
	footer,
	children,
}: ModalProps) {
	return (
		<Modal
			title={<span className="text-[22px] text-[#0C0D0D]">{header}</span>}
			centered={centered}
			open={open}
			maskClosable
			// style={{ top: topPos && topPos }}
			onCancel={() => setOpen(!open)}
			onOk={() => setOpen(!open)}
			width={size ? size : 1000}
			footer={footer && false}
		>
			{children}
		</Modal>
	);
}
