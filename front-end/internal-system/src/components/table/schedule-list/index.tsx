/* Built using Ant Design */
import React, { useEffect, useState, SetStateAction, Dispatch } from "react";
import { Table, Tag, Button, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import AxiosInstace from "../../../lib/axios";
import { LoadingOutlined } from "@ant-design/icons";

//Interfaces
import {
	VisitorDataType,
	VisitorDetailsProps,
} from "../../../utils/interfaces";
import { BadgeStatus, VisitorStatus, VisitorType } from "../../../utils/enums";
import { formatDateObjToString, formatDateObjToString2, formatDateToISO } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ScheduleListTableProps {
	addTab: (record: VisitorDataType) => void;
	dateSearch: string[];
	search: string;
	hideInOut: boolean;
	setHideInOut: Dispatch<SetStateAction<boolean>>;
	checkedList: string[];
}

export default function ScheduleListTable({
	addTab,
	dateSearch,
	search,
	hideInOut,
	setHideInOut,
	checkedList,
}: ScheduleListTableProps) {
	const { badges, loading } = useSelector((state: RootState) => state.badges);

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
				return `${visitor_details.name.last_name}, ${visitor_details.name.first_name} ${visitor_details.name.middle_name ? visitor_details.name.middle_name : ""}`;
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
			render: (_, { visitor_details }) => {
				return visitor_details.phone;
			},
			responsive: ["md"],
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
			responsive: ["md"],
		},
		{
			title: "Expected Time-in and Time-out",
			key: "expected_time_in - expected_time_out",
			render: (_, { expected_time_in, expected_time_out }) => {
				return (
					<>
						<p>{formatDateObjToString(expected_time_in)}</p>
						<p>{formatDateObjToString(expected_time_out)}</p>
					</>
				);
			},
			responsive: ["xs"],
		},
		{
			title: "Expected Time In",
			dataIndex: "expected_time_in",
			key: "expected_time_in",
			sorter: (a, b) =>
			formatDateToISO(new Date(a.expected_time_in))!.localeCompare(
				formatDateToISO(new Date(b.expected_time_in))!,
			),
			render: (_, { expected_time_in }) => {
				return formatDateObjToString2(expected_time_in);
			},
			responsive: ["md"],
		},
		{
			title: "Expected Time Out",
			dataIndex: "expected_time_out",
			key: "expected_time_out",
			sorter: (a, b) =>
				formatDateToISO(new Date(a.expected_time_in))!.localeCompare(
					formatDateToISO(new Date(b.expected_time_out))!,
				),
			render: (_, { expected_time_out }) => {
				return formatDateObjToString2(expected_time_out);
			},
			responsive: ["md"],
		},
		{
			title: "Status",
			dataIndex: "badge_status",
			filters: [
				{
					text: "Inactive",
					value: "inactive",
				},
				{
					text: "Active",
					value: "active",
				},
				{
					text: "Exceeded Time-out",
					value: "exceeded",
				},
				{
					text: "Overdue",
					value: "overdue",
				},
			],
			render: (_, { badge_status }) => {
				let color;
				if (badge_status === BadgeStatus.active) color = "#0db284";
				else if (badge_status === BadgeStatus.exceeded) color = "#FFA500";
				else if (badge_status === BadgeStatus.overdue) color = "#FD4A4A"
				else if (badge_status === BadgeStatus.inactive) color = "#D0D2CC"
				return (
					<Tag
						className="text-auto text-[10px] md:text-[16px]"
						color={color}
						key={badge_status}
					>
						{badge_status?.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.badge_status?.indexOf(value) === 0,
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<>
					<Button
						className="ml-4"
						onClick={() => {
							addTab(record);
						}}
					>
						View
					</Button>
				</>
			),
		},
	];

	const filteredSched = badges
		.filter((visitor) => {
			return (
				visitor.status === "Approved" &&
				(search.toLowerCase() === ""
					? true
					: `${visitor.visitor_details.name.last_name}, ${visitor.visitor_details.name.first_name} ${visitor.visitor_details.name.middle_name || ""}`
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						`${visitor.visitor_details.name.first_name}${visitor.visitor_details.name.middle_name ? ` ${visitor.visitor_details.name.middle_name}` : ""} ${visitor.visitor_details.name.last_name}`
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						visitor.visitor_details.phone.includes(search) ||
						formatDateObjToString(visitor.created_at).includes(search))
			);
		})
		.filter((visitor) => {
			return dateSearch.length === 0
				? visitor
				: hideInOut
					? new Date(formatDateObjToString(visitor.created_at)) >= startDate &&
						new Date(formatDateObjToString(visitor.created_at)) <= endDate
					: new Date(visitor.expected_time_in) >= startDate &&
						new Date(visitor.expected_time_out) <= endDate;
		})
		.filter((visitor) => {
			// Filter based on checkedList
			if (checkedList.length === 0) return true;

			const currentTime = new Date().getTime();
			const expectedTimeIn = new Date(visitor.expected_time_in).getTime();
			const expectedTimeOut = new Date(visitor.expected_time_out).getTime();

			return checkedList.some((item) => {
				switch (item) {
					case "past":
						return expectedTimeOut < currentTime;
					case "current":
						return (
							expectedTimeIn < currentTime && expectedTimeOut > currentTime
						);
					case "upcoming":
						return expectedTimeIn > currentTime;
					default:
						return false;
				}
			});
		});

	return (
		<div>
			<p>Total Items: {filteredSched.length}</p>
			<Table
				className="w-full overflow-x-auto"
				columns={columns}
				loading={{
					spinning: loading,
					indicator: <LoadingOutlined />,
				}}
				dataSource={filteredSched}
				pagination={{ pageSize: 8 }}
			/>
		</div>
	);
}
