import React, { useState } from "react";

//Interfaces
import { UserDataType } from "../../../utils";

//Layouts
import UserActionLogs from "../user-action-logs";

//Components
import type { MenuProps } from "antd";
import { Button, Dropdown, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Input from "../../../components/fields/input/input";
import Label from "../../../components/fields/input/label";
import Alert from "../../../components/alert";

//Assets
import { ArrowDown, ExcelDownload } from "../../../assets/svg";

//Styles
import "./styles.scss";

interface UserDetailsProps {
	record?: UserDataType;
}

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

const roleOptions: MenuProps["items"] = [
	{
		label: "Admin",
		key: "0",
	},
	{
		label: "Security",
		key: "1",
	},
];

const { confirm } = Modal;

const showDeleteConfirm = () => {
	confirm({
		title: "Are you sure to delete this user?",
		className: "confirm-buttons",
		icon: <ExclamationCircleFilled className="!text-error" />,
		okText: "Yes",
		okType: "danger",
		cancelText: "No",
		onOk() {
			console.log("OK");
		},
		onCancel() {
			console.log("Cancel");
		},
	});
};

export default function UserDetails({ record }: UserDetailsProps) {
	//Form States
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobileInput, setMobileInput] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States
	const [actionLogsOpen, setActionLogsOpen] = useState(false);

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const editOrCancel = () => {
		!disabledInputs && setFirstName("");

		setDisabledInputs(!disabledInputs);
	};

	const saveAction = () => {
		//This needs to be customized to whatever the DB returns
		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);
	};

	return (
		<>
			<div
				className={`transition-alert absolute z-[1] w-full scale-y-0 ease-in-out ${
					alertOpen && "scale-y-100"
				}`}
			>
				{/* // Needs to be customized to whatever the DB returns */}
				<Alert
					globalCustomStyling={`flex w-full overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
					statusStyling="flex w-12 items-center justify-center"
					statusColor="bg-primary-500"
					spanStyling="font-semibold"
					statusTextHeaderColor="text-primary-500"
					descStyling="text-sm text-gray-600"
					header="Information Box"
					desc="User successfully updated"
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>

			<div className="mr-[135px] flex flex-col gap-[35px] pt-[30px]">
				<div className="flex justify-end">
					<Dropdown
						placement="bottomRight"
						menu={{ items: exportOptions }}
						trigger={["click"]}
					>
						<a onClick={(e) => e.preventDefault()} href="/">
							<ExcelDownload />
						</a>
					</Dropdown>
				</div>
				<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
					<div className="flex justify-between">
						<div className="flex w-[782px] flex-col gap-[20px]">
							<div className="flex gap-[60px]">
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										First Name
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.fullName.firstName}
										input={firstName}
										setInput={setFirstName}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Middle Name
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.fullName.middleName}
										input={middleName}
										setInput={setMiddleName}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							<div className="flex gap-[60px]">
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Last Name
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.fullName.lastName}
										input={lastName}
										setInput={setLastName}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Mobile Number
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.mobile}
										input={mobileInput}
										setInput={setMobileInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							<div className="flex gap-[60px]">
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Username
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.username}
										input={username}
										setInput={setUsername}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Email Address
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.email}
										input={emailAddress}
										setInput={setEmailAddress}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							<div className="flex gap-[60px]">
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Password
									</Label>
									<Input
										inputType="password"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.password}
										input={password}
										setInput={setPassword}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Role
									</Label>
									{disabledInputs ? (
										<Input
											inputType="text"
											inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
											placeHolder={
												record?.role === "admin" ? "Admin" : "Security"
											}
											input={role}
											setInput={setRole}
											visitorMngmnt
											disabled={disabledInputs}
										/>
									) : (
										<Dropdown
											menu={{ items: roleOptions }}
											placement="bottomRight"
											trigger={["click"]}
										>
											<Button
												size="large"
												className="w-[59.5%] !rounded-[5px] border-none bg-[#DFEAEF] font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
											>
												<div className="flex items-center justify-between gap-[10px]">
													{record?.role === "admin" ? "Admin" : "Security"}
													<ArrowDown />
												</div>
											</Button>
										</Dropdown>
									)}
								</div>
							</div>
						</div>
					</div>
					{/* <div className="divider" /> */}
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
									onClick={showDeleteConfirm}
									type="primary"
									size="large"
									className="search-button !rounded-[18px] !bg-error"
								>
									Delete
								</Button>
								<Button
									onClick={saveAction}
									type="primary"
									size="large"
									className="search-button !rounded-[18px] !bg-primary-500"
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
		</>
	);
}
