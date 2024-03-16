/* Built using Ant Design */
import React from "react";
import { useSelector } from "react-redux";

//Components
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { UserActionLogsDetails } from "../../../utils/interfaces";
import type { RootState } from "../../../store";

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
			key: "logId",
			className: "hidden",
		},
		{
			title: "Actions",
			dataIndex: "action",
		},
		{
			title: "System",
			dataIndex: "system",
			filters: [
				{
					text: "Admin",
					value: "admin",
				},
				{
					text: "Security",
					value: "security",
				},
			],
			render: (_, { system }) => {
				let color;
				if (system === "Guard System") color = "#E88B23";
				else if (system === "Admin System") color = "#0db284";
				return (
					<Tag color={color} key={system}>
						{system.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.system.indexOf(value) === 0,
		},
		{
			title: "Date",
			dataIndex: "logDate",
			sorter: (a, b) => a.logDate.localeCompare(b.logDate),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={userActionLogs.filter((log) => {
				return dateSearch.length === 0
					? log
					: new Date(log.logDate) >= startDate &&
							new Date(log.logDate) <= endDate;
			})}
			pagination={{ pageSize: 5 }}
		/>
	);
}
