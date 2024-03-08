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
} from "../../../../utils/zodSchemas";
import { VisitorDataType, IDPictureProps } from "../../../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../../../utils/enums";
import { WidthContext } from "../../../logged-in";
import type { RootState } from "../../../../store";
import type { Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";

// Utils
import { formatDate } from "../../../../utils";

//Layouts
import VisitorLogs from "../visitor-logs";
import VisitorCompanions from "../visitor-companions";
import NotifyPOI from "../notify-poi";
import Identification from "../identification";

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
import DateTimePicker from "../../../../components/datetime-picker";
import Label from "../../../../components/fields/input/label";
import Alert from "../../../../components/alert";

//Reducers
import { update, deleteVisitor } from "../../../../states/visitors";
import { updateVisitor, removeTab } from "../../../../states/visitors/tab";

//Assets
import { ExclamationCircleFilled } from "@ant-design/icons";

//Styles
import "./styles.scss";

// Libraries
import AxiosInstance from "../../../../lib/axios";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface VisitorDeetsProps {
	newTabIndex: MutableRefObject<number>;
	record: VisitorDataType;
	setActiveKey: Dispatch<SetStateAction<number>>;
}

type VisitorDetailTypeZod = z.infer<typeof VisitorDetailZod>;

const { confirm } = Modal;

export const VisitorRecordContext = createContext<VisitorDataType | undefined>(
	undefined,
);

export default function VisitorDetails({
	newTabIndex,
	record,
	setActiveKey,
}: VisitorDeetsProps) {
	//Alert State
	const [status, setStatus] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	//Modal States
	const [visitLogsOpen, setVisitLogsOpen] = useState(false);
	const [vistorCompanionsOpen, setVisitorCompanionsOpen] = useState(false);
	const [notifyOpen, setNotifyOpen] = useState(false);
	const [identificationOpen, setIdentificationOpen] = useState(false);

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const [idPicture, setIdPicture] = useState<IDPictureProps>({
		// TEMPORARY
		front:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
		back: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
		selfie:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
	});

	const width = useContext(WidthContext);

	// Store Related variables
	const tabs = useSelector((state: RootState) => state.visitorTabs);
	const dispatch = useDispatch();

	useEffect(() => {
		AxiosInstance.post("/visitor/retrieve-image", {
			_id: record._id,
		})
			.then((res) => {
				setIdPicture(res.data.id_picture);
			})
			.catch((err) => {
				setAlertOpen(!alertOpen);
				setAlertMsg(
					err?.response?.data?.error ||
						err?.response?.data?.errors ||
						"Something went wrong.",
				);
			});
	}, []);

	// Client-side Validation related data
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<VisitorDetailTypeZod>({
		resolver: zodResolver(VisitorDetailZod),
		defaultValues: {
			first_name: record.visitor_details.name.first_name,
			middle_name: record.visitor_details.name.middle_name,
			last_name: record.visitor_details.name.last_name,
			phone: record.visitor_details.phone,
			email: record.visitor_details.email,
			house: record.visitor_details.address.house,
			street: record.visitor_details.address.street,
			brgy: record.visitor_details.address.brgy,
			city: record.visitor_details.address.city,
			province: record.visitor_details.address.province,
			country: record.visitor_details.address.country,
			check_in_out: [record.expected_time_in, record.expected_time_out],
			plate_num: record.plate_num,
			status: record.status,
			visitor_type: record.visitor_type,
			what: record.purpose.what,
			when: record.purpose.when,
			where: record.purpose.where,
			who: record.purpose.who,
		},
	});

	const updateInput = (
		value: string | [string, string] | string[] | any,
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
			case "phone":
				setValue(property, value as string);
				break;
			case "email":
				setValue(property, value as string);
				break;
			case "house":
				setValue(property, value as string);
				break;
			case "street":
				setValue(property, value as string);
				break;
			case "brgy":
				setValue(property, value as string);
				break;
			case "city":
				setValue(property, value as string);
				break;
			case "province":
				setValue(property, value as string);
				break;
			case "country":
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
				setValue(property, value);
				break;
			case "what":
				setValue(property, value as string[]);
				break;
			case "when":
				setValue(property, value as string);
				break;
			case "where":
				setValue(property, value as string[]);
				break;
			case "who":
				setValue(property, value as string[]);
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

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {};

	const handleChange = (property: string, value: string | string[]) =>
		updateInput(value, property);

	const editOrCancel = () => {
		setDisabledInputs(!disabledInputs);
		clearErrors();
	};

	const saveAction = (zodData: VisitorDetailsInterfaceZod) => {
		AxiosInstance.put("/visitor/update", {
			_id: record._id,
			first_name: zodData.first_name,
			middle_name: zodData.middle_name,
			last_name: zodData.last_name,
			companion_details: record.companion_details,
			phone: zodData.phone,
			email: zodData.email,
			house_no: zodData.house,
			street: zodData.street,
			brgy: zodData.brgy,
			city: zodData.city,
			province: zodData.province,
			country: zodData.country,
			expected_time_in: zodData.check_in_out[0],
			expected_time_out: zodData.check_in_out[1],
			plate_num: zodData.plate_num,
			status: zodData.status,
			visitor_type: zodData.visitor_type,
		})
			.then((res) => {
				dispatch(update(res.data.visitor));

				setStatus(true);
				setAlertMsg("Successfully Updated Visitor");
				setAlertOpen(true);
				setDisabledInputs(!disabledInputs);

				dispatch(
					updateVisitor({
						tabIndex: newTabIndex.current,
						visitor: res.data.visitor,
					}),
				);
			})
			.catch((err) => {
				setStatus(false);
				setAlertOpen(true);
				setAlertMsg(
					err?.response?.data?.error ||
						err?.response?.data?.errors ||
						"Something went wrong.",
				);
			});
	};

	const onSubmit = handleSubmit((data) => {
		saveAction(data);
	});

	const closeTab = (_id: string | undefined) => {
		const newActiveKey = --newTabIndex.current;
		const newItems = [...tabs];
		const index = newItems.map((e) => e.visitorData._id).indexOf(_id!);
		if (index !== -1) {
			newItems.splice(index, 1);
			dispatch(removeTab(newItems));
		}
		setActiveKey(newActiveKey);
	};

	const showDeleteConfirm = (_id: string) => {
		confirm({
			title: "Are you sure you want to delete this visitor?",
			className: "confirm-buttons",
			icon: <ExclamationCircleFilled className="!text-error-500" />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				AxiosInstance.delete("/visitor/delete", {
					data: {
						_id,
					},
				})
					.then((res) => {
						dispatch(deleteVisitor(_id));
						closeTab(_id);
					})
					.catch((err) => {
						setAlertOpen(!alertOpen);
						setAlertMsg(
							err?.response?.data?.error ||
								err?.response?.data?.errors ||
								"Something went wrong.",
						);
					});
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<div className="visitor-details">
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

			<Form name="Visitor Details" onFinish={onSubmit} autoComplete="off">
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
												disabled={disabledInputs}
											/>
											{errors?.first_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.first_name.message}
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
												disabled={disabledInputs}
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
												disabled={disabledInputs}
											/>
											{errors?.last_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.last_name.message}
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
											Mobile Number
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.phone}
												{...register("phone")}
												onChange={(e) => updateInput(e.target.value, "phone")}
												disabled={disabledInputs}
											/>
											{errors?.phone && (
												<p className="mt-1 text-sm text-red-500">
													{errors.phone.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div
									className={`flex w-[782px] ${
										errors && "items-start"
									} justify-between`}
								>
									<Label
										spanStyling="text-black font-medium text-[16px]"
										labelStyling="w-[15%]"
									>
										Email Address
									</Label>
									<div className="flex flex-col">
										<Input
											className="vm-placeholder h-[38px] w-[640px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
											placeholder={record.visitor_details.email}
											{...register("email")}
											onChange={(e) => updateInput(e.target.value, "email")}
											disabled={disabledInputs}
										/>
										{errors?.email && (
											<p className="mt-1 text-sm text-red-500">
												{errors.email.message}
											</p>
										)}
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											House No.
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.address.house}
												{...register("house")}
												onChange={(e) => updateInput(e.target.value, "house")}
												disabled={disabledInputs}
											/>
											{errors?.house && (
												<p className="mt-1 text-sm text-red-500">
													{errors.house.message}
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
											City
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.address.city}
												{...register("city")}
												onChange={(e) => updateInput(e.target.value, "city")}
												disabled={disabledInputs}
											/>
											{errors?.city && (
												<p className="mt-1 text-sm text-red-500">
													{errors.city.message}
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
											Street
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.address.street}
												{...register("street")}
												onChange={(e) => updateInput(e.target.value, "street")}
												disabled={disabledInputs}
											/>
											{errors?.street && (
												<p className="mt-1 text-sm text-red-500">
													{errors.street.message}
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
											Province
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.address.province}
												{...register("province")}
												onChange={(e) =>
													updateInput(e.target.value, "province")
												}
												disabled={disabledInputs}
											/>
											{errors?.province && (
												<p className="mt-1 text-sm text-red-500">
													{errors.province.message}
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
											Barangay
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.address.brgy}
												{...register("brgy")}
												onChange={(e) => updateInput(e.target.value, "brgy")}
												disabled={disabledInputs}
											/>
											{errors?.brgy && (
												<p className="mt-1 text-sm text-red-500">
													{errors.brgy.message}
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
											Country
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.visitor_details.address.country}
												{...register("country")}
												onChange={(e) => updateInput(e.target.value, "country")}
												disabled={disabledInputs}
											/>
											{errors?.country && (
												<p className="mt-1 text-sm text-red-500">
													{errors.country.message}
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
												from: record.expected_time_in || formatDate(new Date()),
												to: record.expected_time_out || formatDate(new Date()),
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
													disabled={disabledInputs}
													listHeight={128}
													defaultValue={record.purpose.what}
													onChange={(value: string[]) =>
														handleChange("what", value)
													}
													options={[
														{
															value: "meeting",
															label: "Meeting",
														},
														{
															value: "intramurals",
															label: "Intramurals",
														},
														{
															value: "conference",
															label: "Conference",
														},
													]}
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
														record.purpose.when,
														"YYYY-MM-DD hh:mm A",
													)}
													onChange={onChange}
													disabled={disabledInputs}
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
													disabled={disabledInputs}
													defaultValue={record.purpose.where}
													onChange={(value: string[]) =>
														handleChange("where", value)
													}
													options={[
														{
															value: "gym",
															label: "Gymnasium",
														},
														{
															value: "office_of_the_president",
															label: "Office of the President",
														},
														{
															value: "guard_house",
															label: "Guard House",
														},
														{
															value: "conference_hall",
															label: "Conference Hall",
														},
														{
															value: "classroom",
															label: "Classroom",
														},
													]}
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
													disabled={disabledInputs}
													defaultValue={record.purpose.who}
													onChange={(value: string[]) =>
														handleChange("who", value)
													}
													options={[
														{
															value: "john_doe",
															label: "Dr. John Doe",
														},
														{
															value: "lucy_grimm",
															label: "Lucy Grimm",
														},
													]}
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
									//TEMPORARY
									src={
										idPicture
											? idPicture.selfie
											: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o"
									}
								/>
								<Identification
									open={identificationOpen}
									setOpen={setIdentificationOpen}
									image={idPicture}
								/>
								<div
									className={`flex flex-col items-center ${
										!disabledInputs && "gap-[10px]"
									}`}
								>
									{disabledInputs ? (
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
									) : (
										<Select
											className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
											{...register("visitor_type")}
											defaultValue={
												record.visitor_type === VisitorType.WalkIn
													? "Walk-In"
													: "Pre-Registered"
											}
											onChange={(value: string) =>
												handleChange("visitor_type", value)
											}
											options={[
												{ value: VisitorType.WalkIn, label: "Walk-In" },
												{
													value: VisitorType.PreRegistered,
													label: "Pre-Registered",
												},
											]}
										/>
									)}
									{errors?.visitor_type && (
										<p className="mt-1 text-sm text-red-500">
											{errors.visitor_type.message}
										</p>
									)}
									{record.plate_num &&
										(disabledInputs ? (
											<span className="mt-2 rounded border border-black px-3 py-1 text-[20px] font-bold shadow-md">
												{record.plate_num}
											</span>
										) : (
											<Input
												className="vm-placeholder h-[38px] w-fit rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record.plate_num}
												{...register("plate_num")}
												onChange={(e) =>
													updateInput(e.target.value, "plate_num")
												}
												disabled={disabledInputs}
											/>
										))}
									{errors?.plate_num && (
										<p className="mt-1 text-sm text-red-500">
											{errors.plate_num.message}
										</p>
									)}
									{disabledInputs ? (
										<span
											className={`${
												record.status === VisitorStatus.Approved
													? "text-primary-500"
													: record.status === VisitorStatus.InProgress
													? "text-neutral-500"
													: "text-error-500"
											} text-[30px] font-bold`}
										>
											{record?.status}
										</span>
									) : (
										<Select
											className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
											{...register("status")}
											defaultValue={
												record.status === VisitorStatus.Approved
													? "Approved"
													: record.status === VisitorStatus.InProgress
													? "In Progress"
													: "Declined"
											}
											onChange={(value: string) =>
												handleChange("status", value)
											}
											options={[
												{ value: VisitorStatus.Approved, label: "Approved" },
												{
													value: VisitorStatus.InProgress,
													label: "In Progress",
												},
												{ value: VisitorStatus.Declined, label: "Declined" },
											]}
										/>
									)}
									{errors?.status && (
										<p className="mt-1 text-sm text-red-500">
											{errors.status.message}
										</p>
									)}
								</div>
							</div>
						</div>
						{/* <div className="divider" /> */}
						<div className="flex justify-end gap-[15px]">
							{disabledInputs && (
								<>
									<Button
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-primary-500"
										onClick={() => setVisitLogsOpen(!visitLogsOpen)}
									>
										Visitor Logs
									</Button>
									<VisitorLogs
										open={visitLogsOpen}
										setOpen={setVisitLogsOpen}
										lastName={record.visitor_details.name.last_name}
										visitorId={record._id}
										purpose={record.purpose}
									/>
									{/* Optional only for visitors with companions */}
									{record.companion_details!.length > 0 && (
										<>
											<Button
												type="primary"
												size="large"
												className="search-button !rounded-[18px] !bg-primary-500"
												onClick={() =>
													setVisitorCompanionsOpen(!vistorCompanionsOpen)
												}
											>
												View Companions
											</Button>
											<VisitorRecordContext.Provider value={record}>
												<VisitorCompanions
													expectedIn={record.expected_time_in}
													expectedOut={record.expected_time_out}
													open={vistorCompanionsOpen}
													setOpen={setVisitorCompanionsOpen}
												/>
											</VisitorRecordContext.Provider>
										</>
									)}

									<Button
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-primary-500"
										onClick={() => setNotifyOpen(!notifyOpen)}
									>
										Notify Person of Interest
									</Button>
									<NotifyPOI
										emailInput={record.visitor_details.email}
										companionRecords={record.companion_details}
										open={notifyOpen}
										setOpen={setNotifyOpen}
									/>
								</>
							)}

							{!disabledInputs && (
								<>
									<Button
										onClick={() => showDeleteConfirm(record._id)}
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-error-500"
									>
										Delete
									</Button>
									<Button
										// onClick={saveAction}
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-primary-500"
										htmlType="submit"
									>
										Save
									</Button>
								</>
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
		</div>
	);
}
