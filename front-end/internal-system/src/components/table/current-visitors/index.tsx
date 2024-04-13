/* Built using Ant Design */
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

//Components
import { Checkbox, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces

//Utils
import { formatDateObjToString, formatDateToISO } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface CurrentVisitor {
	key: string;
	fullName: string;
	phone: string;
	expected_time_in: string;
	expected_time_out: string;
	time_in: string;
	status: string;
}
interface CurrentVisitorsTableProps {
	hideInOut: boolean;
	setHideInOut: Dispatch<SetStateAction<boolean>>;
}

export default function CurrentVisitorsTable({
	hideInOut,
	setHideInOut,
}: CurrentVisitorsTableProps) {
	const [data, setData] = useState<CurrentVisitor[]>([]);

	useEffect(() => {
		// Fetch visitors from backend
		fetch("/visitor/get-current-visitors")
			.then((res) => res.json())
			.then((data) => {
				// Map fetched visitors to match the structure of your table data
				const mappedData = data.visitors.map((visitor: any) => ({
					key: visitor._id,
					fullName: visitor.name,
					phone: visitor.phone,
					expected_time_in: visitor.expected_time_in,
					expected_time_out: visitor.expected_time_out,
					time_in: visitor.time_in,
					status: visitor.status,
				}));
				setData(mappedData);
			})
			.catch((error) => {
				console.error("Failed to fetch visitors:", error);
			});
	}, []);

	const columns: ColumnsType = [
		{
			title: "Full Name",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: "Mobile #",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Expected Time-in",
			dataIndex: "expected_time_in",
			key: "expected_time_in",
			sorter: (a, b) =>
				formatDateToISO(new Date(a.expected_time_in))!.localeCompare(
					formatDateToISO(new Date(b.expected_time_in))!,
				),
			render: (_, { expected_time_in }) => {
				return formatDateObjToString(expected_time_in);
			},
			hidden: hideInOut,
		},
		{
			title: "Expected Time-out",
			dataIndex: "expected_time_out",
			key: "expected_time_out",
			sorter: (a, b) =>
				formatDateToISO(new Date(a.expected_time_in))!.localeCompare(
					formatDateToISO(new Date(b.expected_time_out))!,
				),
			render: (_, { expected_time_out }) => {
				return formatDateObjToString(expected_time_out);
			},
			hidden: hideInOut,
		},
		{
			title: "Time-in",
			dataIndex: "time_in",
			key: "time_in",
			sorter: (a, b) =>
				formatDateToISO(new Date(a.time_in))!.localeCompare(
					formatDateToISO(new Date(b.time_in))!,
				),
			render: (_, { time_in }) => {
				return formatDateObjToString(time_in);
			},
			defaultSortOrder: "descend",
		},
		{
			title: "Status",
			dataIndex: "status",
			filters: [
				{
					text: "Active",
					value: "active",
				},
				{
					text: "Exceeded Time-out",
					value: "exceeded_time_out",
				},
			],
			render: (_, { status }) => {
				let color;
				if (status === "active") color = "#0db284";
				else if (status === "exceeded_time_out") color = "#FD4A4A";
				return (
					<Tag color={color} key={status}>
						{status.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.role.indexOf(value) === 0,
		},
	];

	return (
		<>
			<Checkbox onChange={() => setHideInOut(!hideInOut)}>
				Display Expected Time In and Out
			</Checkbox>

			<Table
				columns={columns}
				dataSource={data}
				pagination={{ pageSize: 10 }}
			/>
		</>
	);
}
