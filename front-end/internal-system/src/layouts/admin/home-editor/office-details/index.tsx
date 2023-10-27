import React, { useState, Dispatch, SetStateAction } from "react";

//Interfaces
import { OfficeSchedule } from "../../../../utils";
import type { MenuProps } from "antd";

//Layouts

//Components
import { Button, Dropdown, Modal } from "antd";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";

//Assets
import { ExclamationCircleFilled, LeftOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";
import { ArrowDown } from "../../../../assets/svg";

interface OfficeSchedDetailsProps {
	record?: OfficeSchedule;
	setOpenDetails: Dispatch<SetStateAction<boolean>>;
}

const { confirm } = Modal;

const showDeleteConfirm = () => {
	confirm({
		title: "Are you sure you want to delete this?",
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

const availabilityOptions: MenuProps["items"] = [
	{
		label: "Available",
		key: "0",
	},
	{
		label: "Unavailable",
		key: "1",
	},
];

export default function OfficeSchedDetails({
	record,
	setOpenDetails,
}: OfficeSchedDetailsProps) {
	//Form States
	const [officeName, setOfficeName] = useState("");
	const [hours, setHours] = useState("");
	const [inCharge, setInCharge] = useState("");
	const [location, setLocation] = useState("");
	const [contact, setContact] = useState("");
	const [availability, setAvailability] = useState("");

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const editOrCancel = () => {
		if (!disabledInputs) {
			setOfficeName("");
			setHours("");
			setInCharge("");
			setLocation("");
			setContact("");
			setAvailability("");
		}

		setDisabledInputs(!disabledInputs);
	};

	const saveAction = () => {
		//This needs to be customized to whatever the DB returns
		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);
	};

	return (
		<div className="mr-[135px] flex flex-col gap-[35px] pt-[25px]">
			<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
				<div className="flex justify-between">
					<div className="flex w-[80%] flex-col gap-[20px]">
						<div className="flex gap-[80px]">
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Office Name
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.officeName}
									input={officeName}
									setInput={setOfficeName}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Operating Hours
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.operatingHours}
									input={hours}
									setInput={setHours}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
						</div>
						<div className="flex gap-[80px]">
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Personnel in Charge
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.inCharge}
									input={inCharge}
									setInput={setInCharge}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Location
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.location}
									input={location}
									setInput={setLocation}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
						</div>
						<div className="flex gap-[80px]">
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Contact
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.contact}
									input={contact}
									setInput={setContact}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Availability
								</Label>
								{disabledInputs ? (
									<Input
										inputType="text"
										inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.availability}
										input={availability}
										setInput={setAvailability}
										visitorMngmnt
										disabled={disabledInputs}
									/>
								) : (
									<Dropdown
										menu={{ items: availabilityOptions }}
										placement="bottomRight"
										trigger={["click"]}
									>
										<Button
											size="large"
											className="w-[57%] !rounded-[5px] border-none bg-[#DFEAEF] font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
										>
											<div className="flex items-center justify-between gap-[10px]">
												{record?.availability}
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
					{!disabledInputs ? (
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
					) : (
						<Button
							type="link"
							size="large"
							className="mr-auto text-primary-500 hover:!text-primary-300"
							onClick={() => setOpenDetails(false)}
						>
							<div className="flex items-center justify-center gap-[5px]">
								<LeftOutlined />
								<span>Back</span>
							</div>
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
	);
}
