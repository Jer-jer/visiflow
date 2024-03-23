/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Interfaces
import { PurposeProps } from "../../../../utils/interfaces";
import { RootState } from "../../../../store";
import type { Dayjs } from "dayjs";

//Components
import { Tooltip, Checkbox, Modal } from "antd";
import StandardModal from "../../../../components/modal";
import VisitorLogsTable from "../../../../components/table/visitor-logs";
import DateTimePicker from "../../../../components/datetime-picker";

// Utils
import { formatDateObjToString, formatDateString } from "../../../../utils/";

// Lib
import AxiosInstance from "../../../../lib/axios";

// Store
import { AppDispatch } from "../../../../store";

// Reducers
import { addLog } from "../../../../states/logs/visitor";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload } from "../../../../assets/svg";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface VisitorLogsProps {
	visitorId: string;
	lastName: string;
	purpose: PurposeProps;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function VisitorLogs({
	visitorId,
	lastName,
	purpose,
	open,
	setOpen,
}: VisitorLogsProps) {
	const [dateSearch, setDateSearch] = useState<string[]>([]);
	const [filterWhen, setFilterWhen] = useState<boolean>(true);

	// Store Related variables
	const visitorLogs = useSelector((state: RootState) => state.visitorLogs);
	const dispatch = useDispatch<AppDispatch>();

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
	};

	const visitorLogsHeaders = [
		{ label: "What", key: "what" },
		{ label: "When", key: "when" },
		{ label: "Where", key: "where" },
		{ label: "Who", key: "who" },
		{ label: "Time In", key: "timeIn" },
		{ label: "Time Out", key: "timeOut" },
	];

	const visitorLogsData = visitorLogs.map((logs) => {
		return {
			what: logs.purpose?.what.join(", "),
			when: formatDateString(logs.purpose!.when),
			where: logs.purpose?.where.join(", "),
			who: logs.purpose?.who.join(", "),
			timeIn: logs.timeIn,
			timeOut: logs.timeOut,
		};
	});

	const error = (message: string) => {
		Modal.error({
			title: `Error`,
			content: message,
		});
	};

	//TODO Must be updated real-time
	useEffect(() => {
		AxiosInstance.post(`/badge/findBadge`, { visitor_id: visitorId })
			.then((res) => {
				if (res.data.badges.length > 0) {
					AxiosInstance.post("/visitor/logs/find", {
						_id: res.data.badges[0].badge_id,
					})
						.then((res) => {
							const logs = res.data.Log;
							const isArray = Array.isArray(logs);

							if (isArray) {
								logs.map((log: any, indx: number) =>
									dispatch(
										addLog({
											key: (indx + 1).toString(),
											purpose: purpose,
											timeIn: formatDateObjToString(log.check_in_time),
											timeOut: formatDateObjToString(log.check_out_time),
										}),
									),
								);
							} else {
								dispatch(
									addLog({
										key: "1",
										purpose: purpose,
										timeIn: formatDateObjToString(logs.check_in_time),
										timeOut: formatDateObjToString(logs.check_out_time),
									}),
								);
							}
						})
						.catch((err) => {
							console.log(err);
							error(
								err?.response?.data?.error ||
									err?.response?.data?.errors ||
									"Something went wrong with displaying visitor logs.",
							);
						});
				}
			})
			.catch((err) => {
				error(
					err?.response?.data?.error ||
						err?.response?.data?.errors ||
						"Something went wrong.",
				);
			});
	}, []);

	return (
		<StandardModal
			header={<span className="text-[22px] text-[#0C0D0D]">Visitor Logs</span>}
			open={open}
			setOpen={setOpen}
			footer={false}
			size={1300}
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
							filename={`${lastName.toUpperCase()}_Logs.csv`}
							data={visitorLogsData}
							headers={visitorLogsHeaders}
						>
							<ExcelDownload />
						</CSVLink>
					</Tooltip>
				</div>
				<VisitorLogsTable filterWhen={filterWhen} dateSearch={dateSearch} />
			</div>
		</StandardModal>
	);
}
