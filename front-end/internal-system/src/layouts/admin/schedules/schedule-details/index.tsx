import React, { useState, useContext, createContext, useEffect } from "react";

//Interfaces
import {
	VisitorDetailsProps,
	VisitorDataType,
} from "../../../../utils/interfaceTest";
import { WidthContext } from "../../../logged-in";

//Layouts
import Identification from "../identification";
import VisitorCompanions from "../visitor-companions";

//Components
import { Button, Avatar, Dropdown, MenuProps, Space } from "antd";
import Label from "../../../../components/fields/input/label";
import Input from "../../../../components/fields/input/input";
import DateTimePicker from "../../../../components/datetime-picker";
import Badge from "../../../../components/badge";
import Alert from "../../../../components/alert";

//Assets
import { ExcelDownload, ArrowDown } from "../../../../assets/svg";
import { DownOutlined } from "@ant-design/icons";
import CompanionForms from "../companion-forms";

interface ScheduleDeetsProps {
	record?: VisitorDataType;
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

export default function ScheduleDetails({
	record,
	companionRecords,
}: ScheduleDeetsProps) {
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
	const [companions, setCompanions] = useState(companionRecords || []);
	const [tempCompanions, setTempCompanions] = useState([]);
	const [numVisitorsInput, setNumVisitorsInput] = useState(companions?.length);
	const [purposeInput, setPurposeInput] = useState("");
	const [poiInput, setPoiInput] = useState("");

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States
	const [identificationOpen, setIdentificationOpen] = useState(false);
	const [vistorCompanionsOpen, setVisitorCompanionsOpen] = useState(false);

	//setCurrentStatus is for changing the status of the visitor
	const [currentStatus, setCurrentStatus] = useState(
		statusOptions?.find(
			(option) => option?.key === record?.visitorDetails.status,
		),
	);
	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
	const width = useContext(WidthContext);

	const companionNum: MenuProps["items"] = [
		{
			label: "0",
			key: 0,
		},
		{
			label: "1",
			key: 1,
		},
		{
			label: "2",
			key: 2,
		},
		{
			label: "3",
			key: 3,
		},
		{
			label: "4",
			key: 4,
		},
		{
			label: "5",
			key: 5,
		},
		{
			label: "5+",
			key: 6,
		},
	];

	const handleCompanionClick: MenuProps["onClick"] = ({ key }) => {
		const newCompanions = [];
		console.log("before diff:", companions);
		if (typeof key === "number") {
			//here
		} else {
			if (companions) {
				const difference = companions.length - parseInt(key);
				console.log("key", key, "difference:", difference);
				if (parseInt(key) < companions.length) {
					setNumVisitorsInput(parseInt(key));
					companions?.splice(companions.length - difference, difference);
					setCompanions(companions);
					console.log("difference:", companions);
				} else {
					const val = parseInt(key) - companions.length;

					for (let x = 0; x < val; x++) {
						console.log("round:", x);
						const date = new Date();
						const newCompanion = {
							brgy: "",
							city: "",
							country: "",
							email: "",
							fullName: {
								firstName: "",
								middleName: "",
								lastName: "",
							},
							houseNo: "",
							mobile: "",
							province: "",
							status: "in-progress",
							street: "",
							timeIn: JSON.stringify(date),
							timeOut: JSON.stringify(date),
						};

						newCompanions.push(newCompanion);
					}
					setCompanions([...companions, ...newCompanions]);
					setNumVisitorsInput(parseInt(key));
					console.log("new!", companions);
				}
			}
		}
	};

	console.log("CONSOLE", record);

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
					header="Successfully Saved"
					desc="Changes have been saved for this schedule"
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>
			<div className="mr-[135px] flex flex-col gap-[35px] pt-[30px]">
				{/* Excel download */}
				<div className="flex justify-end">
					<Dropdown menu={{ items: exportOptions }} trigger={["click"]}>
						<a onClick={(e) => e.preventDefault()} href="/">
							<ExcelDownload />
						</a>
					</Dropdown>
				</div>
				{/* Start of Form */}
				<div className="mb-[35px] ml-[58px] flex h-full flex-col gap-[25px]">
					{/* Personal Information */}
					<div className="flex justify-between">
						{/* Actual Form */}
						<div className="flex w-[782px] flex-col gap-[20px]">
							{/* Name */}
							<div className="flex gap-[60px]">
								<div className="flex w-[380px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										First Name
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.visitorDetails.fullName.firstName}
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
										placeHolder={record?.visitorDetails.fullName.middleName}
										input={middleName}
										setInput={setMiddleName}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							{/* Name 2 */}
							<div className="flex gap-[60px]">
								<div className="flex w-[380px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Last Name
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.visitorDetails.fullName.lastName}
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
										placeHolder={record?.visitorDetails.mobile}
										input={mobileInput}
										setInput={setMobileInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							{/* Email */}
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
									placeHolder={record?.visitorDetails.email}
									input={emailAddress}
									setInput={setEmailAddress}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
							{/* Address 1 */}
							<div className="flex gap-[60px]">
								<div className="flex w-[380px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										House No.
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.visitorDetails.houseNo}
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
										placeHolder={record?.visitorDetails.city}
										input={cityInput}
										setInput={setCityInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							{/* Address 2 */}
							<div className="flex gap-[60px]">
								<div className="flex w-[380px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Street
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.visitorDetails.street}
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
										placeHolder={record?.visitorDetails.province}
										input={provinceInput}
										setInput={setProvinceInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
							{/* Address 3 */}
							<div className="flex gap-[60px]">
								<div className="flex w-[380px] justify-between">
									<Label spanStyling="text-black font-medium text-[16px]">
										Barangay
									</Label>
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.visitorDetails.brgy}
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
										placeHolder={record?.visitorDetails.country}
										input={countryInput}
										setInput={setCountryInput}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								</div>
							</div>
						</div>
						{/* Identification Photo */}
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
								<Badge
									status={record?.visitorDetails.status}
									textSize="text-[20px]"
								/>
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
					{/* Schedule Information */}
					<div>
						{/* Time in and out */}
						<div className="flex w-[780px] justify-between">
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
									from: record?.visitorDetails.timeIn || "9999-99-99 99:90 PM",
									to: record?.visitorDetails.timeOut || "9999-99-99 99:99 PM",
								}}
								visitorMngmnt
								disabled={disabledInputs}
							/>
						</div>
						{/* Purpose */}
						<div className="mt-[20px] flex w-[780px]">
							<Label
								spanStyling="text-black font-medium text-[16px]"
								labelStyling="w-[22.5%]"
							>
								Purpose
							</Label>
							<Input
								inputType="string"
								inputStyling="input h-[38px] w-full rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
								placeHolder={record?.purpose}
								input={purposeInput}
								setInput={setPurposeInput}
								visitorMngmnt
								disabled={disabledInputs}
							/>
						</div>
						<div className="mt-[20px] flex gap-[70px]">
							<div className="flex w-[360px] justify-between">
								<Label
									spanStyling="text-black font-medium text-[16px]"
									labelStyling="w-[22.5%]"
								>
									No. of Companions
								</Label>
								<Dropdown
									menu={{ items: companionNum, onClick: handleCompanionClick }}
									trigger={["click"]}
									disabled={disabledInputs}
									className="h-[38px] w-[220px] border-0 bg-[#E0EBF0] text-justify text-[16px] font-medium text-black disabled:bg-[#C9DBE4] disabled:text-black"
								>
									<Button>
										<Space>
											{numVisitorsInput}
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</div>
							<div className="flex w-[350px] justify-between">
								<Label
									spanStyling="text-black font-medium text-[16px]"
									labelStyling="w-[22.5%]"
								>
									Person of Interest
								</Label>
								<Input
									inputType="string"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.personOfInterest}
									input={poiInput}
									setInput={setPoiInput}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
						</div>
					</div>
					{/* Companions Form Part */}
					<div className="flex w-full flex-col">
						{!disabledInputs &&
							numVisitorsInput &&
							numVisitorsInput > 0 &&
							companions && (
								<>
									{companions?.map((item, index) => {
										return (
											<CompanionForms companionForm={item} index={index} />
										);
									})}
								</>
							)}
					</div>
					{/* Buttons */}
					<div className="flex justify-end gap-[15px]">
						{disabledInputs && (
							<>
								{/* Optional only for visitors with companions */}
								{numVisitorsInput !== undefined && numVisitorsInput > 0 && (
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
