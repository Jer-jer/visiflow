import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import dayjs from "dayjs";

//Interfaces
import { OfficeSchedule } from "../../../../utils/interfaces";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";

//Layouts

//Components
import { Button, Dropdown, Modal, DatePicker, message, Image, MenuProps, Upload } from "antd";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";
import AxiosInstace from "../../../../lib/axios";

//Assets
import { ExclamationCircleFilled, LeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";
import { ArrowDown } from "../../../../assets/svg";


interface OfficeSchedDetailsProps {
	record?: any;
	setOpenDetails: Dispatch<SetStateAction<boolean>>;
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

export default function OfficeSchedDetails({
	record,
	setOpenDetails,
}: OfficeSchedDetailsProps) {
	//Form States
	const [name, setName] = useState("");
	const [roomNo, setRoomNo] = useState("");
	const [pic, setPic] = useState("");
	const [contact, setContact] = useState("");
	const [email, setEmail] = useState("");
	const [opentime, setOpentime] = useState(record?.opentime === undefined ? Date.now : record?.opentime);
	const [closetime, setClosetime] = useState(record?.closetime === undefined ? Date.now : record?.closetime);
	const [openday, setOpenday] = useState(record?.openday === undefined ? new Array(7).fill(false) : record?.openday);
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

	//Modal States

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const editOrCancel = () => {
		// if (!disabledInputs) {
		// 	setName("");
		// 	setRoomNo("");
		// 	setPic("");
		// 	setContact("");
		// 	setEmail("");
		// 	setOpentime(Date.now);
		// 	setClosetime(Date.now);
		// 	setOpenday(new Array(7).fill(false));
		// }

		setDisabledInputs(!disabledInputs);
	};

	useEffect(() => {
		console.log("test", record?.opentime, record?.closetime, record?.openday)
		console.log("hello", opentime, closetime, openday)
	})

	const saveAction = async() => {
		//This needs to be customized to whatever the DB returns

		// saving new record
		if(record === undefined) {
			try {
				await AxiosInstace.post('/offices/new', { 
					name: name, 
					roomNo: roomNo,
					pic: pic,
					contact: contact,
					email: email,
					opentime: opentime,
					closetime: closetime,
					openday: openday,
					officeImg: imageUrl
				}); 
			} catch (error) {
			console.error('Error in adding office:', error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/offices/update', { 
					_id: record?._id,
					name: name === "" ? record?.name : name, 
					roomNo: roomNo === "" ? record?.roomNo : roomNo,
					pic: pic === "" ? record?.pic : pic,
					contact: contact === "" ? record?.contact : contact,
					email: email === "" ? record?.email : email,
					opentime: opentime,
					closetime: closetime,
					openday: openday,
					officeImg: imageUrl === undefined ? record?.officeImg : imageUrl,
				}); 
			} catch (error) {
			console.error('Error in updating office:', error);
			}
		}

		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);
	};

	const handleCheckboxChange = (index: number) => {
		const updatedSelectedDays = [...openday];
		updatedSelectedDays[index] = !updatedSelectedDays[index];
		setOpenday(updatedSelectedDays);
	  };

	const handleChangeRange = (date: any) => {
		setOpentime(date[0]);
		setClosetime(date[1]);
	}

	const handleImage: UploadProps["onChange"] = (
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

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const { RangePicker } = DatePicker;

	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

	

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
									placeHolder={record?.name}
									input={name}
									setInput={setName}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Room No.
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.roomNo}
									input={roomNo}
									setInput={setRoomNo}
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
									placeHolder={record?.pic}
									input={pic}
									setInput={setPic}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
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
						</div>
						<div className="flex gap-[80px]">
							<div className="flex w-full justify-between">
								<Label spanStyling="text-black font-medium text-[16px]">
									Email
								</Label>
								<Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.email}
									input={email}
									setInput={setEmail}
									visitorMngmnt
									disabled={disabledInputs}
								/>
							</div>
							<div className="flex w-full justify-between">
							</div>
							{/* <div className="flex w-full justify-between">
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
							</div> */}
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
									dayjs(opentime),
									dayjs(closetime),
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
						<div className="flex w-full gap-[75px]">
						<Label spanStyling="text-black font-medium text-[16px]">
							Available Days
						</Label>
						<div className="flex gap-2">
							{daysOfWeek.map((day, index) => (
							<label key={day} className="inline-flex items-center">
								<input
								type="checkbox"
								checked={openday[index]}
        						onChange={() => handleCheckboxChange(index)}
								className="form-checkbox h-5 w-5 text-[#3182ce] rounded border-gray-300 focus:ring-[#3182ce] focus:border-[#3182ce]"
								/>
								<span className="ml-2 text-gray-700">{day}</span>
							</label>
							))}
						</div>
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
								onChange={handleImage}
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
