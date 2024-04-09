import React, { useState, Dispatch, SetStateAction } from "react";

//Interfaces
import { HomeEditor } from "../../../../utils/interfaces";

//Layouts

//Components
import { Button, Modal, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";

//Assets
import { ExclamationCircleFilled, LeftOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";
import AxiosInstace from "../../../../lib/axios";

interface PageDetailsProps {
	record?: any;
	setOpenDetails: Dispatch<SetStateAction<boolean>>;
	fetch: () => void;
}

const { confirm } = Modal;

const showDeleteConfirm = () => {
	confirm({
		title: "Are you sure you want to delete this?",
		className: "confirm-buttons",
		icon: <ExclamationCircleFilled className="!text-error-500" />,
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

export default function EmployeeDetails({
	record,
	setOpenDetails,
	fetch,
}: PageDetailsProps) {
	//Form States
	const [name, setName] = useState(record === undefined ? "" : record?.name);
	const [email, setEmail] = useState(record === undefined ? "" : record?.email);
	const [contact, setContact] = useState(record === undefined ? "" : record?.contact);
	const [savedRecord, setSavedRecord] = useState(record);

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const editOrCancel = () => {
		if (!disabledInputs) {
			setName("");
			setEmail("");
			setContact("");
		}

		setDisabledInputs(!disabledInputs);
	};

	const saveAction = async() => {
		//This needs to be customized to whatever the DB returns

		// saving new record
		if(savedRecord=== undefined) {
			try {
				const response = await AxiosInstace.post('/employees/new', { 
					name: name,
					email: email,
					contact: contact
				}); 
				setSavedRecord(response.data.event);
			} catch (error) {
			console.error('Error in adding employee:', error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/employees/update', { 
					_id: record === undefined ? savedRecord._id : record._id,
					name: name === "" ? record?.name : name,
					email: email === "" ? record?.email : email,
					contact: contact === "" ? record?.contact : contact
				}); 
			} catch (error) {
			console.error('Error in updating employee:', error);
			}
		}

		fetch();

		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);
	};

	return (
		<div className="mr-[135px] flex flex-col gap-[35px] pt-[25px]">
			<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
				<div className="flex w-[80%] flex-col gap-[20px]">
					<div className="flex w-full gap-[60px]">
						<div className="flex w-full">
							<Label
								labelStyling="w-[15%]"
								spanStyling="text-black font-medium text-[16px]"
							>
								Name
							</Label>
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
								placeHolder={record?.title}
								input={name}
								setInput={setName}
								visitorMngmnt
								disabled={disabledInputs}
							/>
						</div>
					</div>
					<div className="flex w-full gap-[60px]">
						<div className="flex w-full items-start">
							<Label
								labelStyling="w-[15%]"
								spanStyling="text-black font-medium text-[16px]"
							>
								Email
							</Label>
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
								placeHolder={record?.email}
								input={email}
								setInput={setEmail}
								visitorMngmnt
								disabled={disabledInputs}
							/>
						</div>
					</div>
					<div className="flex w-full gap-[60px]">
						<div className="flex w-full">
							<Label
								labelStyling="w-[15%]"
								spanStyling="text-black font-medium text-[16px]"
							>
								Contact Number
							</Label>
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
								placeHolder={record?.contact}
								input={contact}
								setInput={setContact}
								visitorMngmnt
								disabled={disabledInputs}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-end gap-[15px]">
					{!disabledInputs ? (
						<>
							<Button
								onClick={showDeleteConfirm}
								type="primary"
								size="large"
								className="search-button !bg-error-500 !rounded-[18px]"
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
