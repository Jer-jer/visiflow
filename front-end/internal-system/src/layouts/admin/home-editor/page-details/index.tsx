import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

//Interfaces
import { HomeEditor } from "../../../../utils/interfaces";

//Layouts

//Components
import { Button, Modal, InputNumber, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";

//Assets
import { ExclamationCircleFilled, LeftOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";
import AxiosInstace from "../../../../lib/axios";
import { jwtDecode } from "jwt-decode";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnnouncementDetailsZod, AnnouncementZod } from "../../../../utils/zodSchemas";

interface PageDetailsProps {
	record?: {_id: string, title: string, message: string, prio: number};
	setOpenDetails: Dispatch<SetStateAction<boolean>>;
	fetch: () => void;
}

const { confirm } = Modal;

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

export default function PageDetails({
	record,
	setOpenDetails,
	fetch,
}: PageDetailsProps) {
	//Form States
	const [title, setTitle] = useState(record === undefined ? "" : record?.title);
	const [body, setBody] = useState(record === undefined ? "" : record?.message);
	const [prio, setPrio] = useState<number | null>(record === undefined ? 1 : record?.prio);
	const [savedRecord, setSavedRecord] = useState(record);

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const token = localStorage.getItem("token");
	const decodedtoken = (jwtDecode (token as string));

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<AnnouncementZod>({
		resolver: zodResolver(AnnouncementDetailsZod),
	});

	const editOrCancel = () => {
		if (!disabledInputs) {
			setTitle("");
			setBody("");
		}

		setDisabledInputs(!disabledInputs);
	};

	const saveAction = async() => {	
		// saving new record
		if(savedRecord=== undefined) {
			try {
				const response = await AxiosInstace.post('/announcements/new', { 
					title: title,
					message: body,
					prio: prio,
					userID: decodedtoken.sub
				}); 
				setSavedRecord(response.data.event);
			} catch (err: any) {
				error('Error in adding announcement: ' + err.response.data.error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/announcements/update', { 
					_id: record === undefined ? savedRecord._id : record._id,
					title: title === "" ? record?.title : title,
					message: body === "" ? record?.message : body,
					prio: prio === 999 ? record?.prio : prio,
					userID: decodedtoken.sub
				}); 
			} catch (err: any) {
				error('Error in updating announcement: ' + err.response.data.error);
			}
		}

		fetch();

		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);
	};

	const showDeleteConfirm = () => {
		confirm({
			title: "Are you sure you want to delete this?",
			className: "confirm-buttons",
			icon: <ExclamationCircleFilled className="!text-error-500" />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				try {
					await AxiosInstace.delete('/announcements/delete', { data: { _id: record?._id, userID: decodedtoken.sub } });
					fetch();
					setOpenDetails(false);
				  } catch (error) {
					console.error('Error deleting announcement:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const onSubmit = handleSubmit((data) => {
		saveAction();
	});

	const handleTitle = (value: any) => {
		setTitle(value);
		setValue("title", value);
	}

	const handleBody = (value: any) => {
		setBody(value);
		setValue("message", value);
	}

	useEffect(() => {
		handleTitle(title);
		handleBody(body);
	}, []);

	return (
		<Form name="AnnouncementDetail" onFinish={onSubmit} autoComplete="off">
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
								<div className="flex w-full flex-col">
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[inherit]"
										placeHolder={title}
										input={title}
										setInput={handleTitle}
										visitorMngmnt
										disabled={disabledInputs}
									/>
									{errors?.title && (
										<p className="mt-1 text-sm text-red-500">
											{errors.title?.message}
										</p>
									)}
								</div>
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
								<div className="flex w-full flex-col">
									<TextArea
										className="custom-textarea input h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
										placeholder={body}
										defaultValue={body}
										onChange={(e) => handleBody(e.target.value)}
										rows={8}
										disabled={disabledInputs}
									/>
									{errors?.message && (
										<p className="mt-1 text-sm text-red-500">
											{errors.message?.message}
										</p>
									)}
								</div>
							</div>
							
					</div>
					<div className="flex w-full gap-[60px]">
						<div className="flex w-full items-start">
							<Label
								labelStyling="w-[15%]"
								spanStyling="text-black font-medium text-[16px]"
							>
								Priority Number
							</Label>
							<InputNumber
								className="p-0 input h-[38px] rounded-[5px] w-20"
								defaultValue={prio!}
								onChange={setPrio}
								disabled={disabledInputs}
								min={1}
								max={99}
							/>
						</div>
						
					</div>
				</div>
				<div className="flex justify-end gap-[15px]">
					{!disabledInputs ? (
						<>
							{record && 
							<Button
								onClick={showDeleteConfirm}
								type="primary"
								size="large"
								className="search-button !bg-error-500 !rounded-[18px]"
							>
								Delete
							</Button>}
							
							<Button
								htmlType="submit"
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
		</Form>
	);
}
