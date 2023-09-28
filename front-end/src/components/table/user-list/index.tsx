/* Built using Ant Design */
import React from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { UserDataType, UserRole } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface UserListTableProps {
	addTab: (record: UserDataType) => void;
}

export default function UserListTable({ addTab }: UserListTableProps) {
	const data: UserDataType[] = [
		{
			userId: 1,
			officeId: 101,
			fullName: { firstName: "Juan", middleName: "Dela", lastName: "Cruz" },
			username: "jcruz",
			email: "juan.delacruz@example.com",
			password: "securepassword1",
			mobile: "123-456-7890",
			role: UserRole.Admin,
		},
		{
			userId: 2,
			officeId: 102,
			fullName: { firstName: "Maria", middleName: "Santos", lastName: "Reyes" },
			username: "mreyes",
			email: "maria.reyes@example.com",
			password: "password123",
			mobile: "987-654-3210",
			role: UserRole.Security,
		},
		{
			userId: 3,
			officeId: 103,
			fullName: { firstName: "Roberto", middleName: "Lim", lastName: "Garcia" },
			username: "rgarcia",
			email: "roberto.garcia@example.com",
			password: "userpass456",
			mobile: "555-555-5555",
			role: UserRole.Admin,
		},
		{
			userId: 4,
			officeId: 104,
			fullName: { firstName: "Maria", middleName: "Isabel", lastName: "Perez" },
			username: "mperez",
			email: "maria.perez@example.com",
			password: "mypassword789",
			mobile: "777-777-7777",
			role: UserRole.Security,
		},
		{
			userId: 5,
			officeId: 105,
			fullName: { firstName: "Pedro", middleName: "Jose", lastName: "Lopez" },
			username: "plopez",
			email: "pedro.lopez@example.com",
			password: "thepassword123",
			mobile: "999-999-9999",
			role: UserRole.Admin,
		},
	];

	const columns: ColumnsType<UserDataType> = [
		{
			title: "ID",
			dataIndex: "userId",
		},
		{
			title: "Name",
			dataIndex: "visitorDetails",
			sorter: (a, b) => a.fullName.lastName.localeCompare(b.fullName.lastName),
			render: (_, { fullName }) => {
				return `${fullName.lastName}, ${fullName.firstName} ${fullName.middleName}`;
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
			render: (_, { mobile }) => {
				return mobile;
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
		<Table columns={columns} dataSource={data} pagination={{ pageSize: 8 }} />
	);
}
