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
import { formatDate } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface VisitorLogsTableProps {
	filterWhen: boolean;
	dateSearch: string[];
}

export default function VisitorLogsTable({
	filterWhen,
	dateSearch,
}: VisitorLogsTableProps) {
	const visitorLogs = useSelector((state: RootState) => state.visitorLogs);
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
						return formatDate(record.purpose?.when);
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
			dataIndex: "timeIn",
			key: "timeIn",
			sorter: (a, b) => a.timeIn.localeCompare(b.timeIn),
		},
		{
			title: "Time Out",
			dataIndex: "timeOut",
			key: "timeOut",
			sorter: (a, b) => a.timeOut.localeCompare(b.timeOut),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={visitorLogs.filter((log) => {
				return dateSearch.length === 0
					? log
					: filterWhen
					? new Date(log.purpose!.when) >= startDate &&
					  new Date(log.purpose!.when) <= endDate
					: new Date(log.timeIn) >= startDate &&
					  new Date(log.timeOut) <= endDate;
			})}
			bordered
			pagination={{ pageSize: 5 }}
		/>
	);
}
