/* Built using Ant Design */
import React from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

//Interfaces
import { DataType } from "../../utils";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface AdminTableProps {
	addTab?: (record: DataType) => void;
}

const onChange: TableProps<DataType>["onChange"] = (
	pagination: any,
	filters: any,
	sorter: any,
	extra: any,
) => {
	console.log("params", pagination, filters, sorter, extra);
};

export default function AdminTable({ addTab }: AdminTableProps) {
	const add = () => {
		console.log("new tab");
	};

	const data: DataType[] = [
		{
			key: 1,
			id: "UVG4827",
			name: "John Brown",
			contact: "09125895226",
			visitorType: "Walk-in",
			date: "10-04-2023 4:50 AM",
		},
		{
			key: 2,
			id: "UVG9175",
			name: "John Jones",
			contact: "09455512348",
			visitorType: "Pre-Registered",
			date: "11-20-2023 8:25 PM",
		},
		{
			key: 3,
			id: "UVG3268",
			name: "Emily Johnson",
			contact: "09458451354",
			visitorType: "Pre-Registered",
			date: "10-08-2023 11:40 AM",
		},
		{
			key: 4,
			id: "UVG5902",
			name: "Benjamin Davis",
			contact: "09666255541",
			visitorType: "Walk-in",
			date: "12-01-2023 7:55 PM",
		},
		{
			key: 5,
			id: "UVG8741",
			name: "Olivia Smith",
			contact: "09854622541",
			visitorType: "Pre-Registered",
			date: "11-12-2023 3:10 AM",
		},
		{
			key: 6,
			id: "UVG1359",
			name: "Ethan Wilson",
			contact: "09885456825",
			visitorType: "Walk-in",
			date: "09-30-2023 1:20 AM",
		},
		{
			key: 7,
			id: "UVG7624",
			name: "Ava Anderson",
			contact: "09846588696",
			visitorType: "Walk-in",
			date: "09-19-2023 6:00 AM",
		},
		{
			key: 8,
			id: "UVG6498",
			name: "Liam Brown",
			contact: "09848458555",
			visitorType: "Pre-Registered",
			date: "10-28-2023 5:15 PM",
		},
		{
			key: 9,
			id: "UVG2083",
			name: "Sophia Lee",
			contact: "09789563215",
			visitorType: "Walk-in",
			date: "12-15-2023 9:45 AM",
		},
		{
			key: 10,
			id: "UVG5739",
			name: "Noah Martinez",
			contact: "09845612354",
			visitorType: "Walk-in",
			date: "11-03-2023 2:30 PM",
		},
	];

	const columns: ColumnsType<DataType> = [
		{
			title: "ID",
			dataIndex: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
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
			render: (_, { visitorType }) => {
				let color;
				if (visitorType === "Walk-in") color = "#E88B23";
				else if (visitorType === "Pre-Registered") color = "#0db284";
				return (
					<Tag color={color} key={visitorType}>
						{visitorType.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.visitorType.indexOf(value) === 0,
		},
		{
			title: "Date Created",
			dataIndex: "date",
			sorter: (a, b) => a.date.localeCompare(b.date),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => <Button onClick={add}>View Details</Button>,
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={data}
			onChange={onChange}
			pagination={{ pageSize: 8 }}
		/>
	);
}
