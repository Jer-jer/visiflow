import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

//Interfaces
import { HomeEditor } from "../../../../utils/interfaces";

//Layouts

//Components
import { Button, Modal, InputNumber, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";
//zod for display error


//Assets
import { ExclamationCircleFilled, LeftOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";
import AxiosInstace from "../../../../lib/axios";

import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { EmployeeDetailsZod, EmployeesZod } from "../../../../utils/zodSchemas";

import { jwtDecode } from "jwt-decode";

interface PageDetailsProps {
	record?: any;
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
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<EmployeesZod>({
		resolver: zodResolver(EmployeeDetailsZod),
	});

	const token = localStorage.getItem("token");
	const decodedtoken = (jwtDecode (token as string));


	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	//Modal States

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	useEffect(() => {
		handleName(name);
		handleContact(contact);
		handleEmail(email);
	}, [])

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
					contact: contact,
					userID: decodedtoken.sub
				}); 
				setSavedRecord(response.data.event);
			} catch (err: any) {
				error('Error in adding employee: ' + err.response.data.error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/employees/update', { 
					_id: record === undefined ? savedRecord._id : record._id,
					name: name === "" ? record?.name : name,
					email: email === "" ? record?.email : email,
					contact: contact === "" ? record?.contact : contact,
					userID: decodedtoken.sub
				}); 
			} catch (err: any) {
				error('Error in updating employee: ' + err.response.data.error);
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
					await AxiosInstace.delete('/employees/delete', { data: { _id: record?._id, userID: decodedtoken.sub } });
					fetch();
					setOpenDetails(false);
				  } catch (error) {
					console.error('Error deleting employees:', error);
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

	const handleName = (value: any) => {
		setName(value);
		setValue("name", value);
	}

	const handleEmail = (value: any) => {
		setEmail(value);
		setValue("email", value);
	}

	const handleContact = (value: any) => {
		setContact(value);
		setValue("contact", value);
	}

	return (
		<Form name="EmployeeList" onFinish={onSubmit} autoComplete="off">
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
							<div className="flex w-full items-start">
							<div className="flex w-full flex-col">
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
								placeHolder={record?.title}
								//data to be accepted by zod to validate
								{...register("name")}
								input={name}
								setInput={handleName}
								visitorMngmnt
								disabled={disabledInputs}
							/>
							{/* zod */}
							{errors?.name && (
								<p className="mt-1 text-sm text-red-500">
									{errors.name?.message}
								</p>
							)}
							</div>
						</div>
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
							<div className="flex w-full flex-col">
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
								placeHolder={record?.email}
								{...register("email")}
								input={email}
								setInput={handleEmail}
								visitorMngmnt
								disabled={disabledInputs}
							/>
							{errors?.email && (
								<p className="mt-1 text-sm text-red-500">
									{errors.email?.message}
								</p>
							)}
							</div>
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
							<div className="flex w-full flex-col">
								
							<Input
								inputType="text"
								inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-[40%]"
								placeHolder={record?.contact}
								{...register("contact")}
								input={contact}
								setInput={handleContact}
								visitorMngmnt
								disabled={disabledInputs}
							/>
							{errors?.contact && (
								<p className="mt-1 text-sm text-red-500">
									{errors.contact?.message}
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
