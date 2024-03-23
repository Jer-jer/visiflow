/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

//Interfaces
import { RootState } from "../../../../store";
import type { AppDispatch } from "../../../../store";
import { VisitorLogDetails } from "../../../../utils/interfaces";
import type { Dayjs } from "dayjs";

//Layouts
import CompanionLogsTable from "../../../../components/table/companion-logs";

//Components
import { Tooltip, Checkbox } from "antd";
import StandardModal from "../../../../components/modal";
import DateTimePicker from "../../../../components/datetime-picker";

//Reducers
import { addLog } from "../../../../states/logs/companions";

//Utils
import { formatDateString } from "../../../../utils";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload } from "../../../../assets/svg";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface CompanionLogsProps {
	lastname: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CompanionLogs({
	lastname,
	open,
	setOpen,
}: CompanionLogsProps) {
	const [dateSearch, setDateSearch] = useState<string[]>([]);
	const [filterWhen, setFilterWhen] = useState<boolean>(true);

	// Store Related variables
	const companionLogs = useSelector((state: RootState) => state.companionLogs);
	const dispatch = useDispatch<AppDispatch>();

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
	};

	useEffect(() => {
		//TODO Add Axios call to companion logs
		const data: VisitorLogDetails[] = [
			{
				key: "1",
				purpose: {
					what: ["Meeting with Client"],
					when: "2023-09-15 09:30 AM",
					where: ["Client's Office"],
					who: ["John Doe"],
				},
				timeIn: "2023-09-15 09:30 AM",
				timeOut: "2023-09-15 11:00 AM",
			},
			{
				key: "2",
				purpose: {
					what: ["Interview"],
					when: "2023-09-16 02:45 PM",
					where: ["HR Office"],
					who: ["Jane Doe"],
				},
				timeIn: "2023-09-16 02:45 PM",
				timeOut: "2023-09-16 04:15 PM",
			},
			{
				key: "3",
				purpose: {
					what: ["Conference Call"],
					when: "2023-09-17 10:15 AM",
					where: ["Home Office"],
					who: ["John Doe", "Jane Doe"],
				},
				timeIn: "2023-09-17 10:15 AM",
				timeOut: "2023-09-17 11:30 AM",
			},
			{
				key: "4",
				purpose: {
					what: ["Intramurals"],
					when: "2023-09-18 12:30 PM",
					where: ["Football Field"],
					who: ["John Doe", "Jane Doe"],
				},
				timeIn: "2023-09-18 12:30 PM",
				timeOut: "2023-09-18 01:30 PM",
			},
			{
				key: "5",
				purpose: {
					what: ["Training Session"],
					when: "2023-09-19 03:00 PM",
					where: ["Training Room"],
					who: ["John Doe", "Jane Doe"],
				},
				timeIn: "2023-09-19 03:00 PM",
				timeOut: "2023-09-19 05:00 PM",
			},
			{
				key: "6",
				purpose: {
					what: ["Staff Meeting"],
					when: "2023-09-20 09:00 AM",
					where: ["Conference Room"],
					who: ["John Doe", "Jane Doe"],
				},
				timeIn: "2023-09-20 09:00 AM",
				timeOut: "2023-09-20 10:30 AM",
			},
			{
				key: "7",
				purpose: {
					what: ["Visitor Registration"],
					when: "2023-09-21 11:15 AM",
					where: ["Reception Area"],
					who: ["John Doe"],
				},
				timeIn: "2023-09-21 11:15 AM",
				timeOut: "2023-09-21 12:45 PM",
			},
			{
				key: "8",
				purpose: {
					what: ["Site Inspection"],
					when: "2023-09-22 01:30 PM",
					where: ["Construction Site"],
					who: ["John Doe"],
				},
				timeIn: "2023-09-22 01:30 PM",
				timeOut: "2023-09-22 03:00 PM",
			},
		];

		data.map((log) => dispatch(addLog(log)));
	}, []);

	const companionLogsHeaders = [
		{ label: "What", key: "what" },
		{ label: "When", key: "when" },
		{ label: "Where", key: "where" },
		{ label: "Who", key: "who" },
		{ label: "Time In", key: "timeIn" },
		{ label: "Time Out", key: "timeOut" },
	];

	const companionLogsData = companionLogs.map((logs) => {
		return {
			what: logs.purpose?.what.join(", "),
			when: formatDateString(logs.purpose!.when),
			where: logs.purpose?.where.join(", "),
			who: logs.purpose?.who.join(", "),
			timeIn: logs.timeIn,
			timeOut: logs.timeOut,
		};
	});

	return (
		<StandardModal
			header={
				<span className="text-[22px] text-[#0C0D0D]">Companion Logs</span>
			}
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<div className="flex flex-col gap-8">
				<div className="flex justify-between">
					<div className="flex w-full items-center justify-start gap-[25px]">
						<DateTimePicker size="middle" onRangeChange={onRangeChange} />
						<Checkbox
							onChange={() => setFilterWhen(!filterWhen)}
							checked={filterWhen}
						>
							Filter When
						</Checkbox>
					</div>
					<Tooltip placement="top" title="Export Logs" arrow={false}>
						<CSVLink
							filename={`${lastname.toUpperCase()}_Logs.csv`}
							data={companionLogsData}
							headers={companionLogsHeaders}
						>
							<ExcelDownload />
						</CSVLink>
					</Tooltip>
				</div>
				<CompanionLogsTable filterWhen={filterWhen} dateSearch={dateSearch} />
			</div>
		</StandardModal>
	);
}
