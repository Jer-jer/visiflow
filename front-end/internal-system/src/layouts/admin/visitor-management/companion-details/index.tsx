/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Layouts
import CompanionDetails from "./details";

//Components
import StandardModal from "../../../../components/modal";

//Styles
import "./styles.scss";

//Assets

interface VisitorCompanionsProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function VisitorCompanionsModal({
	open,
	setOpen,
}: VisitorCompanionsProps) {
	return (
		<StandardModal
			header="Companion Details"
			centered
			size={1400}
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<CompanionDetails />
		</StandardModal>
	);
}
