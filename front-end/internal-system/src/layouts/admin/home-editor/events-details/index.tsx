import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AxiosInstace from "../../../../lib/axios";

//Interfaces
import { EventsSchedule } from "../../../../utils/interfaces";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

//Layouts

//Components
import {
	Button,
	DatePicker,
	Modal,
	TimePicker,
	message,
	Upload,
	Image,
    Select,
	Form,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";
import DateTimePicker from "../../../../components/datetime-picker";

//Assets
import {
	ExclamationCircleFilled,
	LeftOutlined,
	LoadingOutlined,
	PlusOutlined,
} from "@ant-design/icons";

//Styles
import "./styles.scss";
import AxiosInstance from "../../../../lib/axios";

import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { EventDetailsZod, EventZod } from "../../../../utils/zodSchemas";
import { jwtDecode } from "jwt-decode";

dayjs.extend(customParseFormat);

interface EventsSchedDetailsProps {
	record?: any;
	setOpenDetails: Dispatch<SetStateAction<boolean>>;
	fetch: () => void;
}

const { confirm } = Modal;

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

interface SelectOption {
	label: string;
	value: string;
};

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

//Main Function
export default function EventsSchedDetails({
	record,
	setOpenDetails,
	fetch,
}: EventsSchedDetailsProps) {
	//Form States
	const [name, setName] = useState(record?.name === undefined ? "" : record?.name);
	const [startDate, setStartDate] = useState(record?.startDate === undefined ? new Date() : record?.startDate);
	const [endDate, setEndDate] = useState(record?.endDate === undefined ? new Date() : record?.endDate);
	const [startTime, setStartTime] = useState(record?.startTime === undefined ? new Date() : record?.startTime);
	const [endTime, setEndTime] = useState(record?.endTime === undefined ? new Date() : record?.endTime);
	const [locationId, setLocationId] = useState(record?.locationID === undefined ? "" : record?.locationID);
	const [description, setDescription] = useState(record?.description === undefined ? "" : record?.description);

	const [whereList, setWhereList] = useState<SelectOption[]>([]);

	//Image States
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState<string | ArrayBuffer | null>(null);
	const [imageUrl, setImageUrl] = useState<string>(record === undefined ? "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" : record?.eventImg);
	const [savedRecord, setSavedRecord] = useState(record);

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const { RangePicker } = DatePicker;

	const token = localStorage.getItem("token");
	const decodedtoken = (jwtDecode (token as string));

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<EventZod>({
		resolver: zodResolver(EventDetailsZod),
	});


	const editOrCancel = () => {
		if (!disabledInputs) {
			setName("");
			setLocationId("");
			setDescription("");
		}

		setDisabledInputs(!disabledInputs);
	};

	const saveAction = async() => {
		if(savedRecord=== undefined) {
			try {
				const response = await AxiosInstace.post('/events/new', { 
					name: name,
					startDate: startDate,
					endDate: endDate,
					startTime: startTime,
					endTime: endTime,
					locationID: locationId,
            		description: description,
					eventImg: image,
					userID: decodedtoken.sub
				}); 
				setSavedRecord(response.data.event);
			} catch (err: any) {
				error('Error in adding event: ' + err.response.data.error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/events/update', { 
					_id: record === undefined ? savedRecord._id : record._id,
					name: name === "" ? record?.name : name,
					startDate: startDate,
					endDate: endDate,
					startTime: startTime,
					endTime: endTime,
					locationID: locationId,
					description: description,
            		// userID: userID,
					eventImg: image === null ? record?.eventImg : image,
					userID: decodedtoken.sub
				}); 
			} catch (err: any) {
				error('Error in updating event: ' + err.response.data.error);
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
					await AxiosInstace.delete('/events/delete', { data: { _id: record?._id, userID: decodedtoken.sub } });
					fetch();
					setOpenDetails(false);
				  } catch (error) {
					console.error('Error deleting events:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const handleName = (value: any) => {
		setName(value);
		setValue('name', value);
	}

	const handleLocationId = (value: any) => {
		setLocationId(value);
		setValue('locationId', value);
	}

	const handleDescription = (value: any) => {
		setDescription(value);
		setValue('description', value);
	}

	const handleChangeRange = (date: any) => {
		setStartTime(new Date(date[0]));
		setValue('startTime', new Date(date[0]));
		setEndTime(new Date(date[1]));
		setValue('endTime', new Date(date[1]));
	}

	const handleChangeStartDate = (date: any) => {
		setStartDate(date);
		setValue('startDate', new Date(date));
	}

	const handleChangeEndDate = (date: any) => {
		setEndDate(date);
		setValue('endDate', new Date(date));
	}

	const handleImageUpload = (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();
	
		reader.onloadend = () => {
		const base64String = reader.result;
		setImage(base64String);
		const url = URL.createObjectURL(file);
		setImageUrl(url);
		setValue('imageUrl', url)
		};
	
		if (file) {
		reader.readAsDataURL(file);
		}
	};

	const fetchAndSetBuildings = async () => {
		try {
			const response = await AxiosInstance.get("/buildings/");
			const data = response.data.buildings;

			//getting only the data we want
			const convertedData: SelectOption[] = data.map((building: any) => ({
				value: building.name,
				label: building.name,
			}));
			return convertedData;
		} catch (error) {
			console.error("Error fetching buildings:", error);
		}
	};

	const fetchAndSetOffices = async () => {
		try {
			const response = await AxiosInstance.get("/offices/");
			const data = response.data.office;

			//getting only the data we want
			const convertedData: SelectOption[] = data.map((office: any) => ({
				value: `${office.name} - ${office.build}, Floor ${office.floor}, ${office.roomNo}`,
				label: `${office.name} - ${office.build}, Floor ${office.floor}, ${office.roomNo}`,
			}));
			return convertedData;
		} catch (error) {
			console.error("Error fetching buildings:", error);
		}
	};

	const getWhere = async () => {
		let buildingsPromise = fetchAndSetBuildings();
		let officesPromise = fetchAndSetOffices();

		let buildings = await buildingsPromise;
		let offices = await officesPromise;
		
		if (buildings !== undefined && offices !== undefined) {
			let combinedArray: SelectOption[] = [...buildings, ...offices];
			setWhereList(combinedArray);
		}
	};

	const onSubmit = handleSubmit((data) => {
		saveAction();
	});

	useEffect(() => {
		getWhere();
		handleName(name);
		setValue('startDate', new Date(startDate));
		setValue('endDate', new Date(endDate));
		setValue('startTime', new Date(startTime));
		setValue('endTime', new Date(endTime));
		handleLocationId(locationId);
		handleDescription(description);
		setValue('imageUrl', imageUrl);
	}, [])

	return (
		<Form name="OfficeDetails" onFinish={onSubmit} autoComplete="off">
			<div className="mr-[135px] flex flex-col gap-[35px] pt-[25px]">
				<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
					<div className="flex justify-start">
						<div className="mr-[106px] flex w-[73%] flex-col gap-[20px]">
							<div className="flex gap-[30px]">
								<div className="flex w-full gap-[32px]">
									<Label spanStyling="text-black font-medium text-[16px]">
										Event Name
									</Label>
									<div className="flex w-full flex-col">
									<Input
										inputType="text"
										inputStyling="input w-full h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
										placeHolder={record?.name}
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
							<div className="flex gap-[30px]">
								<div className="flex w-full gap-[50px]">
									<Label spanStyling="text-black font-medium text-[16px]">
										Start Date
									</Label>
									<div className="flex w-full flex-col">
									<DatePicker
										className={`vm-placeholder w-full border-none !border-[#d9d9d9] bg-[#e0ebf0] hover:!border-primary-500 focus:!border-primary-500 ${
											disabledInputs && "picker-disabled"
										}`}
										size="middle"
										value={dayjs(startDate)}
										onChange={handleChangeStartDate}
										format="MMMM DD, YYYY"
										disabled={disabledInputs}
									/>
									{/* zod */}
									{errors?.startDate && (
										<p className="mt-1 text-sm text-red-500">
											{errors.startDate?.message}
										</p>
									)}
									</div>
								</div>
								<div className="flex w-full gap-[50px]">
									<Label spanStyling="text-black font-medium text-[16px]">
										End Date
									</Label>
									<div className="flex w-full flex-col">
									<DatePicker
										className={`vm-placeholder w-full border-none !border-[#d9d9d9] bg-[#e0ebf0] hover:!border-primary-500 focus:!border-primary-500 ${
											disabledInputs && "picker-disabled"
										}`}
										size="middle"
										value={dayjs(endDate)}
										onChange={handleChangeEndDate}
										format="MMMM DD, YYYY"
										disabled={disabledInputs}
									/>
									{/* zod */}
									{errors?.endDate && (
										<p className="mt-1 text-sm text-red-500">
											{errors.endDate?.message}
										</p>
									)}
									</div>
								</div>
							</div>
							<div className="flex w-full gap-[75px]">
								<Label spanStyling="text-black font-medium text-[16px]">
									Time
								</Label>
								<div className="flex w-full flex-col">
								<RangePicker
									className={`vm-placeholder w-full border-none !border-[#d9d9d9] bg-[#e0ebf0] hover:!border-primary-500 focus:!border-primary-500 ${
										disabledInputs && "picker-disabled"
									}`}
									size="middle"
									picker="time"
									value={[
										dayjs(startTime),
										dayjs(endTime),
									]}
									onChange={handleChangeRange}
									placeholder={["From", "To"]}
									changeOnBlur={false}
									format="hh:mm A"
									style={{
										borderColor: "#0db284",
									}}
									disabled={disabledInputs}
								/>
								{/* zod */}
								{errors?.startTime && (
									<p className="mt-1 text-sm text-red-500">
										{errors.endDate?.message}
									</p>
								)}
								{errors?.endTime && (
									<p className="mt-1 text-sm text-red-500">
										{errors.endTime?.message}
									</p>
								)}
								</div>
							</div>
							<div>
								<div className="flex w-full gap-[50px]">
									<Label spanStyling="text-black font-medium text-[16px]">
										Location
									</Label>
									<div className="flex w-full flex-col">
									<Select
										className="w-[315px] md:w-[397px]"
										size="large"
										placement="bottomLeft"
										allowClear
										showSearch
										placeholder="Where"
										listHeight={150}
										options={whereList}
										onChange={(value) =>
											handleLocationId(value)
										}
										value={locationId}
										disabled={disabledInputs}
									/>
									{/* zod */}
									{errors?.locationId && (
										<p className="mt-1 text-sm text-red-500">
											{errors.locationId?.message}
										</p>
									)}
									</div>
								</div>
							</div>
							<div className="flex w-full items-start gap-[30px]">
								<Label spanStyling="text-black font-medium text-[16px]">
									Description
								</Label>
								<div className="flex w-full flex-col">
								<TextArea
									className="custom-textarea input h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
									placeholder={record?.description}
									value={description}
									onChange={(e) => handleDescription(e.target.value)}
									rows={8}
									disabled={disabledInputs}
								/>
								{errors?.description && (
									<p className="mt-1 text-sm text-red-500">
										{errors.description?.message}
									</p>
								)}
								</div>
							</div>
						</div>
						<div>
							<div className="flex w-full flex-col">
							{disabledInputs ? (
								<Image
									width={200}
									src={imageUrl}
								/>
							) : (
								<div>
									<input type="file" accept="image/*" onChange={handleImageUpload} />
									{image && (
										<div>
										<h2>Uploaded Image:</h2>
										<Image
											width={280}
											src={image.toString()}
										/>
										</div>
									)}
								</div>
							)}
							{errors?.imageUrl && (
									<p className="mt-1 text-sm text-red-500">
										{errors.imageUrl?.message}
									</p>
								)}
							</div>
						</div>
					</div>
					{/* <div className="divider" /> */}
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
