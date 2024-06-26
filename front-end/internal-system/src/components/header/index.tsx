import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import Notifications from "react-notifications-menu";
import { jwtDecode } from "jwt-decode";
import { saveAs } from "file-saver";

//Components
import { Modal, Tooltip, InputNumber } from "antd";
import CustomDropdown from "../dropdown";

//Interfaces
import { NotificationType } from "../../utils/enums";
import { VisitorDataType, NotificationProps } from "../../utils/interfaces";
import {
	NotificationStoreProps,
	fetchNotifs,
} from "../../states/notifications";
import type { AppDispatch, RootState } from "../../store";
import type { InputNumberProps } from "antd";

//Reducers
import { add } from "../../states/visitors";
import { addNotif, readNotif } from "../../states/notifications";

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
import { PlusCircleOutlined } from "@ant-design/icons";
import NotificationSound from "../../assets/notification.wav";
import { LoadingOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";

interface HeaderProps {
	expanded?: boolean;
}

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

export default function Header({ expanded }: HeaderProps) {
	const desktopMedia = window.matchMedia("(min-width: 1024px)");

	//? Socket Connection
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [isAdmin, setIsAdmin] = useState(false);
	const [noOfBadges, setNoOfBadges] = useState(0);

	const [loading, setLoading] = useState(false);

	//Modal States
	const [isGenModalOpen, setIsGenModalOpen] = useState(false);
	const [success, setSuccess] = useState(false);

	//? Redux
	const notifications = useSelector((state: RootState) => state.notifications);

	const [play] = useSound(NotificationSound, { volume: 1, soundEnabled: true });

	const dispatch = useDispatch<AppDispatch>();

	const onChangeBadges: InputNumberProps["onChange"] = (value) => {
		setNoOfBadges(value as number);
	};

	const showGenModal = () => {
		setIsGenModalOpen(true);
	};

	const handleSuccessOk = () => {
		setSuccess(false);
	};

	const handleGenOk = async () => {
		setLoading(true);
		await AxiosInstance.post(
			"/badge/generateBadge",
			{ qty: noOfBadges },
			{
				responseType: "blob", // Important
			},
		)
			.then(async (res) => {
				const data = await res.data;
				const zipBlob = new Blob([data], { type: "application/zip" });

				if (zipBlob.size > 0) {
					saveAs(zipBlob, `Visitor Badges-${noOfBadges}.zip`);
				} else {
					throw new Error("No data to download");
				}

				setLoading(false);
				setSuccess(true);
				setIsGenModalOpen(false);
			})
			.catch((err) => {
				setLoading(false);
				if (err && err.response) {
					if (noOfBadges <= 0)
						error("You must have at least 1 badge to generate.");
					else error("Failed to generate badges. Please try again.");
				}
			});
	};

	const handleGenCancel = () => {
		setIsGenModalOpen(false);
	};

	const initialNotifications = async () => {
		await AxiosInstance.get("/notification")
			.then((res) => {
				const unreadNotifications = res.data.notifications.filter(
					(notif: NotificationProps) => !notif.is_read,
				);
				const notifications: NotificationStoreProps[] = unreadNotifications.map(
					(notif: NotificationProps, index: number) => {
						const uniqueKey = `${notif.type}-${notif.created_at}-${index}`;

						return {
							key: uniqueKey,
							_id: notif._id,
							name: notif.content.visitor_name,
							message: uniqueKey, //? React-Notifications-Menu library uses this for their key
							actualMessage: notificationMessage(notif.type, notif.content),
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
				if (err && err.response) {
					const message = err.response.data.error;
					error(message);
				}
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
			const uniqueKey = `${value.type}-${value.created_at}-${notifications.length}`;
			dispatch(
				addNotif({
					key: uniqueKey,
					_id: value._id,
					name: value.content.visitor_name,
					message: notificationMessage(value.type, value.content),
					time_in: value.content.time_in,
					time_out: value.content.time_out,
					receivedTime: value.created_at,
					type: value.type,
					is_read: value.is_read,
				}),
			);
			play(); // Call play() on every new notification
		}

		initialNotifications();

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
	}, [play]);

	const logout = () => {
		localStorage.clear();
		window.location.reload();
	};

	const readNotification = async (notif: NotificationStoreProps) => {
		//? Check if the notification is already read
		if (notif.is_read) return;
		await AxiosInstance.put("/notification/update", {
			_id: notif._id,
			is_read: true,
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
		<div
			className={`navbar ${desktopMedia.matches && "items-start"}  bg-base-100 ${expanded && "hidden"}`}
		>
			{loading && (
				<LoadingOutlined className="absolute left-[48%] top-[40%] z-[1000] text-[160px] text-primary-500" />
			)}
			<div className="flex-1">
				{desktopMedia.matches ? (
					<a
						href="/"
						className="header-name btn btn-ghost text-base normal-case hover:bg-transparent md:text-xl"
					>
						Gullas Visitor Management System
					</a>
				) : (
					<a
						href="/"
						className="header-name btn btn-ghost text-base normal-case hover:bg-transparent md:text-xl"
					>
						Gullas VMS
					</a>
				)}
			</div>
			<div className="flex-none">
				<Modal
					title={
						<span className="text-[24px] font-semibold text-primary-500">
							Success
						</span>
					}
					open={success}
					onOk={handleSuccessOk}
				>
					<span>Sucessfully generated {noOfBadges} badges</span>
				</Modal>
				<Modal
					title={
						<span className="text-[24px] font-semibold text-primary-500">
							Generate Badges
						</span>
					}
					open={isGenModalOpen}
					onOk={handleGenOk}
					onCancel={handleGenCancel}
				>
					<div className="mt-[20px]">
						<span>
							How many?{" "}
							<InputNumber
								className="badge-counter"
								min={0}
								defaultValue={noOfBadges}
								onChange={onChangeBadges}
							/>
						</span>
					</div>
				</Modal>
				{isAdmin && (
					<Tooltip title="Generate Badges">
						<button
							title="Generate Badges"
							className="btn btn-ghost pr-[1rem] hover:bg-transparent"
							onClick={showGenModal}
						>
							<PlusCircleOutlined style={{ fontSize: "17px" }} />
						</button>
					</Tooltip>
				)}

				<div className="pr-[1rem]">
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
										{data.data.actualMessage}{" "}
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
				</div>

				<CustomDropdown
					overlayClassName="account-dropdown"
					items={[
						{
							key: "1",
							label: (
								<button
									onClick={() => {
										localStorage.setItem("mode", "admin");
										window.location.href = "/dashboard";
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
										localStorage.setItem("mode", "security");
										window.location.href = "/qr-scanner";
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
					<div tabIndex={0} className="pr-[1rem] hover:cursor-pointer">
						<Account />
					</div>
				</CustomDropdown>
			</div>
		</div>
	);
}
