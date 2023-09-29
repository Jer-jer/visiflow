import React, { useState, Dispatch, SetStateAction } from "react";

//Interfaces
import { HomeEditor } from "../../../../utils";

//Layouts

//Components
import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";

//Assets
import { ExclamationCircleFilled, LeftOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";

interface PageDetailsProps {
	record?: HomeEditor;
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

export default function PageDetails({
	record,
	setOpenDetails,
}: PageDetailsProps) {
	//Form States
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const editOrCancel = () => {
		if (!disabledInputs) {
			setTitle("");
			setBody("");
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
				<div className="flex w-[80%] flex-col gap-[20px]">
					<div className="flex w-full gap-[60px]">
						<div className="flex w-full justify-between">
							<Label
								labelStyling="w-[17.5%]"
								spanStyling="text-black font-medium text-[16px]"
							>
								Title
							</Label>
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[inherit]"
								placeHolder={record?.title}
								input={title}
								setInput={setTitle}
								visitorMngmnt
								disabled={disabledInputs}
							/>
						</div>
					</div>
					<div className="flex w-full gap-[60px]">
						<div className="flex w-full items-start justify-between">
							<Label
								labelStyling="w-[17.5%]"
								spanStyling="text-black font-medium text-[16px]"
							>
								Message
							</Label>
							<TextArea
								className="custom-textarea input h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
								placeholder={record?.body}
								onChange={(e) => setBody(e.target.value)}
								rows={8}
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
