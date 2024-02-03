import React, {
	Dispatch,
	SetStateAction,
	useState,
	MutableRefObject,
	useEffect,
} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AxiosInstace from "../../../../lib/axios";

//Interfaces
import { UserDataType } from "../../../../utils/interfaces";
import type { MenuProps } from "antd";
import { TabItems } from "..";
import {
	UserDetailsZod,
	UserDetailsInterfaceZod,
} from "../../../../utils/zodSchemas";

//Layouts
import UserActionLogs from "../user-action-logs";

//Components
import { Button, Dropdown, Modal, Input, Select, Form } from "antd";
import Label from "../../../../components/fields/input/label";
import Alert from "../../../../components/alert";

//Assets
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ExcelDownload } from "../../../../assets/svg";
import { ExclamationCircleFilled } from "@ant-design/icons";

//Styles
import "./styles.scss";

interface UserDetailsProps {
	newTabIndex: MutableRefObject<number>;
	items: TabItems[];
	record?: UserDataType;
	setItems: Dispatch<React.SetStateAction<TabItems[]>>;
	setActiveKey: Dispatch<SetStateAction<number>>;
}

type UserDetailsTypeZod = z.infer<typeof UserDetailsZod>;

const exportOptions: MenuProps["items"] = [
	{
		label: "Export All",
		key: "0",
	},
	{
		label: "Export User Details",
		key: "1",
	},
	{
		label: "Export Action Logs",
		key: "2",
	},
];

const { confirm } = Modal;

const closeTab = (
	_id: string | undefined,
	newTabIndex: MutableRefObject<number>,
	items: TabItems[],
	setItems: Dispatch<React.SetStateAction<TabItems[]>>,
	setActiveKey: Dispatch<SetStateAction<number>>,
) => {
	const newActiveKey = --newTabIndex.current;
	const newItems = [...items];
	const index = newItems.map((e) => e.userData!._id).indexOf(_id!);
	if (index !== -1) {
		newItems.splice(index, 1);
		setItems(newItems);
	}
	setActiveKey(newActiveKey);
};

const showDeleteConfirm = (
	_id: string | undefined,
	newTabIndex: MutableRefObject<number>,
	items: TabItems[],
	setItems: Dispatch<React.SetStateAction<TabItems[]>>,
	setActiveKey: Dispatch<SetStateAction<number>>,
) => {
	confirm({
		title: "Are you sure you want to delete this user?",
		className: "confirm-buttons",
		icon: <ExclamationCircleFilled className="!text-error-500" />,
		okText: "Yes",
		okType: "danger",
		cancelText: "No",
		onOk() {
			AxiosInstace.delete("/user/delete", {
				data: {
					_id: !_id && _id,
				},
			})
				.then((res) => {
					closeTab(_id, newTabIndex, items, setItems, setActiveKey);
				})
				.catch((err) => {
					console.error(err.response.data.error || err.response.data.errors);
				});
		},
		onCancel() {
			console.log("Cancel");
		},
	});
};

export default function UserDetails({
	record,
	newTabIndex,
	items,
	setItems,
	setActiveKey,
}: UserDetailsProps) {
	// Alert State
	const [status, setStatus] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States
	const [actionLogsOpen, setActionLogsOpen] = useState(false);

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	useEffect(() => {}, [record]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<UserDetailsTypeZod>({
		resolver: zodResolver(UserDetailsZod),
		defaultValues: {
			first_name: record?.name.first_name,
			middle_name: record?.name.middle_name,
			last_name: record?.name.last_name,
			username: record?.username,
			password: record?.password,
			email: record?.email,
			phone: record?.phone,
			role: record?.role,
		},
	});

	const updateInput = (value: string, property: string) => {
		switch (property) {
			case "first_name":
				setValue(property, value);
				break;
			case "middle_name":
				setValue(property, value);
				break;
			case "last_name":
				setValue(property, value);
				break;
			case "phone":
				setValue(property, value);
				break;
			case "username":
				setValue(property, value);
				break;
			case "email":
				setValue(property, value);
				break;
			case "password":
				setValue(property, value);
				break;
			case "role":
				setValue(property, value);
				break;
		}
	};

	const handleChange = (value: string) => updateInput(value, "role");

	const editOrCancel = () => {
		setDisabledInputs(!disabledInputs);
		clearErrors();
	};

	const saveAction = (
		_id: string | undefined,
		data: UserDetailsInterfaceZod,
	) => {
		//This needs to be customized to whatever the DB returns

		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);

		AxiosInstace.put("/user/update", {
			_id,
			first_name: data.first_name,
			middle_name: data.middle_name,
			last_name: data.last_name,
			phone: data.phone,
			email: data.email,
			username: data.username,
			password: data.password,
			role: data.role,
		})
			.then((res) => {
				setStatus(true);
				setAlertMsg(res.data.message);
				setAlertOpen(!alertOpen);
				setDisabledInputs(!disabledInputs);
			})
			.catch((err) => {
				setStatus(false);
				setAlertMsg(err.response.data.error || err.response.data.errors);
			});
	};

	const onSubmit = handleSubmit((data) => {
		saveAction(record?._id, data);
	});

	return (
		<div className="user-details">
			<div
				className={`transition-alert absolute z-[1] w-full scale-y-0 ease-in-out ${
					alertOpen && "scale-y-100"
				}`}
			>
				<Alert
					globalCustomStyling={`flex w-full overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
					statusStyling="flex w-12 items-center justify-center"
					statusColor={status ? "bg-primary-500" : "bg-error-500"}
					spanStyling="font-semibold"
					statusTextHeaderColor={status ? "text-primary-500" : "text-error-500"}
					descStyling="text-sm text-gray-600"
					header="Information Box"
					desc={alertMsg}
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>

			<Form name="User Details" onFinish={onSubmit} autoComplete="off">
				<div className="mr-[135px] flex flex-col gap-[35px] pt-[30px]">
					<div className="flex justify-end">
						<Dropdown
							placement="bottomRight"
							menu={{ items: exportOptions }}
							trigger={["click"]}
						>
							<a
								title="Export Data"
								onClick={(e) => e.preventDefault()}
								href="/"
							>
								<ExcelDownload />
							</a>
						</Dropdown>
					</div>
					<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
						<div className="flex justify-between">
							<div className="flex w-[782px] flex-col gap-[20px]">
								<div className="flex w-full justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										User ID
									</Label>
									<Input
										className="vm-placeholder h-[38px] w-[650px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
										placeholder={record?._id}
										disabled
									/>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											First Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] w-[229px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record?.name.first_name}
												{...register("first_name")}
												onChange={(e) =>
													updateInput(e.target.value, "first_name")
												}
												disabled={disabledInputs}
											/>
											{errors?.first_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.first_name.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Middle Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] w-[229px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record?.name.middle_name}
												{...register("middle_name")}
												onChange={(e) =>
													updateInput(e.target.value, "middle_name")
												}
												disabled={disabledInputs}
											/>
											{errors?.middle_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.middle_name.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Last Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] w-[229px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record?.name.last_name}
												{...register("last_name")}
												onChange={(e) =>
													updateInput(e.target.value, "last_name")
												}
												disabled={disabledInputs}
											/>
											{errors?.last_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.last_name.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Phone Number
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] w-[229px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record?.phone}
												{...register("phone")}
												onChange={(e) => updateInput(e.target.value, "phone")}
												disabled={disabledInputs}
											/>
											{errors?.phone && (
												<p className="mt-1 text-sm text-red-500">
													{errors.phone.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Username
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] w-[229px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record?.username}
												{...register("username")}
												onChange={(e) =>
													updateInput(e.target.value, "username")
												}
												disabled={disabledInputs}
											/>
											{errors?.username && (
												<p className="mt-1 text-sm text-red-500">
													{errors.username.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Email Address
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] w-[229px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record?.email}
												{...register("email")}
												onChange={(e) => updateInput(e.target.value, "email")}
												disabled={disabledInputs}
											/>
											{errors?.email && (
												<p className="mt-1 text-sm text-red-500">
													{errors.email.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Password
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input.Password
												className="vm-placeholder h-[38px] w-[229px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												iconRender={(visible) =>
													visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
												}
												{...register("password")}
												onChange={(e) =>
													updateInput(e.target.value, "password")
												}
												disabled={disabledInputs}
											/>
											{errors?.password && (
												<p className="mt-1 text-sm text-red-500">
													{errors.password.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Role
										</Label>
										<div className="flex w-[59.5%] flex-col">
											{disabledInputs ? (
												<Input
													className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
													placeholder={
														record!.role === "admin" ? "Admin" : "Security"
													}
													disabled
												/>
											) : (
												<Select
													className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
													{...register("role")}
													defaultValue={
														record!.role === "admin" ? "Admin" : "Security"
													}
													onChange={handleChange}
													options={[
														{ value: "admin", label: "Admin" },
														{ value: "security", label: "Security" },
													]}
												/>
											)}
											{errors?.role && (
												<p className="mt-1 text-sm text-red-500">
													{errors.role.message}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-end gap-[15px]">
							{disabledInputs && (
								<>
									<Button
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-primary-500"
										onClick={() => setActionLogsOpen(!actionLogsOpen)}
									>
										View Action Logs
									</Button>
									<UserActionLogs
										open={actionLogsOpen}
										setOpen={setActionLogsOpen}
									/>
								</>
							)}

							{!disabledInputs && (
								<>
									<Button
										onClick={() =>
											showDeleteConfirm(
												record!._id,
												newTabIndex,
												items,
												setItems,
												setActiveKey,
											)
										}
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-error-500"
									>
										Delete
									</Button>
									<Button
										// onClick={() => saveAction(record!.user_id)}
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-primary-500"
										htmlType="submit"
									>
										Save
									</Button>
								</>
							)}
							<Button
								onClick={editOrCancel}
								type="primary"
								size="large"
								className="search-button !rounded-[18px] !bg-primary-500"
							>
								{disabledInputs ? "Edit" : "Cancel"}
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}
