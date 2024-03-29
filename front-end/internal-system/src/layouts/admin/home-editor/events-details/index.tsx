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

dayjs.extend(customParseFormat);

interface EventsSchedDetailsProps {
	record?: any;
	setOpenDetails: Dispatch<SetStateAction<boolean>>;
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

//Main Function
export default function EventsSchedDetails({
	record,
	setOpenDetails,
}: EventsSchedDetailsProps) {
	//Form States
	const [name, setName] = useState("");
	const [startDate, setStartDate] = useState(record === undefined ? new Date() : record?.startDate);
	const [endDate, setEndDate] = useState(record === undefined ? new Date() : record?.endDate);
	const [startTime, setStartTime] = useState(record === undefined ? new Date() : record?.startTime);
	const [endTime, setEndTime] = useState(record === undefined ? new Date() : record?.endTime);
	const [locationId, setLocationId] = useState("");
	const [description, setDescription] = useState("");

	//Image States
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: "-1",
			name: "image.png",
			status: "done",
			url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
		},
	]);

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const { RangePicker } = DatePicker;

	const handleChange: UploadProps["onChange"] = (
		info: UploadChangeParam<UploadFile>,
	) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};

	const editOrCancel = () => {
		if (!disabledInputs) {
			setName("");
			setLocationId("");
			setDescription("");
		}

		setDisabledInputs(!disabledInputs);
	};

	useEffect(() => {
		console.log(record)
		console.log("name:", name)
		console.log("startDate:", startDate)
		console.log("endDate:", endDate)
		console.log("startTime:", startTime)
		console.log("endTime:", endTime)
		console.log("locationID:", locationId)
		console.log("description:", description)
	}, [])

	const saveAction = async() => {
		//This needs to be customized to whatever the DB returns
		console.log("name:", name)
		console.log("startDate:", startDate)
		console.log("endDate:", endDate)
		console.log("startTime:", startTime)
		console.log("endTime:", endTime)
		console.log("locationID:", locationId)
		console.log("description:", description)
		if(record === undefined) {
			try {
				await AxiosInstace.post('/events/new', { 
					name: name,
					startDate: startDate,
					endDate: endDate,
					startTime: startTime,
					endTime: endTime,
					locationID: locationId,
            		description: description
				}); 
			} catch (error) {
			console.error('Error in adding event:', error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/events/update', { 
					_id: record?._id,
					name: name === "" ? record?.name : name,
					startDate: startDate,
					endDate: endDate,
					startTime: startTime,
					endTime: endTime,
					locationID: locationId,
					description: description
            		// userID: userID
				}); 
			} catch (error) {
			console.error('Error in updating event:', error);
			}
		}

		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleChangeRange = (date: any) => {
		setStartTime(date[0]);
		setEndTime(date[1]);
	}

	const handleChangeStartDate = (date: any) => {
		setStartDate(date);
	}

	const handleChangeEndDate = (date: any) => {
		setEndDate(date);
	}

	return (
		<div className="mr-[135px] flex flex-col gap-[35px] pt-[25px]">
			<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
				<div className="flex justify-start">
					<div className="mr-[106px] flex w-[73%] flex-col gap-[20px]">
						<div className="flex gap-[30px]">
							<div className="flex w-full gap-[32px]">
								<Label spanStyling="text-black font-medium text-[16px]">
									Event Name
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-full h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.name}
									input={name}
									setInput={setName}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
						</div>
						<div className="flex gap-[30px]">
							<div className="flex w-full gap-[36px]">
								<Label spanStyling="text-black font-medium text-[16px]">
									Start Date
								</Label>
								<DatePicker
									className={`vm-placeholder w-[68%] border-none !border-[#d9d9d9] bg-[#e0ebf0] hover:!border-primary-500 focus:!border-primary-500 ${
										disabledInputs && "picker-disabled"
									}`}
									size="middle"
									value={dayjs(startDate)}
									onChange={handleChangeStartDate}
									format="MMMM DD, YYYY"
									disabled={disabledInputs}
								/>
							</div>
							<div className="flex w-full gap-[36px]">
								<Label spanStyling="text-black font-medium text-[16px]">
									End Date
								</Label>
								<DatePicker
									className={`vm-placeholder w-[68%] border-none !border-[#d9d9d9] bg-[#e0ebf0] hover:!border-primary-500 focus:!border-primary-500 ${
										disabledInputs && "picker-disabled"
									}`}
									size="middle"
									value={dayjs(endDate)}
									onChange={handleChangeEndDate}
									format="MMMM DD, YYYY"
									disabled={disabledInputs}
								/>
							</div>
						</div>
						<div className="flex w-full gap-[75px]">
							<Label spanStyling="text-black font-medium text-[16px]">
								Time
							</Label>
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
						</div>
						<div className="flex w-full gap-[50px]">
							<Label spanStyling="text-black font-medium text-[16px]">
								Location
							</Label>
							<Input
								inputType="text"
								inputStyling="input w-full h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
								placeHolder={record?.locationID}
								input={locationId}
								setInput={setLocationId}
								visitorMngmnt
								disabled={disabledInputs}
							/>
						</div>
						<div className="flex w-full items-start gap-[30px]">
							<Label spanStyling="text-black font-medium text-[16px]">
								Description
							</Label>
							<TextArea
								className="custom-textarea input h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
								placeholder={record?.description}
								onChange={(e) => setDescription(e.target.value)}
								rows={8}
								disabled={disabledInputs}
							/>
						</div>
					</div>
					<div>
						{disabledInputs ? (
							<Image
								width={200}
								src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
							/>
						) : (
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader w-[353px]"
								showUploadList={false}
								action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
								beforeUpload={beforeUpload}
								onChange={handleChange}
								fileList={fileList}
							>
								{imageUrl ? (
									<img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
								) : (
									uploadButton
								)}
							</Upload>
						)}
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
