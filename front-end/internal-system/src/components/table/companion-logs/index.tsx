/* Built using Ant Design */
import React from "react";
import { useSelector } from "react-redux";

//Components
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { VisitorLogDetails } from "../../../utils/interfaces";
import type { RootState } from "../../../store";

// Utils
import {
	formatDateObjToString,
	formatDateString,
	formatDateToISO,
} from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface CompanionLogsTableProps {
	filterWhen: boolean;
	dateSearch: string[];
}

export default function CompanionLogsTable({
	filterWhen,
	dateSearch,
}: CompanionLogsTableProps) {
	const companionLogs = useSelector((state: RootState) => state.companionLogs);
	const startDate = new Date(dateSearch[0]);
	const endDate = new Date(dateSearch[1]);

	const columns: ColumnsType<VisitorLogDetails> = [
		{
			title: "Purpose",
			dataIndex: "purpose",
			key: "purpose",
			children: [
				{
					title: "What",
					dataIndex: "what",
					key: "what",
					render(value, record, index) {
						return record.purpose?.what.map((what: string) => what).join(", ");
					},
				},
				{
					title: "When",
					dataIndex: "when",
					key: "when",
					render(value, record, index) {
						return formatDateObjToString(record.purpose!.when);
					},
				},
				{
					title: "Where",
					dataIndex: "where",
					key: "where",
					render(value, record, index) {
						return record.purpose?.where
							.map((where: string) => where)
							.join(", ");
					},
				},
				{
					title: "Who",
					dataIndex: "who",
					key: "who",
					render(value, record, index) {
						return record.purpose?.who.map((who: string) => who).join(", ");
					},
				},
			],
		},
		{
			title: "Time In",
			dataIndex: "check_in_time",
			key: "check_in_time",
			sorter: (a, b) =>
				formatDateToISO(a.check_in_time)!.localeCompare(
					formatDateToISO(b.check_in_time)!,
				),
			render: (value, record, index) => {
				return record.check_out_time
					? formatDateObjToString(record.check_in_time)
					: "N/A";
			},
		},
		{
			title: "Time Out",
			dataIndex: "check_out_time",
			key: "check_out_time",
			sorter: (a, b) =>
				formatDateToISO(a.check_out_time)!.localeCompare(
					formatDateToISO(b.check_out_time)!,
				),
			render: (value, record, index) => {
				return record.check_out_time
					? formatDateObjToString(record.check_out_time)
					: "N/A";
			},
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={companionLogs.filter((log) => {
				return dateSearch.length === 0
					? log
					: filterWhen
						? new Date(log.purpose!.when) >= startDate &&
							new Date(log.purpose!.when) <= endDate
						: new Date(log.check_in_time) >= startDate &&
							new Date(log.check_out_time) <= endDate;
			})}
			pagination={{ pageSize: 5 }}
		/>
	);
}
