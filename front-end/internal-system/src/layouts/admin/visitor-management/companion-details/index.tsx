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
	mainVisitorId: string;
	id: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function VisitorCompanionsModal({
	mainVisitorId,
	id,
	open,
	setOpen,
}: VisitorCompanionsProps) {
	return (
		<StandardModal
			header={
				<span className="text-[22px] text-[#0C0D0D]">Companion Details</span>
			}
			centered
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<CompanionDetails
				mainVisitorId={mainVisitorId}
				id={id}
				setOpen={setOpen}
			/>
		</StandardModal>
	);
}
