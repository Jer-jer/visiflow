import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import dayjs from "dayjs";

//Interfaces
import { OfficeSchedule } from "../../../../utils/interfaces";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";

//Layouts

//Components
import { Button, Dropdown, Modal, DatePicker, message, Image, MenuProps, Select} from "antd";
import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";
import AxiosInstace from "../../../../lib/axios";

//Assets
import { ExclamationCircleFilled, LeftOutlined} from "@ant-design/icons";

//Styles
import "./styles.scss";
import { ArrowDown } from "../../../../assets/svg";


interface OfficeSchedDetailsProps {
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
	fetch
}: OfficeSchedDetailsProps) {
	//Form States
	const [name, setName] = useState(record?.name === undefined ? "" : record?.name);
	const [roomNo, setRoomNo] = useState(record?.roomNo === undefined ? "" : record?.roomNo);
	const [pic, setPic] = useState(record?.pic === undefined ? "" : record?.pic);
	const [contact, setContact] = useState(record?.contact === undefined ? "" : record?.contact);
	const [email, setEmail] = useState(record?.email === undefined ? "" : record?.email);
	const [opentime, setOpentime] = useState(record?.opentime === undefined ? new Date() : record?.opentime);
	const [closetime, setClosetime] = useState(record?.closetime === undefined ? new Date() : record?.closetime);
	const [openday, setOpenday] = useState(record?.openday === undefined ? new Array(7).fill(false) : record?.openday);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState<string | ArrayBuffer | null>(null);
	const [imageUrl, setImageUrl] = useState<string>(record === undefined ? "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" : record?.officeImg);
	const [savedRecord, setSavedRecord] = useState(record);

	const [employee, setEmployees] = useState<any>([]);

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

	const saveAction = async() => {
		if(savedRecord=== undefined) {
			try {
				const response = await AxiosInstace.post('/offices/new', { 
					name: name, 
					roomNo: roomNo,
					pic: pic,
					contact: contact,
					email: email,
					opentime: opentime,
					closetime: closetime,
					openday: openday,
					officeImg: image
				}); 
				setSavedRecord(response.data.office);
			} catch (error) {
			console.error('Error in adding office:', error);
			}
		} else { // updating record
			try {
				await AxiosInstace.put('/offices/update', { 
					_id: record === undefined ? savedRecord._id : record._id,
					name: name === "" ? record?.name : name, 
					roomNo: roomNo === "" ? record?.roomNo : roomNo,
					pic: pic === "" ? record?.pic : pic,
					contact: contact === "" ? record?.contact : contact,
					email: email === "" ? record?.email : email,
					opentime: opentime,
					closetime: closetime,
					openday: openday,
					officeImg: image === null ? record?.officeImg : image,
				}); 
			} catch (error) {
			console.error('Error in updating office:', error);
			}
		}

		fetch();

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

	const { RangePicker } = DatePicker;

	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

	  
	const handleImageUpload = (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();
	
		reader.onloadend = () => {
		const base64String = reader.result;
		setImage(base64String);
		setImageUrl(URL.createObjectURL(file));
		};
	
		if (file) {
		reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		fetchAllPersonnel();
	}, [])

	const fetchAllPersonnel = async () => {
		try {
			const response = await AxiosInstace.get('/employees/')
			const data = response.data.employees
			
			setEmployees(data);
		  } catch (error) {
			console.error('Error fetching employees:', error);
		  }
	}

	const onChangeSelected = (selectedOption: any) => {
		setPic(selectedOption);
		assignEmail(selectedOption);
	
	}

	const assignEmail = (selected: any) => {
		const selectedEmployee = employee.find((emp: any) => emp.name === selected);
		
		if (selectedEmployee) {
			setEmail(selectedEmployee.email);
		} else {
			setEmail('');
		}
	}

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
								{/* <Input
									inputType="text"
									inputStyling="input w-[57%] h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
									placeHolder={record?.pic}
									input={pic}
									setInput={setPic}
									visitorMngmnt
									disabled={disabledInputs}
								/> */}
								<Select
									className="input w-[57%] h-[38px] rounded-[5px] p-0"
									key={JSON.stringify(employee)}
									onChange={onChangeSelected}
									defaultValue={pic}
									options={employee ? employee.map((emp: any) => ({
										value: emp.name,
										label: <span>{emp.name}</span>
									})) : []}
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
									inputStyling="w-[57%] h-[38px] rounded-[5px] border-cyan-800"
									placeHolder={record?.email}
									input={email}
									setInput={setEmail}
									visitorMngmnt
									disabled={true}
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
