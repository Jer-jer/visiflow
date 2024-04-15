import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Interface
import type { Dayjs } from "dayjs";
import type { TableProps } from "antd";
import { NotificationType } from "../../utils/enums";
import { NotificationProps } from "../../utils/interfaces";

// Components
import { Table, Tag, Modal, Tooltip, Input } from "antd";
import OuterContainer from "../../components/container";
import InnerContainer from "../../components/container/inner-container";
import DateTimePicker from "../../components/datetime-picker";

// Lib
import AxiosInstance from "../../lib/axios";

// Utils
import {
	notificationType,
	notificationMessage,
	formatDateObjToString,
	formatDateToISO,
} from "../../utils";

// Assets
import { LoadingOutlined } from "@ant-design/icons";
import { Search } from "../../assets/svg";

// Styles
import "./styles.scss";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const columns: TableProps<NotificationProps>["columns"] = [
	{
		title: "Name",
		dataIndex: "content",
		key: "name",
		render: (value, record, index) => {
			return <span className="font-bold">{value.visitor_name}</span>;
		},
	},
	{
		title: "Content",
		dataIndex: "content",
		key: "content",
		render: (value, record, index) => {
			return (
				<span>
					{notificationMessage(record.type, value)}{" "}
					{record.type === NotificationType.TimeIn ? (
						<span className="font-bold">
							{formatDateObjToString(value.time_in)}
						</span>
					) : (
						record.type === NotificationType.TimeOut && (
							<span className="font-bold">
								{formatDateObjToString(value.time_out)}
							</span>
						)
					)}
				</span>
			);
		},
	},
	{
		title: "Type",
		dataIndex: "type",
		key: "type",
		filters: [
			{
				text: "Confirmation",
				value: NotificationType.Confirmation,
			},
			{
				text: "Pending",
				value: NotificationType.Pending,
			},
			{
				text: "Declined",
				value: NotificationType.Declined,
			},
			{
				text: "Time In",
				value: NotificationType.TimeIn,
			},
			{
				text: "Time Out",
				value: NotificationType.TimeOut,
			},
		],
		render: (_, { type }) => {
			let color = "";
			if (type === NotificationType.Confirmation) color = "#0db284";
			else if (type === NotificationType.Declined) color = "#FD4A4A";
			else if (type === NotificationType.TimeIn) color = "#E88B23";
			else if (type === NotificationType.TimeOut) color = "#ffce0a";
			else if (type === NotificationType.Pending) color = "#E88B23";
			return (
				<Tag color={color} key={type}>
					{notificationType(type).toUpperCase()}
				</Tag>
			);
		},
		onFilter: (value: any, record) => record.type.indexOf(value) === 0,
	},
	{
		title: "Created at",
		dataIndex: "created_at",
		key: "created_at",
		sorter: (a, b) =>
			formatDateToISO(new Date(a.created_at))!.localeCompare(
				formatDateToISO(new Date(b.created_at))!,
			),
		render(value, record, index) {
			return formatDateObjToString(record.created_at);
		},
		defaultSortOrder: "descend",
	},
];

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

function NotificationsLayout() {
	const [loading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState<NotificationProps[]>([]);

	//? This is the search state
	const [search, setSearch] = useState<string>("");
	const [dateSearch, setDateSearch] = useState<string[]>([]);

	useEffect(() => {
		setLoading(true);
		AxiosInstance.get("/notification")
			.then((response) => {
				if (response.data.notifications.length > 0) {
					const notifs: NotificationProps[] = response.data.notifications.map(
						(notif: NotificationProps) => {
							return {
								...notif,
								key: notif._id,
							};
						},
					);
					if (notifs.length > 0) {
						setNotifications(notifs);
					}
				}
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				error(err.response.data.error);
			});
	}, []);

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
	};

	return (
		<OuterContainer header="Notifications">
			<InnerContainer additionalStyles="flex flex-col gap-[50px]">
				<div className="flex gap-10">
					<Input
						className="w-[366px]"
						size="large"
						placeholder="Search"
						prefix={<Search />}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Tooltip title="Filter Created At">
						<div className="w-fit">
							<DateTimePicker size="large" onRangeChange={onRangeChange} />
						</div>
					</Tooltip>
				</div>

				<Table
					loading={{
						spinning: loading,
						indicator: <LoadingOutlined />,
					}}
					columns={columns}
					dataSource={notifications
						.filter((notification) => {
							return search.toLowerCase() === ""
								? notification
								: notification.content.visitor_name
										.toLowerCase()
										.includes(search.toLowerCase()) ||
										formatDateObjToString(notification.created_at).includes(
											search,
										);
						})
						.filter((notification) => {
							return dateSearch.length === 0
								? notification
								: new Date(formatDateObjToString(notification.created_at)) >=
										new Date(dateSearch[0]) &&
										new Date(formatDateObjToString(notification.created_at)) <=
											new Date(dateSearch[1]);
						})}
				/>
			</InnerContainer>
		</OuterContainer>
	);
}

export default NotificationsLayout;
