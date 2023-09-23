import React from "react";

//Interfaces
import { VisitorFullNameProps } from "../../../utils";

//Components
import type { MenuProps } from "antd";
import { Button, Avatar, Dropdown } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import Input from "../../../components/fields/input/input";
import Label from "../../../components/fields/input/label";
import Badge from "../../../components/badge";

//Assets
import { ExcelDownload } from "../../../assets/svg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

interface VisitorDetailsProps {
	fullName?: VisitorFullNameProps;
	mobile?: string;
	email?: string;
	houseNo?: string;
	city?: string;
	street?: string;
	province?: string;
	brgy?: string;
	country?: string;
	timeIn?: string;
	timeOut?: string;
}

const items: MenuProps["items"] = [
	{
		/* Only present in visitor with companions */
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
	{
		/* Only present in visitor with companions */
		label: "Export Visitor Companions + Logs",
		key: "4",
	},
];

export default function VisitorDetails({
	fullName,
	mobile,
	email,
	houseNo,
	city,
	street,
	province,
	brgy,
	country,
	timeIn,
	timeOut,
}: VisitorDetailsProps) {
	return (
		<div className="mr-[135px] flex flex-col gap-[35px]">
			<div className="flex justify-end">
				<Dropdown menu={{ items }} trigger={["click"]}>
					<a onClick={(e) => e.preventDefault()} href="/">
						<ExcelDownload />
					</a>
				</Dropdown>
			</div>
			<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
				<div className="flex gap-[170px]">
					<div className="flex w-[782px] flex-col gap-[20px]">
						<div className="flex gap-[60px]">
							<div className="flex w-[360px] justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									First Name
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={fullName?.firstName}
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
									placeHolder={fullName?.middleName}
									visitorMngmnt
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
									placeHolder={fullName?.lastName}
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
									placeHolder={mobile}
									visitorMngmnt
								/>
							</div>
						</div>
						<div className="flex">
							<div className="flex w-full gap-[33px]">
								<Label spanStyling="text-black font-medium text-[16px]">
									Email Address
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 basis-[82%]"
									placeHolder={email}
									visitorMngmnt
								/>
							</div>
						</div>
						<div className="flex gap-[60px]">
							<div className="flex w-[360px] justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									House No.
								</Label>
								<Input
									inputType="text"
									inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={houseNo}
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
									placeHolder={city}
									visitorMngmnt
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
									placeHolder={street}
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
									placeHolder={province}
									visitorMngmnt
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
									placeHolder={brgy}
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
									placeHolder={country}
									visitorMngmnt
								/>
							</div>
						</div>
						<div>
							<div className="flex w-full justify-between">
								<Label
									spanStyling="text-black font-medium text-[16px]"
									labelStyling="w-[22%]"
								>
									Time In and Out
								</Label>
								<DateTimePicker
									globalStyling="w-full"
									rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit]"
									size="large"
									defaultVal={{
										from: timeIn || "9999-99-99 99:90 PM",
										to: timeOut || "9999-99-99 99:99 PM",
									}}
									visitorMngmnt
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[30px]">
						<Avatar size={220} src={RyanReynolds} />
						<Badge status="in-progress" textSize="text-[20px]" />
					</div>
				</div>
				{/* <div className="divider" /> */}
				<div className="flex justify-end gap-[15px]">
					<Button
						type="primary"
						size="large"
						className="search-button !rounded-[18px] !bg-primary-500"
					>
						Visitor Logs
					</Button>
					{/* Optional only for visitors with companions */}
					<Button
						type="primary"
						size="large"
						className="search-button !rounded-[18px] !bg-primary-500"
					>
						View Companions
					</Button>
					<Button
						type="primary"
						size="large"
						className="search-button !rounded-[18px] !bg-primary-500"
					>
						Notify Person of Interest
					</Button>
				</div>
			</div>
		</div>
	);
}
