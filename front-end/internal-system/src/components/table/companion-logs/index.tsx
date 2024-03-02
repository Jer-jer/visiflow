/* Built using Ant Design */
import React from "react";
import { useSelector } from "react-redux";

//Components
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

//Interfaces
import { VisitorLogDetails } from "../../../utils/interfaces";
import type { RootState } from "../../../store";

// Utils
import { formatDate } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

const onChange: TableProps<VisitorLogDetails>["onChange"] = (
	pagination: any,
	filters: any,
	sorter: any,
	extra: any,
) => {
	console.log("params", pagination, filters, sorter, extra);
};

export default function CompanionLogsTable() {
	const companionLogs = useSelector((state: RootState) => state.companionLogs);

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
			dataSource={companionLogs}
			onChange={onChange}
			pagination={{ pageSize: 5 }}
		/>
	);
}
