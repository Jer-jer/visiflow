/* Built using Ant Design */
import React, { useState, useEffect } from "react";

//Components
import { Button, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search } from "../../../assets/svg";

//Interfaces

//Utils
import type { Dayjs } from "dayjs";
import { formatDateObjToString, formatDateToISO } from "../../../utils";
import DateTimePicker from "../../../components/datetime-picker";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";
import AxiosInstance from "../../../lib/axios";
import { VisitorDataType } from "../../../utils/interfaces";
import { BadgeStatus } from "../../../utils/enums";
import ScheduleDetails from "../../../layouts/guard/visitor-status-details";

// interface CurrentVisitor {
// 	key: string;
// 	fullName: string;
// 	phone: string;
// 	expected_time_in: string;
// 	expected_time_out: string;
// 	status: string;
// }

export default function CurrentVisitorsTable({

}) {
	const [pageDetail, setPageDetail] = useState<any>();
	const [openDetails, setOpenDetails] = useState(false);
	const [data, setData] = useState<VisitorDataType[]>([]);

	const [search, setSearch] = useState<string>("");
	const [dateSearch, setDateSearch] = useState<string[]>([]);
	//const [hideInOut, setHideInOut] = useState<boolean>(true);

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
	};

	useEffect(() => {
		// Fetch visitors from backend
		fetchCurrentVisitor();
	}, []);

	const fetchCurrentVisitor = () => {
		AxiosInstance.get("/visitor/get-current-visitors")
		.then((res) => {
			console.log(res.data.activeVisitors);
			const mappedData: VisitorDataType[] = res.data.activeVisitors.map((visitor: any): VisitorDataType => ({
				...visitor,
				badge_status: setCurrentStatus(visitor.expected_time_out),
			}));
			setData(mappedData);
			//console.log(mappedData);
		})
		.catch((error) => {
			console.error("Failed to fetch visitors:", error);
		});
	}

	const setCurrentStatus = (expected_time_out: Date) => {
		const currentTime = Date.now();
		const expectedTimeOut = new Date(expected_time_out).getTime();

		let status: BadgeStatus;
		if (currentTime <= expectedTimeOut) {
			status = BadgeStatus.active;
		} else if (currentTime - expectedTimeOut > 24 * 60 * 60 * 1000) {
			status = BadgeStatus.overdue;
		} else {
			status = BadgeStatus.exceeded;
		}
		return status;
	}

	const edit = (record: any) => {
		setPageDetail(record);
		setOpenDetails(!openDetails);
	};

	const newEvent = () => {
		setPageDetail(undefined);
		setOpenDetails(!openDetails);
	};

	const columns: ColumnsType = [
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
			dataIndex: "badge_status",
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
			render: (_, { badge_status }) => {
				let color;
				if (badge_status === BadgeStatus.active) color = "#0db284";
				else if (badge_status === BadgeStatus.exceeded) color = "#FFA500";
				else if (badge_status === BadgeStatus.overdue) color = "#FD4A4A"
				return (
					<Tag
						className="text-auto text-[10px] md:text-[16px]"
						color={color}
						key={badge_status}
					>
						{badge_status.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.status.indexOf(value) === 0,
		},
		{
			key: "action",
			width: "30%",
			render: (_, record) => (
				<>
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(record)}>
						View
					</Button>
				</>
			),
		},
	];

	return (
		<>
			{!openDetails && (
				<>
					<div className="mb-[50px] ml-[15px]">
						<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
							<Input
								className="w-[366px]"
								size="large"
								placeholder="Search"
								prefix={<Search />}
								onChange={(e) => setSearch(e.target.value)}
							/>

							<DateTimePicker size="large" onRangeChange={onRangeChange} />
						</div>
					</div>
					<Table
					columns={columns}
					dataSource={data
						.filter((visitor) => {
							return search.toLowerCase() === ""
								? visitor
								: (`${visitor.visitor_details.name.first_name} ${visitor.visitor_details.name.middle_name} ${visitor.visitor_details.name.last_name} `).toLowerCase().includes(search.toLowerCase());
						})
						.filter((visitor) => {
							return dateSearch.length === 0
								? visitor
								: new Date(visitor.expected_time_in) >= new Date(dateSearch[0])  &&
										new Date(visitor.expected_time_out) <= new Date(dateSearch[1]);
						})}
					pagination={{ pageSize: 10 }}/>
				</>
				
			)}
			{openDetails && (
					<ScheduleDetails
						record={pageDetail}
						setOpenDetails={setOpenDetails}
						fetch={fetchCurrentVisitor}
					/>
			)}
		</>
	);
}
