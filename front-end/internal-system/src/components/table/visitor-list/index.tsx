/* Built using Ant Design */
import React from "react";
import { useSelector } from "react-redux";

// Components
import { Table, Tag, Button } from "antd";

//Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../../utils/enums";
import type { ColumnsType } from "antd/es/table";

// Utils
import { formatDate } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface AdminTableProps {
	addTab: (record: VisitorDataType) => void;
}

export default function VisitorListTable({ addTab }: AdminTableProps) {
	const { data } = useSelector((state: any) => state.visitors);

	const columns: ColumnsType<VisitorDataType> = [
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
			title: "Status",
			dataIndex: "status",
			filters: [
				{
					text: "Approved",
					value: "Approved",
				},
				{
					text: "In Progress",
					value: "In Progress",
				},
				{
					text: "Declined",
					value: "Declined",
				},
			],
			render: (_, { status }) => {
				let color;
				if (status === VisitorStatus.InProgress) color = "#D0D2CC";
				else if (status === VisitorStatus.Approved) color = "#0db284";
				else if (status === VisitorStatus.Declined) color = "#FD4A4A";
				return (
					<Tag color={color} key={status}>
						{status.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) =>
				record.visitor_type.indexOf(value) === 0,
		},
		{
			title: "Date Created",
			dataIndex: "created_at",
			key: "created_at",
			sorter: (a, b) =>
				formatDate(a.created_at!).localeCompare(formatDate(b.created_at!)),
			render: (_, { created_at }) => {
				return formatDate(created_at!);
			},
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
