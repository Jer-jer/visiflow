import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./../../lib/socket";

//Components
import { Modal } from "antd";
import CustomDropdown from "../dropdown";

//Interfaces
import { NotificationType } from "../../utils/enums";
import { Notification, VisitorDataType } from "../../utils/interfaces";
import type { AppDispatch, RootState } from "../../store";
import type { MenuProps } from "antd";

//Reducers
import { add } from "../../states/visitors";

//Utils
import { formatDateObjToString, formatDateString } from "../../utils";

//Lib
import AxiosInstance from "../../lib/axios";

//Assets
import { Account } from "../../assets/svg";

//Styles
import "./styles.scss";

interface HeaderProps {
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsLoggedIn, setIsAdmin }: HeaderProps) {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [isConnected, setIsConnected] = useState(socket.connected);

	const { data } = useSelector((state: RootState) => state.visitors);

	const wasAdmin = localStorage.getItem("role");
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const error = (message: string) => {
		Modal.error({
			title: `Error`,
			content: message,
		});
	};

	const initialNotificaions = () => {
		AxiosInstance.get("/notification")
			.then((res) => {
				setNotifications(res.data.notifications);
			})
			.catch((err) => {
				error(
					err?.response?.data?.error ||
						err?.response?.data?.errors ||
						"Something went wrong with displaying notifications.",
				);
			});
	};

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
			setNotifications((prevNotifs) => [...prevNotifs, value]);
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
		wasAdmin && localStorage.removeItem("role");
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		setIsLoggedIn(false);
		navigate("/");
	};

	const findVisitor = (id: string) => {
		//? Search in the data array
		for (let index = 0; index < data.length; index++) {
			const element = data[index];
			//? Check if the element id matches
			if (element.visitor_details._id === id) {
				return index;
			}
			//? Search in the pals array of the element
			const companionIndex = element.companion_details!.findIndex(
				(p) => p._id === id,
			);
			if (companionIndex !== -1) {
				return index; //? Return a modified element with type VisitorDetailsProps
			}
		}
		return -1; //? Return -1 if not found
	};

	const getVisitorName = (id: string, visitor: VisitorDataType) => {
		//? Check if the visitor id matches the id
		if (visitor.visitor_details._id === id) {
			return visitor.visitor_details.name;
		} else {
			return visitor.companion_details!.find((p) => p._id === id)!.name;
		}
	};

	const hasUnread = () => {
		//? Check if there is an unread notification
		const hasAtLeastOneUnread = notifications.some(
			(notif) => notif.is_read === false,
		);

		if (hasAtLeastOneUnread) return true;

		return false;
	};

	const notificationType = (type: NotificationType) => {
		let message: string = "";
		switch (type) {
			case NotificationType.Confirmation:
				message = "Visitor Confirmation";
				break;
			case NotificationType.Declined:
				message = "Visitor Declined";
				break;
			case NotificationType.Pending:
				message = "New Visitor";
				break;
			case NotificationType.TimeIn:
				message = "Nearing Scheduled Time In";
				break;
			case NotificationType.TimeOut:
				message = "Exceeded Scheduled Time Out";
				break;
		}
		return message;
	};

	const notificationMessage = (type: NotificationType, visitor: number) => {
		let message: string = "An error occurred. Please try again.";
		if (data[visitor]) {
			switch (type) {
				case NotificationType.Confirmation:
					message = "has been confirmed at";
					break;
				case NotificationType.Declined:
					message = "has been declined at";
					break;
				case NotificationType.Pending:
					message = `has planned an appointment with the following: ${data[visitor].purpose.who.join(", ")} at the following: ${data[visitor].purpose.where.join(", ")} on ${formatDateString(data[visitor].purpose.when)}`;
					break;
				case NotificationType.TimeIn:
					message = "has yet to time in at";
					break;
				case NotificationType.TimeOut:
					message = "has exceeded their scheduled time out at";
					break;
			}
		}
		return message;
	};

	const notifTime = (
		type: NotificationType,
		visitor: VisitorDataType,
		created_at: Date,
	) => {
		let time: string = "";

		switch (type) {
			case NotificationType.Confirmation:
				time = formatDateObjToString(created_at);
				break;
			case NotificationType.Declined:
				time = formatDateObjToString(created_at);
				break;
			case NotificationType.Pending:
				time = formatDateObjToString(created_at);
				break;
			case NotificationType.TimeIn:
				time = formatDateString(visitor.expected_time_in);
				break;
			case NotificationType.TimeOut:
				time = formatDateString(visitor.expected_time_out);
				break;
		}
		return time;
	};

	const readNotification = (x: number, notif: Notification) => {
		//? Check if the notification is already read
		if (notifications[x].is_read) return;
		setNotifications((prev) => {
			return prev.map((n, y) => {
				if (y === x) {
					return { ...n, is_read: true };
				}
				return n;
			});
		});
		AxiosInstance.put("/notification/update", {
			_id: notif._id,
			is_read: true,
		}).catch((err) => {
			error(
				err?.response?.data?.error ||
					err?.response?.data?.errors ||
					"Something went wrong with updating the notification.",
			);
		});
	};

	const notificationMenuItems: MenuProps["items"] = notifications.map(
		(notif, x) => {
			const key = x + 1;
			return {
				label: (
					<div
						className="flex flex-row items-center justify-between"
						onMouseEnter={() => readNotification(x, notif)}
					>
						<div className="flex w-[90%] flex-col justify-center">
							<span className="text-lg font-bold">
								{notificationType(notif.type)}
							</span>
							<span className="text-[15px]">
								{data[findVisitor(notif.recipient)] ? (
									<>
										<span className="font-bold">
											{`${getVisitorName(notif.recipient, data[findVisitor(notif.recipient)]).last_name}, ${getVisitorName(notif.recipient, data[findVisitor(notif.recipient)]).first_name} ${getVisitorName(notif.recipient, data[findVisitor(notif.recipient)]).middle_name}`}
										</span>{" "}
										{notificationMessage(
											notif.type,
											findVisitor(notif.recipient),
										)}{" "}
										{notif.type !== NotificationType.Pending && (
											<span className="notice font-bold text-red-400">
												{notifTime(
													notif.type,
													data[findVisitor(notif.recipient)],
													notif.created_at,
												)}
											</span>
										)}
									</>
								) : (
									<span className="not-found font-bold text-error-500">
										[Visitor has been deleted]
									</span>
								)}
							</span>
							<span className="time fon mt-3 text-[14px] font-semibold text-primary-500">
								{notif.created_at && formatDateObjToString(notif.created_at)}
							</span>
						</div>
						{!notif.is_read && (
							<span className=" unread inline text-xs font-semibold text-primary-500">
								NEW
							</span>
						)}
					</div>
				),
				key: key.toString(),
			};
		},
	);

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a
					href="/"
					className="header-name btn btn-ghost text-xl normal-case hover:bg-transparent"
				>
					Gullas Visitor Management System
				</a>
			</div>
			<div className="flex-none">
				<CustomDropdown
					overlayClassName="notification-dropdown"
					items={notificationMenuItems}
				>
					<div
						tabIndex={0}
						className="btn btn-circle btn-ghost hover:bg-transparent hover:text-primary-500"
					>
						<div className="indicator">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
								/>
							</svg>
							{hasUnread() && (
								<span className="badge indicator-item badge-sm bg-red-500"></span>
							)}
						</div>
					</div>
				</CustomDropdown>

				<CustomDropdown
					overlayClassName="account-dropdown"
					items={[
						{
							key: "1",
							label: (
								<button
									onClick={() => {
										setIsAdmin(true);
										navigate("/");
									}}
									disabled={!wasAdmin}
								>
									Admin System
								</button>
							),
							disabled: !wasAdmin,
						},
						{
							key: "2",
							label: (
								<button
									onClick={() => {
										setIsAdmin(false);
										navigate("/");
									}}
									disabled={!wasAdmin}
								>
									Guard System
								</button>
							),
							disabled: !wasAdmin,
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
