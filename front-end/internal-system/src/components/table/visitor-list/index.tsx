/* Built using Ant Design */
import React, { SetStateAction, Dispatch } from "react";
import { useSelector } from "react-redux";

// Components
import { Table, Tag, Button, Checkbox } from "antd";

//Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../../utils/enums";
import type { ColumnsType } from "antd/es/table";
import type { RootState } from "../../../store";

// Utils
import { formatDateString, formatDateObjToString } from "../../../utils";

// Assets
import { LoadingOutlined } from "@ant-design/icons";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface AdminTableProps {
	search: string;
	dateSearch: string[];
	hideInOut: boolean;
	setHideInOut: Dispatch<SetStateAction<boolean>>;
	addTab: (record: VisitorDataType) => void;
}

export default function VisitorListTable({
	search,
	dateSearch,
	hideInOut,
	setHideInOut,
	addTab,
}: AdminTableProps) {
	const { data, loading } = useSelector((state: RootState) => state.visitors);
	const startDate = new Date(dateSearch[0]);
	const endDate = new Date(dateSearch[1]);

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
			title: "Expected Time In",
			dataIndex: "expected_time_in",
			key: "expected_time_in",
			sorter: (a, b) =>
				formatDateString(a.expected_time_in).localeCompare(
					formatDateString(b.expected_time_in),
				),
			render: (_, { expected_time_in }) => {
				return formatDateString(expected_time_in);
			},
			hidden: hideInOut,
		},
		{
			title: "Expected Time Out",
			dataIndex: "expected_time_out",
			key: "expected_time_out",
			sorter: (a, b) =>
				formatDateString(a.expected_time_out).localeCompare(
					formatDateString(b.expected_time_out),
				),
			render: (_, { expected_time_out }) => {
				return formatDateString(expected_time_out);
			},
			hidden: hideInOut,
		},

		{
			title: "Date Created",
			dataIndex: "created_at",
			key: "created_at",
			sorter: (a, b) =>
				formatDateObjToString(a.created_at).localeCompare(
					formatDateObjToString(b.created_at),
				),
			render: (_, { created_at }) => {
				return formatDateObjToString(created_at);
			},
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
			title: "Action",
			key: "action",
			fixed: "right",
			render: (_, record) => (
				<Button onClick={() => addTab(record)}>View Details</Button>
			),
		},
	];

	return (
		<>
			<Checkbox onChange={() => setHideInOut(!hideInOut)}>
				Display Expected Time In and Out
			</Checkbox>
			<Table
				className="mt-3"
				columns={columns}
				loading={{
					spinning: loading,
					indicator: <LoadingOutlined />,
				}}
				dataSource={data
					.filter((visitor) => {
						return search.toLowerCase() === ""
							? visitor
							: visitor.visitor_details.name.first_name
									.toLowerCase()
									.includes(search.toLowerCase()) ||
									visitor.visitor_details.name
										.middle_name!.toLowerCase()
										.includes(search.toLowerCase()) ||
									visitor.visitor_details.name.last_name
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									`${visitor.visitor_details.name.last_name} ${visitor.visitor_details.name.first_name} ${visitor.visitor_details.name.middle_name}`
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									`${visitor.visitor_details.name.first_name}${
										visitor.visitor_details.name.middle_name
											? ` ${visitor.visitor_details.name.middle_name}`
											: ""
									} ${visitor.visitor_details.name.last_name}`
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									visitor.visitor_details.phone.includes(search) ||
									formatDateObjToString(visitor.created_at).includes(search);
					})
					.filter((visitor) => {
						return dateSearch.length === 0
							? visitor
							: hideInOut
								? new Date(visitor.expected_time_in) >= startDate &&
									new Date(visitor.expected_time_out) <= endDate
								: new Date(formatDateObjToString(visitor.created_at)) >=
										startDate &&
									new Date(formatDateObjToString(visitor.created_at)) <=
										endDate;
					})}
				pagination={{ pageSize: 8 }}
			/>
		</>
	);
}
