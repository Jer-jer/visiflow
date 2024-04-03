/* Built using Ant Design */
import React from "react";
import { useSelector } from "react-redux";

//Components
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { UserActionLogsDetails } from "../../../utils/interfaces";
import type { RootState } from "../../../store";

//Utils
import {
	actionType,
	formatDateObjToString,
	formatDateToISO,
} from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface ActionLogsTableProps {
	dateSearch: string[];
}

export default function ActionLogsTable({ dateSearch }: ActionLogsTableProps) {
	const userActionLogs = useSelector((state: RootState) => state.userLogs);
	const startDate = new Date(dateSearch[0]);
	const endDate = new Date(dateSearch[1]);

	const columns: ColumnsType<UserActionLogsDetails> = [
		{
			title: "Actions",
			dataIndex: "type",
			render: (_, { type }) => {
				return actionType(type);
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			filters: [
				{
					text: "Success",
					value: "success",
				},
				{
					text: "Failed",
					value: "failed",
				},
			],
			render: (_, { status }) => {
				let color;
				if (status === "success") color = "#0db284";
				else if (status === "failed") color = "#FD4A4A";
				return (
					<Tag color={color} key={status}>
						{status.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.role.indexOf(value) === 0,
		},
		{
			title: "Date",
			dataIndex: "created_at",
			sorter: (a, b) =>
				formatDateToISO(a.created_at)!.localeCompare(
					formatDateToISO(b.created_at)!,
				),
			render: (_, { created_at }) => {
				return formatDateObjToString(created_at);
			},
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={userActionLogs.filter((log) => {
				return dateSearch.length === 0
					? log
					: new Date(log.created_at) >= startDate &&
							new Date(log.created_at) <= endDate;
			})}
			pagination={{ pageSize: 5 }}
		/>
	);
}
