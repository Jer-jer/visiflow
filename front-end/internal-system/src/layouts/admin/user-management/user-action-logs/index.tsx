/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

//Interfaces
import type { AppDispatch, RootState } from "../../../../store";
import type { Dayjs } from "dayjs";

//Reducer
import { fetchUserLogs } from "../../../../states/logs/user";

//Components
import { Tooltip } from "antd";
import StandardModal from "../../../../components/modal";
import ActionLogsTable from "../../../../components/table/action-logs-list";
import DateTimePicker from "../../../../components/datetime-picker";

//Utils
import { actionType, formatDateObjToString } from "../../../../utils";

//Lib
import AxiosInstance from "../../../../lib/axios";

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

	useEffect(() => {
		AxiosInstance.post("/system-logs/find-user-logs", {
			user_id: userId,
		}).then((res) => {
			dispatch(fetchUserLogs(res.data.systemLogs));
		});

		// data.map((log) => dispatch(addUserLog(log)));
	}, []);

	const userLogsHeader = [
		{ label: "Action", key: "action" },
		{ label: "Status", key: "status" },
		{ label: "Date", key: "logDate" },
	];

	const userLogsData = userLogs.map((logs) => {
		return {
			action: actionType(logs.type),
			status: logs.status,
			logDate: formatDateObjToString(logs.created_at),
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
