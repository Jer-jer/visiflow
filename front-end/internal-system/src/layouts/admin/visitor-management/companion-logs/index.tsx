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
import { VisitorLogDetails, PurposeProps } from "../../../../utils/interfaces";
import type { Dayjs } from "dayjs";

//Layouts
import CompanionLogsTable from "../../../../components/table/companion-logs";

//Components
import { Tooltip, Checkbox, Modal } from "antd";
import StandardModal from "../../../../components/modal";
import DateTimePicker from "../../../../components/datetime-picker";

//Reducers
import { addLog, removeLogs } from "../../../../states/logs/companions";

//Utils
import { formatDateObjToString2 } from "../../../../utils";

// Lib
import AxiosInstance from "../../../../lib/axios";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload } from "../../../../assets/svg";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface CompanionLogsProps {
	companionId: string;
	lastname: string;
	purpose?: PurposeProps;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const warning = (message: string) => {
	Modal.warning({
		title: `Warning`,
		content: message,
	});
};

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

export default function CompanionLogs({
	companionId,
	lastname,
	purpose,
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
		if (companionId) {
			dispatch(removeLogs());

			AxiosInstance.post(`/badge/findBadge`, { visitor_id: companionId })
				.then((res) => {
					const badge = res.data.badge;
					AxiosInstance.post("/visitor/logs/find-visitor-logs", {
						badge_id: badge._id,
					})
						.then((res) => {
							const logs = res.data.visitorLogs;
							logs.map((log: any, indx: number) =>
								dispatch(
									addLog({
										key: (indx + 1).toString(),
										purpose: purpose,
										check_in_time: log.check_in_time,
										check_out_time: log.check_out_time,
									}),
								),
							);
							// dispatch(fetchLogs(logs));
						})
						.catch((err) => {
							warning(
								err?.response?.data?.error ||
									err?.response?.data?.errors ||
									"Visitor has no logs.",
							);
						});
				})
				.catch((err) => {
					error(
						err?.response?.data?.error ||
							err?.response?.data?.errors ||
							"Something went wrong.",
					);
				});
		}
	}, [companionId]);

	const companionLogsHeaders = [
		{ label: "What", key: "what" },
		{ label: "When", key: "when" },
		{ label: "Where", key: "where" },
		{ label: "Who", key: "who" },
		{ label: "Time In", key: "check_in_time" },
		{ label: "Time Out", key: "check_out_time" },
	];

	const companionLogsData = companionLogs.map((logs) => {
		return {
			what: logs.purpose?.what.join(", "),
			when: formatDateObjToString2(logs.purpose!.when),
			where: logs.purpose?.where.join(", "),
			who: logs.purpose?.who.join(", "),
			check_in_time: formatDateObjToString2(logs.check_in_time),
			check_out_time: formatDateObjToString2(logs.check_out_time),
		};
	});

	return (
		<StandardModal
			header={
				<span className="text-[22px] text-[#0C0D0D]">Companion Logs</span>
			}
			size={1500}
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
