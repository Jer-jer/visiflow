import React, { useState, Dispatch, SetStateAction } from "react";

//Interfaces

//Layouts

//Components
import { Button, Modal, InputNumber } from "antd";
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

export default function ReasonDetails({
	record,
	setOpenDetails,
	fetch,
}: PageDetailsProps) {
	//Form States
	const [reason, setReason] = useState(record === undefined ? "" : record?.reason);
	const [savedRecord, setSavedRecord] = useState(record);

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States
	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const editOrCancel = () => {
		if (!disabledInputs) {
			setReason("");
		}

		setDisabledInputs(!disabledInputs);
	};

	const saveAction = async() => {
		//This needs to be customized to whatever the DB returns

		// saving new record
		if(savedRecord=== undefined) {
			try {
				const response = await AxiosInstace.post('/reasons/new', { 
					reason: reason,
				}); 
				setSavedRecord(response.data.reason);
			} catch (error) {
			console.error('Error in adding reason:', error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/reasons/update', { 
					_id: record === undefined ? savedRecord._id : record._id,
					reason: reason === "" ? record?.reason : reason,
				}); 
			} catch (error) {
			console.error('Error in updating reason:', error);
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
								Reason
							</Label>
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
								placeHolder={record?.reason}
								input={reason}
								setInput={setReason}
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
