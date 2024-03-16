import React, { Dispatch, SetStateAction } from "react";

//Components
import { Modal } from "antd";

//Styles
import "./styles.scss";

interface ModalProps {
	header: React.ReactNode;
	size?: number;
	centered?: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	footer?: false;
	someCancelFunction?: () => void;
	someOkFunction?: () => void;
	children: React.ReactNode;
}

export default function StandardModal({
	header,
	size,
	centered,
	open,
	setOpen,
	footer,
	someCancelFunction,
	someOkFunction,
	children,
}: ModalProps) {
	return (
		<Modal
			title={header}
			centered={centered}
			open={open}
			maskClosable
			// style={{ top: topPos && topPos }}
			onCancel={() =>
				someCancelFunction ? someCancelFunction() : setOpen(!open)
			}
			onOk={() => (someOkFunction ? someOkFunction() : setOpen(!open))}
			width={size ? size : 1000}
			footer={footer && false}
		>
			{children}
		</Modal>
	);
}
