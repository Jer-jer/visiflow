import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import Notifications from "react-notifications-menu";
import { jwtDecode } from "jwt-decode";

//Components
import { Modal } from "antd";
import CustomDropdown from "../dropdown";

//Interfaces
import { NotificationType } from "../../utils/enums";
import { VisitorDataType, NotificationProps } from "../../utils/interfaces";
import {
	NotificationStoreProps,
	fetchNotifs,
} from "../../states/notifications";
import type { AppDispatch, RootState } from "../../store";

//Reducers
import { add } from "../../states/visitors";
import { addNotif, readNotif } from "../../states/notifications";
import { changeRole } from "../../states/roles";

//Utils
import {
	formatDateObjToString,
	notificationType,
	notificationMessage,
} from "../../utils";

//Lib
import AxiosInstance from "../../lib/axios";
import { socket } from "./../../lib/socket";

//Assets
import { Account } from "../../assets/svg";
import NotificationSound from "../../assets/notification.wav";

//Styles
import "./styles.scss";

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

export default function Header() {
	//? Socket Connection
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [isAdmin, setIsAdmin] = useState(false);

	//? Redux
	const notifications = useSelector((state: RootState) => state.notifications);

	const [play] = useSound(NotificationSound, { volume: 1, soundEnabled: true });

	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const initialNotificaions = () => {
		AxiosInstance.get("/notification")
			.then((res) => {
				const unreadNotifications = res.data.notifications.filter(
					(notif: NotificationProps) => !notif.is_read,
				);
				const notifications: NotificationStoreProps[] = unreadNotifications.map(
					(notif: NotificationProps) => {
						return {
							key: notif._id,
							name: notif.content.visitor_name,
							message: notificationMessage(notif.type, notif.content),
							time_in: notif.content.time_in,
							time_out: notif.content.time_out,
							receivedTime: notif.created_at,
							type: notif.type,
							is_read: notif.is_read,
						};
					},
				);
				dispatch(fetchNotifs(notifications));
			})
			.catch((err) => {
				error(
					err?.response?.data?.error ||
						err?.response?.data?.errors ||
						"Something went wrong with displaying notifications. Please refresh the page",
				);
			});
	};

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const decoded: any = jwtDecode(token);

			/*
			 * Roles:
			 * admin
			 * security
			 */
			if (decoded.role === "admin") {
				setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
		}
	}, []);

	useEffect(() => {
		//? Real-Time Watcher
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onNewVisitor(value: VisitorDataType) {
			dispatch(add(value));
		}

		function onNewNotification(value: any) {
			dispatch(
				addNotif({
					key: value._id,
					name: value.content.visitor_name,
					message: notificationMessage(value.type, value.content),
					time_in: value.content.time_in,
					time_out: value.content.time_out,
					receivedTime: value.created_at,
					type: value.type,
					is_read: value.is_read,
				}),
			);
			play();
		}

		initialNotificaions();

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("newVisitor", onNewVisitor);
		socket.on("newNotification", onNewNotification);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("newVisitor", onNewVisitor);
			socket.off("newNotification", onNewNotification);
		};
	}, []);

	const logout = () => {
		window.location.reload();
		localStorage.clear();
	};

	const readNotification = (notif: NotificationStoreProps) => {
		//? Check if the notification is already read
		if (notif.is_read) return;
		AxiosInstance.put("/notification/update", {
			_id: notif.key,
			is_read: true,
		}).catch((err) => {
			error(
				err?.response?.data?.error ||
					err?.response?.data?.errors ||
					"Something went wrong with updating the notification.",
			);
		});

		dispatch(readNotif(notif.key));
	};

	const notifType = (type: NotificationType, notif: NotificationStoreProps) => {
		switch (type) {
			case NotificationType.TimeIn:
				return formatDateObjToString(notif.time_in);
			case NotificationType.TimeOut:
				return formatDateObjToString(notif.time_out);
			case NotificationType.Confirmation:
				return formatDateObjToString(notif.receivedTime);
			case NotificationType.Declined:
				return formatDateObjToString(notif.receivedTime);
			case NotificationType.Pending:
				return formatDateObjToString(notif.receivedTime);
			default:
				return "";
		}
	};

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a
					href="/"
					className="header-name btn btn-ghost text-base normal-case hover:bg-transparent md:text-xl"
				>
					Gullas Visitor Management System
				</a>
			</div>
			<div className="flex-none">
				<Notifications
					data={notifications}
					icon="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-512.png"
					header={{
						title: "Notifications",
						option: { text: "", onClick: () => console.log("Clicked") },
					}}
					viewAllBtn={{
						text: "View All",
						linkTo: "/notifications",
					}}
					notificationCard={(data: any) => (
						<div
							key={data.data.key}
							className="notification flex flex-row items-end justify-between gap-[2px] px-[10px] py-[8px] transition hover:bg-primary-500"
							onMouseLeave={() => readNotification(data.data)}
						>
							<div className="flex w-full flex-col justify-center">
								<span className="font-bold">
									{notificationType(data.data.type)}
								</span>
								<span>
									<span className="font-bold">{data.data.name}</span>{" "}
									{data.data.message}{" "}
									<span className="font-bold">
										{notifType(data.data.type, data.data)}
									</span>
								</span>
							</div>
							{!data.data.is_read && (
								<span className="unread inline pr-[10px] font-semibold text-primary-500">
									NEW
								</span>
							)}
						</div>
					)}
				/>

				<CustomDropdown
					overlayClassName="account-dropdown"
					items={[
						{
							key: "1",
							label: (
								<button
									onClick={() => {
										dispatch(changeRole(true));
										navigate("/dashboard");
									}}
									disabled={!isAdmin}
								>
									Admin System
								</button>
							),
							disabled: !isAdmin,
						},
						{
							key: "2",
							label: (
								<button
									onClick={() => {
										dispatch(changeRole(false));
										navigate("/qr-scanner");
									}}
									disabled={!isAdmin}
								>
									Guard System
								</button>
							),
							disabled: !isAdmin,
						},
						{
							key: "3",
							label: <button onClick={logout}>Logout</button>,
						},
					]}
				>
					<div
						tabIndex={0}
						className="avatar btn btn-circle btn-ghost hover:bg-transparent"
					>
						<Account />
					</div>
				</CustomDropdown>
			</div>
		</div>
	);
}
