import React, { useState, useContext, createContext } from "react";

//Interfaces
import { VisitorDetailsProps } from "../../../../utils";
import { WidthContext } from "../../../logged-in";

//Layouts
import VisitorLogs from "../visitor-logs";
import VisitorCompanions from "../visitor-companions";
import NotifyPOI from "../notify-poi";
import Identification from "../identification";

//Components
import type { MenuProps } from "antd";
import { Button, Avatar, Dropdown } from "antd";
import DateTimePicker from "../../../../components/datetime-picker";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";
import Badge from "../../../../components/badge";
import Alert from "../../../../components/alert";

//Assets
import { ExcelDownload, ArrowDown } from "../../../../assets/svg";

//Styles
import "./styles.scss";

interface VisitorDeetsProps {
	record?: VisitorDetailsProps;
	companionRecords?: VisitorDetailsProps[];
}

const exportOptions: MenuProps["items"] = [
	{
		label: "Export All",
		key: "0",
	},
	{
		label: "Export Visitor Details",
		key: "1",
	},
	{
		label: "Export Visitor Logs",
		key: "2",
	},
	{
		label: "Export Visitor Details + Logs",
		key: "3",
	},
];

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

export const VisitorCompanionsContext = createContext<
	VisitorDetailsProps[] | undefined
>(undefined);

export default function VisitorDetails({
	record,
	companionRecords,
}: VisitorDeetsProps) {
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

	//Modal States
	const [visitLogsOpen, setVisitLogsOpen] = useState(false);
	const [vistorCompanionsOpen, setVisitorCompanionsOpen] = useState(false);
	const [notifyOpen, setNotifyOpen] = useState(false);
	const [identificationOpen, setIdentificationOpen] = useState(false);

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
					desc="Message successfully sent to Visitor via Email"
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>

			<div className="mr-[135px] flex flex-col gap-[35px] pt-[30px]">
				<div className="flex justify-end">
					<Dropdown menu={{ items: exportOptions }} trigger={["click"]}>
						<a onClick={(e) => e.preventDefault()} href="/">
							<ExcelDownload />
						</a>
					</Dropdown>
				</div>
				<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
					<div className="flex justify-between">
						<div className="flex w-[782px] flex-col gap-[20px]">
							<div className="flex gap-[60px]">
								<div className="flex w-[380px] justify-between">
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
								<div className="flex w-[380px] justify-between">
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
								<div className="flex w-[380px] justify-between">
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
								<div className="flex w-[380px] justify-between">
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
								<div className="flex w-[380px] justify-between">
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
							<Avatar
								className="cursor-pointer"
								onClick={() => setIdentificationOpen(!identificationOpen)}
								size={width === 1210 ? 150 : 220}
								src="https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg"
							/>
							<Identification
								open={identificationOpen}
								setOpen={setIdentificationOpen}
								image={{
									frontId:
										"https://media.philstar.com/photos/2021/07/23/10_2021-07-23_18-27-24.jpg",
									backId:
										"https://s3-alpha-sig.figma.com/img/6541/e76f/4938b0155718de8af5610a0f82b07fc5?Expires=1696809600&Signature=g9ee7Y9K6izTlUfPBSWDgv2t9CilaBU3wsYb~xTBNwzFqBIgD~qDFl1WJms9oyFfyQXVxeFC5zydUUKHzBz-JaG~jZ31ambhXu9Gqte1D5vDh9x6WnZF8Kszq9IisRwRC1ytG02cYqFmIFpwLjb-hZ-JFXIWPbB~g-EA-pVFCSsElqjTHikVTTSSmEQiViHAXOSZo0OF3spgfGhfQhtobuWeryxKXlrr3Wu6CnxlIN0VGWKrCMzNH3qp6o99M8KZ4tkEsA8oFrhz~ijLF2GntP1DSBpZNm07wWoLJ2T1l7zSdqRJ5OOl4wiRucamxNbR8wnqPxjrKxrRGE7nJhAQ6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
									selfieId:
										"https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg",
								}}
							/>
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
						{disabledInputs && (
							<>
								<Button
									type="primary"
									size="large"
									className="search-button !rounded-[18px] !bg-primary-500"
									onClick={() => setVisitLogsOpen(!visitLogsOpen)}
								>
									Visitor Logs
								</Button>
								<VisitorLogs open={visitLogsOpen} setOpen={setVisitLogsOpen} />
								{/* Optional only for visitors with companions */}
								{companionRecords && (
									<>
										<Button
											type="primary"
											size="large"
											className="search-button !rounded-[18px] !bg-primary-500"
											onClick={() =>
												setVisitorCompanionsOpen(!vistorCompanionsOpen)
											}
										>
											View Companions
										</Button>
										<VisitorCompanionsContext.Provider value={companionRecords}>
											<VisitorCompanions
												open={vistorCompanionsOpen}
												setOpen={setVisitorCompanionsOpen}
											/>
										</VisitorCompanionsContext.Provider>
									</>
								)}

								<Button
									type="primary"
									size="large"
									className="search-button !rounded-[18px] !bg-primary-500"
									onClick={() => setNotifyOpen(!notifyOpen)}
								>
									Notify Person of Interest
								</Button>
								<NotifyPOI
									emailInput={record?.email}
									companionRecords={companionRecords}
									open={notifyOpen}
									setOpen={setNotifyOpen}
								/>
							</>
						)}

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
