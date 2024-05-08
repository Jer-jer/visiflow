import React, {
	useState,
	useContext,
	createContext,
	MutableRefObject,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useDispatch, useSelector } from "react-redux";

//Interfaces
import {
	VisitorDetailZod,
	VisitorDetailsInterfaceZod,
	VisitorDetailZodNoEmail,
} from "../../../utils/zodSchemas";
import { VisitorDataType, IDPictureProps } from "../../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../../utils/enums";
import { WidthContext } from "../../logged-in";
import type { RootState } from "../../../store";
import type { Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";

// Utils
import { formatDateObjToString } from "../../../utils";
import { SelectOption } from "../../../utils/interfaces";

//Layouts
import VisitorLogs from "../../admin/visitor-management/visitor-logs";
import VisitorCompanions from "../../admin/visitor-management/visitor-companions";
import Notify from "../../admin/visitor-management/notify";
import NotifyPOI from "../../admin/visitor-management/notify-poi";
import Identification from "../../admin/visitor-management/identification";

//Components
import {
	Button,
	Avatar,
	Select,
	Input,
	Form,
	Tag,
	DatePicker,
	Modal,
} from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import Label from "../../../components/fields/input/label";
import Alert from "../../../components/alert";

//Reducers
import { update, deleteVisitor } from "../../../states/visitors";
import { updateVisitor, removeTab } from "../../../states/visitors/tab";
import { addLog, removeLogs } from "../../../states/logs/visitor";

//Assets
import { ExclamationCircleFilled, LeftOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

//Styles
import "./styles.scss";

// Libraries
import AxiosInstance from "../../../lib/axios";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface VisitorDeetsProps {
	record: VisitorDataType;
	setOpenDetails: Dispatch<SetStateAction<boolean>>;
	fetch: () => void;
}

type VisitorDetailTypeZod = z.infer<typeof VisitorDetailZod>;

const { confirm } = Modal;

export const VisitorRecordContext = createContext<VisitorDataType | undefined>(
	undefined,
);

const warning = (message: string) => {
	Modal.warning({
		title: `Warning`,
		content: message,
	});
};

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

export default function VisitorStatusDetails({
	record,
	setOpenDetails,
	fetch
}: VisitorDeetsProps) {
	//Loading
	const [loading, setLoading] = useState(false);

	const [emailRecipient, setEmailRecipient] = useState([]);
	const [whoList, setWhoList] = useState<SelectOption[]>([]);
	const [whatList, setWhatList] = useState<SelectOption[]>([]);
	const [whereList, setWhereList] = useState<SelectOption[]>([]);

	const expected_in = formatDateObjToString(record.expected_time_in);
	const expected_out = formatDateObjToString(record.expected_time_out);
	//Alert State
	const [status, setStatus] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	const [visitorStatusUpdate, setVisitorStatusUpdate] = useState<VisitorStatus>(
		VisitorStatus.InProgress,
	);

	//? Modal States
	const [identificationOpen, setIdentificationOpen] = useState(false);
	const [visitorMessage, setVisitorMessage] = useState<string>(
		"Your pre-registration application has been approved. Please find the QR code attached. Thank you!",
	);

	//? Disabled Inputs
	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
	const [disabledStatusInput, setDisabledStatusInput] = useState<boolean>(true);

	const [idPicture] = useState<IDPictureProps>({
		//? In case there are no pictures
		front:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
		back: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
		selfie:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
	});

	//? Width Context
	const width = useContext(WidthContext);

	//? Notify POI Message
	const fetchAndSetEmployees = async () => {
		try {
			const response = await AxiosInstance.get("/employees/");
			const data = response.data.employees;

			const convertedData: SelectOption[] = data.map((employee: any) => ({
				value: employee.name,
				label: employee.name,
			}));
			setEmailRecipient(
				data.filter((x: any) =>
					record.purpose.who.some((y: string) => x.name === y),
				),
			);
			setWhoList(convertedData);
		} catch (error) {
			console.error("Error fetching employees:", error);
		}
	};

	const fetchAndSetReasons = async () => {
		try {
			const response = await AxiosInstance.get("/reasons/");
			const data = response.data.reasons;

			//getting only the data we want
			const convertedData: SelectOption[] = data.map((purpose: any) => ({
				value: purpose.reason,
				label: purpose.reason,
			}));
			setWhatList(convertedData);
		} catch (error) {
			console.error("Error fetching reasons:", error);
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
			let combinedArray = [...buildings, ...offices];
			setWhereList(combinedArray);
		}
	};

	useEffect(() => {
		fetchAndSetEmployees();
		fetchAndSetReasons();
		getWhere();
	}, []);

	const recipient: SelectOption[] = whoList
		? whoList.filter((who, index) => who.label === record.purpose.who[index])
		: [];
	const subject: string = "Meeting Appointment via Pre-Registration";
	const message: string = `You have a request appointment with a visitor. Please confirm the appointment. Thank you! 

What: ${record.purpose.what.map((what) => what).join(", ")} 
When: ${formatDateObjToString(record.purpose.when)}
Where: ${record.purpose.where.map((where) => where).join(", ")}
Who: ${recipient.map((who) => who.label).join(", ")}`;

	// Store Related variables
	const tabs: any = useSelector((state: RootState) => state.visitorTabs);
	const { companions } = useSelector((state: RootState) => state.companions);
	const companionDetails = companions.map(
		(companion) => companion.visitor_details,
	);

	const dispatch = useDispatch();

	// Client-side Validation related data
	const isPreRegistered = record.visitor_type === VisitorType.PreRegistered;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<VisitorDetailTypeZod>({
		resolver: zodResolver(
			isPreRegistered ? VisitorDetailZod : VisitorDetailZodNoEmail,
		),
		defaultValues: {
			first_name: record.visitor_details.name.first_name,
			middle_name: record.visitor_details.name.middle_name,
			last_name: record.visitor_details.name.last_name,
			check_in_out: [
				formatDateObjToString(record.expected_time_in),
				formatDateObjToString(record.expected_time_out),
			],
			phone: record.visitor_details.phone,
			email: record.visitor_details.email,
			house: record.visitor_details.address.house,
			street: record.visitor_details.address.street,
			brgy: record.visitor_details.address.brgy,
			city: record.visitor_details.address.city,
			province: record.visitor_details.address.province,
			country: record.visitor_details.address.country,
			plate_num: record.plate_num,
			status: record.status,
			visitor_type: record.visitor_type,
			what: record.purpose.what,
			when: new Date(record.purpose.when),
			where: record.purpose.where,
			who: record.purpose.who,
		},
	});

	const updateInput = (
		value: string | [string, string] | string[] | Date | any,
		property: string,
	) => {
		switch (property) {
			case "first_name":
				setValue(property, value as string);
				break;
			case "middle_name":
				setValue(property, value as string);
				break;
			case "last_name":
				setValue(property, value as string);
				break;
			case "check_in_out":
				setValue(property, value as [string, string]);
				break;
			case "plate_num":
				setValue(property, value as string);
				break;
			case "visitor_type":
				setValue(property, value);
				break;
			case "status":
				setVisitorStatusUpdate(value);
				setValue(property, value);
				break;
			case "what":
				setValue(property, value as any);
				break;
			case "when":
				setValue(property, value as Date);
				break;
			case "where":
				setValue(property, value as any);
				break;
			case "who":
				setValue(property, value as any);
				break;
		}
	};

	const onRangeChange = (
		dates: null | (Dayjs | null)[],
		dateStrings: string[],
	) => {
		if (dates) {
			updateInput([dateStrings[0], dateStrings[1]], "check_in_out");
		} else {
			console.log("Clear");
		}
	};

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		updateInput(new Date(dateString as string), "when");
	};

	const handleChange = (property: string, value: string | string[]) =>
		updateInput(value, property);

	const cancel = () => {
		setDisabledStatusInput(true);
		setDisabledInputs(true);
		clearErrors();
	};

	const updateStatus = async () => {
		setLoading(true);
		await AxiosInstance.put("/visitor/update-status", {
			_id: record._id,
			status: visitorStatusUpdate,
			email: record.visitor_details.email,
			companions: record.companions,
			message: visitorMessage,
		})
			.then((res) => {
				setLoading(false);
				setStatus(true);
				if (visitorStatusUpdate !== VisitorStatus.InProgress)
					setAlertMsg(
						`Successfully ${visitorStatusUpdate === VisitorStatus.Approved ? "Approved" : visitorStatusUpdate === VisitorStatus.Declined && "Declined"} and Sent Email`,
					);
				else setAlertMsg("Successfully Updated Visitor Status");
				setAlertOpen(true);
				dispatch(update({ ...record, status: visitorStatusUpdate }));
			})
			.catch((err) => {
				if (err && err.response.data.error) {
					const message = err.response.data.error;
					setLoading(false);
					setStatus(false);
					setAlertOpen(true);
					setAlertMsg(message);
				}
			});
	};

	const saveAction = async (
		zodData?: VisitorDetailsInterfaceZod,
		visitorStatus?: VisitorStatus,
	) => {
		await AxiosInstance.put("/visitor/update", {
			_id: record._id,
			// first_name: zodData
			// 	? zodData.first_name[0].toUpperCase() + zodData.first_name.slice(1)
			// 	: record.visitor_details.name.first_name[0].toUpperCase() +
			// 		record.visitor_details.name.first_name.slice(1),
			// middle_name: zodData
			// 	? zodData.middle_name
			// 	: record.visitor_details.name.middle_name,
			// last_name: zodData
			// 	? zodData.last_name[0].toUpperCase() + zodData.last_name.slice(1)
			// 	: record.visitor_details.name.last_name[0].toUpperCase() +
			// 		record.visitor_details.name.last_name.slice(1),
			expected_time_in: zodData ? zodData.check_in_out[0] : expected_in,
			expected_time_out: zodData ? zodData.check_in_out[1] : expected_out,
			// visitor_type: zodData ? zodData.visitor_type : record.visitor_type,
			// purpose: zodData
			// 	? {
			// 			what: zodData.what,
			// 			when: zodData.when,
			// 			where: zodData.where,
			// 			who: zodData.who,
			// 		}
			// 	: record.purpose,
		})
			.then((res) => {
				dispatch(update(res.data.visitor));

				setStatus(true);
				setAlertMsg("Successfully Updated Visitor");
				setAlertOpen(true);
				visitorStatus
					? setDisabledStatusInput(!disabledStatusInput)
					: setDisabledInputs(!disabledInputs);

				fetch();
			})
			.catch((err) => {
				if (err && err.response) {
					const message = err.response.data.error;
					setStatus(false);
					setAlertOpen(true);
					setAlertMsg(message);
				}
			});
	};

	const onSubmit = handleSubmit((data) => {
		saveAction(data);
	});

	const editOrCancel = () => {
		setDisabledInputs(!disabledInputs);
		clearErrors();
	};

	const handleTimeOutOk = async () => {
		await AxiosInstance.post("/badge/timeRecord", {
			_id: record.badge_id,
			record: false,
		})
			.then(() => {
				setStatus(true);
				setAlertOpen(true);
				setAlertMsg("Successfully Timed-Out");
			})
			.catch((err) => {
				if (err && err.response) {
					setStatus(false);
					setAlertOpen(true);
					setAlertMsg(err.response.data.error);
				}
			});
	};

	return (
		<div className="visitor-details">
			{loading && (
				<LoadingOutlined className="absolute left-[45%] top-[20%] z-[10000] text-[164px] text-primary-500" />
			)}
			<div
				className={`transition-alert absolute z-[1] w-full scale-y-0 ease-in-out ${
					alertOpen && "scale-y-100"
				}`}
			>
				<Alert
					globalCustomStyling={`flex w-full overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
					statusStyling="flex w-12 items-center justify-center"
					statusColor={status ? "bg-primary-500" : "bg-error-500"}
					spanStyling="font-semibold"
					statusTextHeaderColor={status ? "text-primary-500" : "text-error-500"}
					descStyling="text-sm text-gray-600"
					header="Information Box"
					desc={alertMsg}
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>

			<Form name="Schedule Details" onFinish={onSubmit} autoComplete="off">
				<div className="mr-[130px] flex flex-col gap-[35px] pt-[80px]">
					<div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
						<div className="flex">
							<div className="flex flex-col gap-[20px]">
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											First Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.name.first_name}
												{...register("first_name")}
												onChange={(e) =>
													updateInput(e.target.value, "first_name")
												}
												disabled={true}
											/>
											{errors?.first_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.first_name.message}
												</p>
											)}
											{errors?.phone && (
												<p className="mt-1 text-sm text-red-500">
													{errors.phone.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Middle Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.name.middle_name}
												{...register("middle_name")}
												onChange={(e) =>
													updateInput(e.target.value, "middle_name")
												}
												disabled={true}
											/>
											{errors?.middle_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.middle_name.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Last Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.name.last_name}
												{...register("last_name")}
												onChange={(e) =>
													updateInput(e.target.value, "last_name")
												}
												disabled={true}
											/>
											{errors?.last_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.last_name.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div
									className={`flex w-full ${
										errors && "items-start"
									} justify-between`}
								>
									<Label
										spanStyling="text-black font-medium text-[16px]"
										labelStyling="w-[22.5%]"
									>
										Expected In and Out
									</Label>
									<div className="flex w-full flex-col">
										<DateTimePicker
											globalStyling="w-full"
											rangePickerStyling="bg-[#e0ebf0] hover:!bg-[#e0ebf0] border-none w-[inherit] focus-within:!bg-[#e0ebf0] focus:!bg-[#e0ebf0]"
											size="large"
											defaultVal={{
												from:
													formatDateObjToString(record.expected_time_in) ||
													formatDateObjToString(new Date()),
												to:
													formatDateObjToString(record.expected_time_out) ||
													formatDateObjToString(new Date()),
											}}
											onRangeChange={onRangeChange}
											visitorMngmnt
											disabled={disabledInputs}
										/>
										{errors?.check_in_out && (
											<p className="mt-1 text-sm text-red-500">
												{errors.check_in_out.message}
											</p>
										)}
									</div>
								</div>
								<div
									className={`flex w-full ${
										errors && "items-start"
									} justify-start`}
								>
									<Label
										spanStyling="text-black font-medium text-[16px]"
										labelStyling="w-[21.5%]"
									>
										Purpose
									</Label>
									<div className="flex w-full flex-col gap-[10px]">
										<div className="flex gap-[20px]">
											<div className="flex w-full flex-col">
												<Select
													className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
													showSearch
													mode="multiple"
													allowClear
													placeholder="What"
													disabled={true}
													listHeight={128}
													defaultValue={record.purpose.what}
													onChange={(value: string[]) =>
														handleChange("what", value)
													}
													options={whatList}
												/>
												{errors?.what && (
													<p className="mt-1 text-sm text-red-500">
														{errors.what.message}
													</p>
												)}
											</div>
											<div className="flex w-full flex-col">
												<DatePicker
													showTime
													className={`w-[inherit] border-none !border-[#d9d9d9] bg-[#e0ebf0] focus-within:!bg-[#e0ebf0] hover:!border-primary-500 hover:!bg-[#e0ebf0] focus:!border-primary-500 focus:!bg-[#e0ebf0] ${
														disabledInputs && "picker-disabled"
													} vm-placeholder`}
													defaultValue={dayjs(
														formatDateObjToString(record.purpose.when),
														"YYYY-MM-DD hh:mm A",
													)}
													format={"YYYY-MM-DD hh:mm A"}
													onChange={onChange}
													disabled={true}
													minDate={dayjs(record.purpose.when)}
												/>
												{errors?.when && (
													<p className="mt-1 text-sm text-red-500">
														{errors.when.message}
													</p>
												)}
											</div>
											<div className="flex w-full flex-col">
												<Select
													className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
													showSearch
													mode="multiple"
													allowClear
													placeholder="Where"
													disabled={true}
													defaultValue={record.purpose.where}
													onChange={(value: string[]) =>
														handleChange("where", value)
													}
													options={whereList}
												/>
												{errors?.where && (
													<p className="mt-1 text-sm text-red-500">
														{errors.where.message}
													</p>
												)}
											</div>
										</div>
										<div className="flex gap-[20px]">
											<div className="flex w-full flex-col">
												<Select
													className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
													showSearch
													mode="multiple"
													allowClear
													placeholder="Who"
													disabled={true}
													defaultValue={record.purpose.who}
													onChange={(value: string[]) =>
														handleChange("who", value)
													}
													options={whoList}
												/>
												{errors?.who && (
													<p className="mt-1 text-sm text-red-500">
														{errors.who.message}
													</p>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex w-full flex-col items-center gap-[30px]">
								<Avatar
									className="cursor-pointer"
									onClick={() => setIdentificationOpen(!identificationOpen)}
									size={width === 1210 ? 150 : 220}
									src={
										record.id_picture
											? record.id_picture.selfie
											: idPicture.selfie
									}
								/>
								<div
									className={`flex flex-col items-center ${
										!disabledInputs && "gap-[10px]"
									}`}
								>
										<Tag
											className="w-fit"
											color={
												record.visitor_type === VisitorType.WalkIn
													? "#E88B23"
													: "#0db284"
											}
											key={record.visitor_type}
										>
											{record.visitor_type.toUpperCase()}
										</Tag>
									{errors?.visitor_type && (
										<p className="mt-1 text-sm text-red-500">
											{errors.visitor_type.message}
										</p>
									)}
									{record.plate_num &&
										
											<span className="mt-2 rounded border border-black px-3 py-1 text-[20px] font-bold shadow-md">
												{record.plate_num}
											</span>
										}
									{errors?.plate_num && (
										<p className="mt-1 text-sm text-red-500">
											{errors.plate_num.message}
										</p>
									)}
									{record.visitor_type === VisitorType.PreRegistered &&
									(
										<>
											<span
												className={`${
													record.status === VisitorStatus.Approved
														? "text-primary-500"
														: record.status === VisitorStatus.InProgress
															? "text-neutral-500"
															: "text-error-500"
												} text-[30px] font-bold`}
												onClick={() =>
													setDisabledStatusInput(!disabledStatusInput)
												}
											>
												{record.status}
											</span>
										</>
									) }
								</div>
							</div>

						</div>
						{/* <div className="divider" /> */}
						<div className="flex justify-end gap-[15px]">
							{!disabledInputs ? (
								<>
									<Button
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-primary-500"
										htmlType="submit"
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
								{disabledInputs ? "Extend" : "Cancel"}
							</Button>
							<Button key="submit" type="primary" onClick={handleTimeOutOk}>
								Time-Out
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}
