/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

//Interfaces
import { UserActionLogsDetails } from "../../../../utils/interfaces";
import type { AppDispatch, RootState } from "../../../../store";
import type { Dayjs } from "dayjs";

//Reducer
import { addLog } from "../../../../states/logs/user";

//Components
import { Button, Tooltip } from "antd";
import StandardModal from "../../../../components/modal";
import ActionLogsTable from "../../../../components/table/action-logs-list";
import DateTimePicker from "../../../../components/datetime-picker";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload } from "../../../../assets/svg";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface UserActionLogsProps {
	userId: string;
	lastName: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserActionLogs({
	userId,
	lastName,
	open,
	setOpen,
}: UserActionLogsProps) {
	const [dateSearch, setDateSearch] = useState<string[]>([]);
	const userLogs = useSelector((state: RootState) => state.userLogs);
	const dispatch = useDispatch<AppDispatch>();

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
	};

	//TODO Must be updated real-time
	useEffect(() => {
		//TODO Must be updated to a call to the API
		const data: UserActionLogsDetails[] = [
			{
				logId: "log123",
				action: "Login",
				logDate: "2023-09-15 10:30 AM",
				system: "Admin System",
			},
			{
				logId: "log789",
				action: "Logout",
				logDate: "2023-09-15 02:45 PM",
				system: "Admin System",
			},
			{
				logId: "log456",
				action: "Data Update",
				logDate: "2023-09-16 09:15 AM",
				system: "Guard System",
			},
			{
				logId: "log234",
				action: "Profile Edit",
				logDate: "2023-09-16 03:00 PM",
				system: "Admin System",
			},
			{
				logId: "log567",
				action: "Logout",
				logDate: "2023-09-17 11:20 AM",
				system: "Guard System",
			},
		];

		data.map((log) => dispatch(addLog(log)));
	}, []);

	const userLogsHeader = [
		{ label: "Action", key: "action" },
		{ label: "System", key: "system" },
		{ label: "Date", key: "logDate" },
	];

	const userLogsData = userLogs.map((logs) => {
		return {
			action: logs.action,
			system: logs.system,
			logDate: logs.logDate,
		};
	});

	return (
		<StandardModal
			header={
				<span className="text-[22px] text-[#0C0D0D]">User Action Logs</span>
			}
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<div className="flex justify-between">
				<div className="flex w-full items-center justify-start gap-[25px]">
					<DateTimePicker size="middle" onRangeChange={onRangeChange} />
				</div>
				<Tooltip placement="top" title="Export Logs" arrow={false}>
					<CSVLink
						filename={`${lastName.toUpperCase()}_Logs.csv`}
						data={userLogsData}
						headers={userLogsHeader}
					>
						<ExcelDownload />
					</CSVLink>
				</Tooltip>
			</div>

			<ActionLogsTable dateSearch={dateSearch} />
		</StandardModal>
	);
}
