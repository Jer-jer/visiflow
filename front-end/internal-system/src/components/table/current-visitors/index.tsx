/* Built using Ant Design */
import React, { useState, useEffect } from "react";

//Components
import { Button, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search } from "../../../assets/svg";

//Assets
import { LoadingOutlined } from "@ant-design/icons";

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
import VisitorStatusDetails from "../../../layouts/guard/visitor-status-details";

// interface CurrentVisitor {
// 	key: string;
// 	fullName: string;
// 	phone: string;
// 	expected_time_in: string;
// 	expected_time_out: string;
// 	status: string;
// }

export default function CurrentVisitorsTable({}) {
	const desktopMedia = window.matchMedia("(min-width: 1024px)");

	const [loading, setLoading] = useState<boolean>(false);
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
		setLoading(true);
		AxiosInstance.get("/visitor/get-current-visitors")
		.then((res) => {
			console.log(res);
			const mappedData: VisitorDataType[] = res.data.response.map((res: any): VisitorDataType => ({
				...res.visitor,
				badge_status: res.badge.status,
				badge_id: res.badge._id
			}));
			setData(mappedData);
			setLoading(false);
			//console.log(mappedData);
		})
		.catch((error) => {
			console.error("Failed to fetch visitors:", error);
			setLoading(false);
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
	};

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
			title: "Mobile #",
			dataIndex: "phone",
			key: "phone",
			render: (_, { visitor_details }) => {
				return visitor_details.phone;
			},
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
			responsive: ["md"],
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
			responsive: ["md"],
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
				{
					text: "Overdue",
					value: "overdue",
				},
			],
			render: (_, { badge_status }) => {
				let color;
				if (badge_status === BadgeStatus.active) color = "#0db284";
				else if (badge_status === BadgeStatus.exceeded) color = "#FFA500";
				else if (badge_status === BadgeStatus.overdue) color = "#FD4A4A";
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
			onFilter: (value: any, record) => record.badge_status.indexOf(value) === 0,
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<>
					<Button className="ml-4" onClick={() => edit(record)}>
						View
					</Button>
				</>
			),
			responsive: ["md"],
		},
	];

	return (
		<>
			{!openDetails && (
				<>
					<div className="mb-[50px] ml-[15px]">
						<div className="flex w-full flex-col items-center justify-start gap-[25px] pr-[65px] md:flex-row">
							<Input
								className="md:w-[366px]"
								size={desktopMedia.matches ? "large" : "middle"}
								placeholder="Search"
								prefix={<Search />}
								onChange={(e) => setSearch(e.target.value)}
							/>

							<DateTimePicker
								size={desktopMedia.matches ? "large" : "middle"}
								onRangeChange={onRangeChange}
							/>
						</div>
					</div>
					<Table
						className="w-full overflow-x-auto"
						loading={{
							spinning: loading,
							indicator: <LoadingOutlined />,
						}}
						columns={columns}
						dataSource={data
							.filter((visitor) => {
								return search.toLowerCase() === ""
									? visitor
									: `${visitor.visitor_details.name.first_name} ${visitor.visitor_details.name.middle_name} ${visitor.visitor_details.name.last_name} `
											.toLowerCase()
											.includes(search.toLowerCase());
							})
							.filter((visitor) => {
								return dateSearch.length === 0
									? visitor
									: new Date(visitor.expected_time_in) >=
											new Date(dateSearch[0]) &&
											new Date(visitor.expected_time_out) <=
												new Date(dateSearch[1]);
							})}
						pagination={{ pageSize: 10 }}
					/>
				</>
			)}
			{openDetails && (
					<VisitorStatusDetails
						record={pageDetail}
						setOpenDetails={setOpenDetails}
						fetch={fetchCurrentVisitor}
					/>
			)}
		</>
	);
}
