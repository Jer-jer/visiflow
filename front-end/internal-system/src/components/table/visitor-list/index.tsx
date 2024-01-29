/* Built using Ant Design */
import React from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../../utils/enums";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface AdminTableProps {
	visitors: VisitorDataType[];
	addTab: (record: VisitorDataType) => void;
}

export default function VisitorListTable({
	visitors,
	addTab,
}: AdminTableProps) {
	const columns: ColumnsType<VisitorDataType> = [
		{
			title: "ID",
			dataIndex: "visitor_id",
			render: (_, { visitor_details }) => {
				return visitor_details.visitor_id;
			},
		},
		{
			title: "Name",
			dataIndex: "visitor_details",
			sorter: (a, b) =>
				a.visitor_details.name.last_name.localeCompare(
					b.visitor_details.name.last_name,
				),
			render: (_, { visitor_details }) => {
				return `${visitor_details.name.last_name}, ${visitor_details.name.first_name} ${visitor_details.name.middle_name}`;
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
			render: (_, { visitor_details }) => {
				return visitor_details.phone;
			},
		},
		{
			title: "Visitor Type",
			dataIndex: "visitorType",
			filters: [
				{
					text: "Walk-in",
					value: "Walk-in",
				},
				{
					text: "Pre-Registered",
					value: "Pre-Registered",
				},
			],
			render: (_, { visitor_type }) => {
				let color;
				if (visitor_type === VisitorType.WalkIn) color = "#E88B23";
				else if (visitor_type === VisitorType.PreRegistered) color = "#0db284";
				return (
					<Tag color={color} key={visitor_type}>
						{visitor_type.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) =>
				record.visitor_type.indexOf(value) === 0,
		},
		{
			title: "Date Created",
			dataIndex: "date",
			sorter: (a, b) => a.date.localeCompare(b.date),
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
		<Table
			columns={columns}
			dataSource={visitors}
			pagination={{ pageSize: 8 }}
		/>
	);
}
