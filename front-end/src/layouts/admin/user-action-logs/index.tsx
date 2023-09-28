/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Components
import { Button } from "antd";
import StandardModal from "../../../components/modal";
import ActionLogsTable from "../../../components/table/action-logs-list";
import DateTimePicker from "../../../components/datetime-picker";

//Styles
import "./styles.scss";

//Assets

interface UserActionLogsProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserActionLogs({ open, setOpen }: UserActionLogsProps) {
	return (
		<StandardModal
			header="Visitor Logs"
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<div className="flex w-full items-center justify-start gap-[25px]">
				<DateTimePicker size="middle" />
				<Button type="primary" className="search-button !bg-primary-500">
					Search
				</Button>
			</div>
			<ActionLogsTable />
		</StandardModal>
	);
}
