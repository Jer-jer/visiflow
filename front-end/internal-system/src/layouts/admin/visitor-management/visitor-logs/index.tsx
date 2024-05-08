/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
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
import { Tooltip, Checkbox } from "antd";
import StandardModal from "../../../../components/modal";
import VisitorLogsTable from "../../../../components/table/visitor-logs";
import DateTimePicker from "../../../../components/datetime-picker";

// Utils
import { formatDateObjToString } from "../../../../utils/";

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
	const desktopMedia = window.matchMedia("(min-width: 1024px)");

	const [dateSearch, setDateSearch] = useState<string[]>([]);
	const [filterWhen, setFilterWhen] = useState<boolean>(true);

	// Store Related variables
	const visitorLogs = useSelector((state: RootState) => state.visitorLogs);

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
		{ label: "Time In", key: "check_in_time" },
		{ label: "Time Out", key: "check_out_time" },
	];

	const visitorLogsData = visitorLogs.map((logs) => {
		return {
			what: logs.purpose?.what.join(", "),
			when: formatDateObjToString(logs.purpose!.when),
			where: logs.purpose?.where.join(", "),
			who: logs.purpose?.who.join(", "),
			check_in_time: formatDateObjToString(logs.check_in_time),
			check_out_time: logs.check_out_time
				? formatDateObjToString(logs.check_out_time)
				: "",
		};
	});

	return (
		<StandardModal
			header={<span className="text-[22px] text-[#0C0D0D]">Visitor Logs</span>}
			open={open}
			setOpen={setOpen}
			footer={false}
			size={1300}
		>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col justify-between md:flex-row">
					<div className="flex w-full flex-col items-start justify-start gap-[25px] md:flex-row md:items-center">
						<DateTimePicker size="middle" onRangeChange={onRangeChange} />
						<Checkbox
							onChange={() => setFilterWhen(!filterWhen)}
							checked={filterWhen}
						>
							Filter When
						</Checkbox>
					</div>
					{desktopMedia.matches && (
						<Tooltip placement="top" title="Export Logs" arrow={false}>
							<CSVLink
								filename={`${lastName.toUpperCase()}_Logs.csv`}
								data={visitorLogsData}
								headers={visitorLogsHeaders}
							>
								<ExcelDownload />
							</CSVLink>
						</Tooltip>
					)}
				</div>
				<VisitorLogsTable filterWhen={filterWhen} dateSearch={dateSearch} />
			</div>
		</StandardModal>
	);
}
