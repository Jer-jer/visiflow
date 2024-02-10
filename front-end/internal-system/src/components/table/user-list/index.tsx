/* Built using Ant Design */
import React from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { UserDataType, UserRole } from "../../../utils/interfaces";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface UserListTableProps {
	users: UserDataType[];
	addTab: (record: UserDataType) => void;
}

export default function UserListTable({ users, addTab }: UserListTableProps) {
	const columns: ColumnsType<UserDataType> = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.last_name.localeCompare(b.name.last_name),
			render: (_, { name }) => {
				return `${name.last_name}, ${name.first_name} ${name.middle_name}`;
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
			render: (_, { phone }) => {
				return phone;
			},
		},
		{
			title: "Role",
			dataIndex: "role",
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
			render: (_, { role }) => {
				let color;
				if (role === UserRole.Security) color = "#E88B23";
				else if (role === UserRole.Admin) color = "#0db284";
				return (
					<Tag color={color} key={role}>
						{role.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.role.indexOf(value) === 0,
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button onClick={() => addTab(record)}>View Details</Button>
			),
		},
	];

	return (
		<Table columns={columns} dataSource={users} pagination={{ pageSize: 8 }} />
	);
}
