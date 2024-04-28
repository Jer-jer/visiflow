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
import AxiosInstance from "../../../lib/axios";
import dayjs, { Dayjs } from "dayjs";

interface CurrentVisitor {
	key: string;
	fullName: string;
	phone: string;
	expected_time_in: string;
	expected_time_out: string;
	status: string;
}
interface CurrentVisitorsTableProps {
	search: string;
	dateSearch: string[];
}

export default function CurrentVisitorsTable({
	search,
	dateSearch,
}: CurrentVisitorsTableProps) {
	const [data, setData] = useState<CurrentVisitor[]>([]);
	const startDate = new Date(dateSearch[0]);
	const endDate = new Date(dateSearch[1]);

	useEffect(() => {
		// Fetch visitors from backend
		AxiosInstance.get("/visitor/get-current-visitors")
			.then((res) => {
				console.log(res.data.activeVisitors);
				const mappedData = res.data.activeVisitors.map((visitor: any) => ({
					key: visitor._id,
					fullName: `${visitor.visitor_details.name.first_name} ${visitor.visitor_details.name.middle_name} ${visitor.visitor_details.name.last_name}`,
					phone: visitor.visitor_details.phone,
					expected_time_in: visitor.expected_time_in,
					expected_time_out: visitor.expected_time_out,
					status:
						Date.now() <= new Date(visitor.expected_time_out).getTime()
							? "active"
							: "exceeded",
				}));
				setData(mappedData);
				//console.log(mappedData);
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
					value: "exceeded",
				},
			],
			render: (_, { status }) => {
				let color;
				if (status === "active") color = "#0db284";
				else if (status === "exceeded") color = "#FD4A4A";
				return (
					<Tag
						className="text-auto text-[10px] md:text-[16px]"
						color={color}
						key={status}
					>
						{status.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.status.indexOf(value) === 0,
		},
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={data
					.filter((visitor) => {
						return search.toLowerCase() === ""
							? visitor
							: visitor.fullName.toLowerCase().includes(search.toLowerCase());
					})
					.filter((visitor) => {
						return dateSearch.length === 0
							? visitor
							: new Date(visitor.expected_time_in) >= startDate &&
									new Date(visitor.expected_time_out) <= endDate;
					})}
				pagination={{ pageSize: 10 }}
			/>
		</>
	);
}
