/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Layouts
import CompanionLogsTable from "../../../../components/table/companion-logs";

//Components
import StandardModal from "../../../../components/modal";

//Styles
import "./styles.scss";

//Assets

interface CompanionLogsProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CompanionLogs({ open, setOpen }: CompanionLogsProps) {
	return (
		<StandardModal
			header="Companion Logs"
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<CompanionLogsTable />
		</StandardModal>
	);
}
