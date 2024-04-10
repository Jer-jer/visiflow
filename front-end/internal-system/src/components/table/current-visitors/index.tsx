/* Built using Ant Design */
import React, { Dispatch, SetStateAction } from "react";

//Components
import { Checkbox, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces

//Utils
import { formatDateObjToString, formatDateToISO } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface CurrentVisitorsTableProps {
	hideInOut: boolean;
	setHideInOut: Dispatch<SetStateAction<boolean>>;
}

export default function CurrentVisitorsTable({
	hideInOut,
	setHideInOut,
}: CurrentVisitorsTableProps) {
	const data = [
		{
			key: "1",
			fullName: "Janusz Nricke Lim Omamalin",
			location: ["Human Resources Department", "Ground Floor", "Main Building"],
			expected_time_in: "2024-02-03T06:00:00.000Z",
			expected_time_out: "2024-02-03T06:00:00.000Z",
			time_in: "2024-02-03T06:00:00.000Z",
			time_out: "2024-02-03T06:00:00.000Z",
			status: "active",
		},
		{
			key: "2",
			fullName: "Allan Jericho Bargamento",
			location: ["Human Resources Department", "Ground Floor", "Main Building"],
			expected_time_in: "2024-02-03T06:00:00.000Z",
			expected_time_out: "2024-02-03T06:00:00.000Z",
			time_in: "2024-02-03T06:00:00.000Z",
			time_out: "2024-02-03T06:00:00.000Z",
			status: "active",
		},
		{
			key: "3",
			fullName: "Neil Collado",
			location: ["Human Resources Department", "Ground Floor", "Main Building"],
			expected_time_in: "2024-02-03T06:00:00.000Z",
			expected_time_out: "2024-02-03T06:00:00.000Z",
			time_in: "2024-02-03T06:00:00.000Z",
			time_out: "2024-02-03T06:00:00.000Z",
			status: "exceeded_time_out",
		},
	];

	const columns: ColumnsType = [
		{
			title: "Full Name",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			render: (value, record) => {
				return value.map((loc: string) => `${loc}, `);
			},
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
			title: "Time-out",
			dataIndex: "time_out",
			key: "time_out",
			sorter: (a, b) =>
				formatDateToISO(new Date(a.time_out))!.localeCompare(
					formatDateToISO(new Date(b.time_out))!,
				),
			render: (_, { time_out }) => {
				return formatDateObjToString(time_out);
			},
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
