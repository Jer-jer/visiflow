import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

//Interfaces

//Layouts

//Components
import { Button, Modal, InputNumber, Form } from "antd";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";
import {useForm} from "react-hook-form";

//Assets
import { ExclamationCircleFilled, LeftOutlined } from "@ant-design/icons";
import { ReasonDetailsZod, ReasonZod } from "../../../../utils/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

//Styles
import "./styles.scss";
import AxiosInstace from "../../../../lib/axios";

import { jwtDecode } from "jwt-decode";

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

	//Zod
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ReasonZod>({
		resolver: zodResolver(ReasonDetailsZod),
	});

	const token = localStorage.getItem("token");
	const decodedtoken = (jwtDecode (token as string));

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
					userID: decodedtoken.sub
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
					userID: decodedtoken.sub
				}); 
			} catch (error) {
			console.error('Error in updating reason:', error);
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
					await AxiosInstace.delete('/reasons/delete', { data: { _id: record?._id, userID: decodedtoken.sub } });
					fetch();
					setOpenDetails(false);
				  } catch (error) {
					console.error('Error deleting reason:', error);
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

	const handleReason = (value: any) => {
		setReason(value);
		setValue("reason", value);
	}

	useEffect(() => {
		handleReason(reason);
	}, [])

	return (
		<Form name="ReasonList" onFinish={onSubmit} autoComplete="off">
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
								<div className="flex w-full flex-col">
									<Input
										inputType="text"
										inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
										placeHolder={record?.reason}
										{...register("reason")}
										input={reason}
										setInput={handleReason}
										visitorMngmnt
										disabled={disabledInputs}
									/>
									{/* zod */}
									{errors?.reason && (
										<p className="mt-1 text-sm text-red-500">
											{errors.reason?.message}
										</p>
									)}
								</div>
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
