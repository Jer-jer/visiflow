/* Built using Ant Design */
import React from "react";

//Components
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { VisitorLogDetails } from "../../../utils/interfaces";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function CurrentVisitorsTable() {
	const data: VisitorLogDetails[] = [
		{
			key: "1",
			purpose: "Meeting with Client",
			timeIn: "2023-09-15 09:30 AM",
			timeOut: "2023-09-15 11:00 AM",
		},
		{
			key: "2",
			purpose: "Interview",
			timeIn: "2023-09-16 02:45 PM",
			timeOut: "2023-09-16 04:15 PM",
		},
		{
			key: "3",
			purpose: "Conference Call",
			timeIn: "2023-09-17 10:15 AM",
			timeOut: "2023-09-17 11:30 AM",
		},
		{
			key: "4",
			purpose: "Lunch Break",
			timeIn: "2023-09-18 12:30 PM",
			timeOut: "2023-09-18 01:30 PM",
		},
		{
			key: "5",
			purpose: "Training Session",
			timeIn: "2023-09-19 03:00 PM",
			timeOut: "2023-09-19 05:00 PM",
		},
		{
			key: "6",
			purpose: "Staff Meeting",
			timeIn: "2023-09-20 09:00 AM",
			timeOut: "2023-09-20 10:30 AM",
		},
		{
			key: "7",
			purpose: "Visitor Registration",
			timeIn: "2023-09-21 11:15 AM",
			timeOut: "2023-09-21 12:45 PM",
		},
		{
			key: "8",
			purpose: "Site Inspection",
			timeIn: "2023-09-22 01:30 PM",
			timeOut: "2023-09-22 03:00 PM",
		},
	];

	const columns: ColumnsType<VisitorLogDetails> = [
		{
			title: "Purpose",
			dataIndex: "purpose",
			key: "purpose",
		},
		{
			title: "Time In",
			dataIndex: "timeIn",
			key: "timeIn",
			sorter: (a, b) => a.timeIn.localeCompare(b.timeIn),
		},
		{
			title: "Time Out",
			dataIndex: "timeOut",
			key: "timeOut",
			sorter: (a, b) => a.timeOut.localeCompare(b.timeOut),
		},
	];

	return (
		<Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
	);
}