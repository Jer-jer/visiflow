import React, { useState, useContext } from "react";

// Interface
import { VisitorDetailsProps } from "../../../../utils";
import { WidthContext } from "../../../logged-in";

// Layouts
import Identification from "../identification";

// Components
import Label from "../../../../components/fields/input/label";
import Input from "../../../../components/fields/input/input";
import Badge from "../../../../components/badge";
import { Button, Avatar, Dropdown } from "antd";
import DateTimePicker from "../../../../components/datetime-picker";

//Assets
import { ArrowDown } from "../../../../assets/svg";

interface CompanionDetails {
	companionForm?: VisitorDetailsProps;
	index: number;
}

export default function CompanionForms({
	companionForm,
	index,
}: CompanionDetails) {
	const [numCompanions, setNumCompanions] = useState(0);
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
	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
	const [identificationOpen, setIdentificationOpen] = useState(false);
	const width = useContext(WidthContext);

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

	const [currentStatus, setCurrentStatus] = useState(
		statusOptions?.find((option) => option?.key === companionForm?.status),
	);

	return (
		<div>
			<div className="mt-[50px]">
				<hr></hr>
				<span>companion {index + 1}</span>
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
									placeHolder={companionForm?.fullName.firstName}
									input={firstName}
									setInput={setFirstName}
									visitorMngmnt
								/>
							</div>
							<div className="flex w-[360px] justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Middle Name
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={companionForm?.fullName.middleName}
									input={middleName}
									setInput={setMiddleName}
									visitorMngmnt
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
									placeHolder={companionForm?.fullName.lastName}
									input={lastName}
									setInput={setLastName}
									visitorMngmnt
								/>
							</div>
							<div className="flex w-[360px] justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Mobile Number
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={companionForm?.mobile}
									input={mobileInput}
									setInput={setMobileInput}
									visitorMngmnt
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
								placeHolder={companionForm?.email}
								input={emailAddress}
								setInput={setEmailAddress}
								visitorMngmnt
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
									placeHolder={companionForm?.houseNo}
									input={house}
									setInput={setHouse}
									visitorMngmnt
								/>
							</div>
							<div className="flex w-[360px] justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									City
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={companionForm?.city}
									input={cityInput}
									setInput={setCityInput}
									visitorMngmnt
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
									placeHolder={companionForm?.street}
									input={streetInput}
									setInput={setStreeInput}
									visitorMngmnt
								/>
							</div>
							<div className="flex w-[360px] justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Province
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={companionForm?.province}
									input={provinceInput}
									setInput={setProvinceInput}
									visitorMngmnt
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
									placeHolder={companionForm?.brgy}
									input={brgyInput}
									setInput={setBrgyInput}
									visitorMngmnt
								/>
							</div>
							<div className="flex w-[360px] justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Country
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={companionForm?.country}
									input={countryInput}
									setInput={setCountryInput}
									visitorMngmnt
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
					</div>
				</div>
				{/* Time in and out */}
				<div className="flex w-[780px] mt-[25px] justify-between">
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
							from: companionForm?.timeIn || "9999-99-99 99:90 PM",
							to: companionForm?.timeOut || "9999-99-99 99:99 PM",
						}}
						visitorMngmnt
					/>
				</div>
			</div>
		</div>
	);
}
