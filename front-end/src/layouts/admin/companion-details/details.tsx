import React, { useState, useContext } from "react";

//Interfaces
import { WidthContext } from "../../logged-in";
import { CompanionRecord } from "../../../components/table/companion-list";

//Layouts

//Components
import { Button, Avatar, Dropdown } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import Input from "../../../components/fields/input/input";
import Label from "../../../components/fields/input/label";
import Badge from "../../../components/badge";
import Alert from "../../../components/alert";

//Assets
import { ExcelDownload, ArrowDown } from "../../../assets/svg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

//Styles
import "./styles.scss";

const statusOptions = [
	{
		label: "In Progress",
		key: "in-progress",
	},
	{
		label: "Approved",
		key: "approved",
	},
	{
		label: "Declined",
		key: "declined",
	},
];

export default function CompanionDetails() {
	const record = useContext(CompanionRecord);
	//Form States
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobileInput, setMobileInput] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [house, setHouse] = useState("");
	const [cityInput, setCityInput] = useState("");
	const [streetInput, setStreeInput] = useState("");
	const [provinceInput, setProvinceInput] = useState("");
	const [brgyInput, setBrgyInput] = useState("");
	const [countryInput, setCountryInput] = useState("");

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
	//setCurrentStatus is for changing the status of the visitor
	const [currentStatus, setCurrentStatus] = useState(
		statusOptions?.find((option) => option?.key === record?.status),
	);

	const width = useContext(WidthContext);

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
				className={`transition-alert absolute right-0 z-[1] w-full scale-y-0 ease-in-out ${
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
					desc="Message successfully sent to Visitor via Email"
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>

			<div className="mr-[135px] flex flex-col gap-[35px]">
				<div className="flex justify-end">
					<ExcelDownload />
				</div>
				<div className="ml-[58px] flex flex-col gap-[25px]">
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
							<div className="flex w-full gap-[33px]">
								<Label
									spanStyling="text-black font-medium text-[16px]"
									labelStyling="w-[14.5%]"
								>
									Email Address
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 basis-[82%]"
									placeHolder={record?.email}
									input={emailAddress}
									setInput={setEmailAddress}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
							<div className="flex gap-[60px]">
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										House No.
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.houseNo}
										input={house}
										setInput={setHouse}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										City
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.city}
										input={cityInput}
										setInput={setCityInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							<div className="flex gap-[60px]">
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Street
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.street}
										input={streetInput}
										setInput={setStreeInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Province
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.province}
										input={provinceInput}
										setInput={setProvinceInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							<div className="flex gap-[60px]">
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Barangay
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.brgy}
										input={brgyInput}
										setInput={setBrgyInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
								<div className="flex w-[360px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Country
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.country}
										input={countryInput}
										setInput={setCountryInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							<div className="flex w-full justify-between">
								<Label
									spanStyling="text-black font-medium text-[16px]"
									labelStyling="w-[22.5%]"
								>
									Time In and Out
								</Label>
								<DateTimePicker
									globalStyling="w-full"
									rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit]"
									size="large"
									defaultVal={{
										from: record?.timeIn || "9999-99-99 99:90 PM",
										to: record?.timeOut || "9999-99-99 99:99 PM",
									}}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
						</div>
						<div className="flex flex-col items-center gap-[30px]">
							<Avatar size={width === 1210 ? 150 : 220} src={RyanReynolds} />
							{disabledInputs ? (
								<Badge status={record?.status} textSize="text-[20px]" />
							) : (
								<Dropdown
									menu={{ items: statusOptions }}
									placement="bottomRight"
									trigger={["click"]}
								>
									<Button className="border-none bg-[#DFEAEF] font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]">
										<div className="flex items-center justify-between gap-[10px]">
											{currentStatus?.label}
											<ArrowDown />
										</div>
									</Button>
								</Dropdown>
							)}
						</div>
					</div>
					{/* <div className="divider" /> */}
					<div className="flex justify-end gap-[15px]">
						{!disabledInputs && (
							<Button
								onClick={saveAction}
								type="primary"
								size="large"
								className="search-button !rounded-[18px] !bg-primary-500"
							>
								Save
							</Button>
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
