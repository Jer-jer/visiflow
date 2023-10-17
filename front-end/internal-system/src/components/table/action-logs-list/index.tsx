/* Built using Ant Design */
import React from "react";

//Components
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { UserActionLogs } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function ActionLogsTable() {
	const data: UserActionLogs[] = [
		{
			logId: "log123",
			userId: "user456",
			action: "Login",
			logDate: "2023-09-15 10:30 AM",
			system: "Admin System",
		},
		{
			logId: "log789",
			userId: "user123",
			action: "Logout",
			logDate: "2023-09-15 02:45 PM",
			system: "Admin System",
		},
		{
			logId: "log456",
			userId: "user789",
			action: "Data Update",
			logDate: "2023-09-16 09:15 AM",
			system: "Guard System",
		},
		{
			logId: "log234",
			userId: "user789",
			action: "Profile Edit",
			logDate: "2023-09-16 03:00 PM",
			system: "Admin System",
		},
		{
			logId: "log567",
			userId: "user456",
			action: "Logout",
			logDate: "2023-09-17 11:20 AM",
			system: "Guard System",
		},
	];

	const columns: ColumnsType<UserActionLogs> = [
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
		<Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
	);
}
