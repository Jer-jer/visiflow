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
import { useDispatch } from "react-redux";
import {
	WalkInFormZod,
	WalkInFormInterfaceZod,
} from "../../../utils/zodSchemas";
import type {
	UseFormRegister,
	UseFormSetValue,
	FieldErrors,
} from "react-hook-form";
import { VisitorDataType } from "../../../utils/interfaces";
import type { RangePickerProps } from "antd/es/date-picker";
import type { Dayjs } from "dayjs";
import { VisitorStatus, VisitorType } from "../../../utils/enums";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";
import { Form, Button, Input, Image, Select, DatePicker } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import Label from "../../../components/fields/input/label";

//Assets
import TheRock from "../../../assets/the_rock.jpg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

// Libraries
import AxiosInstance from "../../../lib/axios";

// Utils
import { formatDate } from "../../../utils";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

type WalkInFormTypeZod = z.infer<typeof WalkInFormZod>;

const whatOptions = [
	{ label: "Meeting", value: "Meeting" },
	{ label: "Interview", value: "Interview" },
	{ label: "School Activity", value: "School Activity" },
	{ label: "Intramurals", value: "Intramurals" },
	{ label: "Investigate", value: "Investigate" },
	{ label: "Relatives", value: "Relatives" },
	{ label: "Inquiries", value: "Inquiries" },
	{ label: "Others", value: "Others" },
];

const whoOptions = [
	{ label: "Janusz", value: "Janusz" },
	{ label: "Omamalin", value: "Omamalin" },
	{ label: "Todd", value: "Todd" },
	{ label: "Machacon", value: "Machacon" },
	{ label: "Neil", value: "Neil" },
	{ label: "Collado", value: "Collado" },
	{ label: "Allan", value: "Allan" },
	{ label: "Bargamento", value: "Bargamento" },
	{ label: "Atty. Flores", value: "Atty. Flores" },
];

const whereOptions = [
	{ label: "Guard House", value: "Guard House" },
	{ label: "HR", value: "HR" },
	{ label: "Lobby", value: "Lobby" },
	{ label: "Office 1", value: "Office 1" },
	{ label: "Office 2", value: "Office 2" },
	{ label: "Department 1", value: "Department 1" },
	{ label: "Department 2", value: "Department 2" },
];

export default function VisitorFormLayout() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<WalkInFormTypeZod>({
		resolver: zodResolver(WalkInFormZod),
	});

	const [visitors, setVisitors] = useState<VisitorDataType>({
		visitor_details: {
			name: {
				first_name: "",
				middle_name: "",
				last_name: "",
			},

			email: "",
			phone: "",
			address: {
				house: "",
				street: "",
				brgy: "",
				city: "",
				province: "",
				country: "",
			},
			time_in: "",
			time_out: "",
		},
		companions_details: [],
		expected_time_in: now(),
		expected_time_out: now(),
		purpose: {
			what: [],
			when: now(),
			where: [],
			who: [],
		},
		termsConditions: false,
		plate_num: null,
		id_picture: {
			front: "",
			back: "",
			selfie: "",
		},
		status: VisitorStatus.InProgress,
		visitor_type: VisitorType.PreRegistered,
	});

	const [status, setStatus] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

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

	const handlePurpose = (purpose: string, value: string | string[]) => {
		switch (purpose) {
			case "what":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						what: value as string[],
					},
				}));
				setValue("what", value as string[]);
				break;
			case "when":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						when: value as string,
					},
				}));
				setValue("when", value as string);
				break;
			case "where":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						where: value as string[],
					},
				}));
				setValue("where", value as string[]);
				break;
			case "who":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						who: value as string[],
					},
				}));
				setValue("who", value as string[]);
				break;
			default:
				console.error("Something went wrong");
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

	const saveAction = (zodData: WalkInFormInterfaceZod) => {
		AxiosInstance.post("/visitor/new", {
			first_name: zodData.first_name,
			middle_name: zodData.middle_name,
			last_name: zodData.last_name,
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
			//status: zodData.status,
			visitor_type: VisitorType.WalkIn,
		})
			.then((res) => {
				setStatus(true);
				setAlertMsg(res.data.message);
				setAlertOpen(!alertOpen);
			})
			.catch((err) => {
				setStatus(false);
				setAlertMsg(err || err.response.data.error || err.response.data.errors);
			});
	};

	const onSubmit = handleSubmit((data) => {
		saveAction(data);
	});

	return (
		<Form name="Visitor Details" onFinish={onSubmit} autoComplete="off">
			<div className="mb-[35px] ml-2 mt-3 flex">
				<div className="w-[380px] flex-auto md:w-[761px]">
					<OuterContainer header="VISITOR FORM">
						<InnerContainer>
							<div className="mb-[35px] ml-[20px] mr-[25px] flex h-fit flex-col items-center justify-center gap-[30px] lg:flex-row lg:gap-[25px]">
								<div className="flex flex-col items-center justify-center gap-[15px]">
									<div className="relative h-[245px] w-[330px] md:h-[300px] md:w-[360px]">
										<Image
											width="100%"
											height="100%"
											//src={RyanReynolds}
										/>
										<Button
											type="primary"
											className="absolute ml-[-240px] mt-[200px] h-[40px] w-[155px] !rounded-[10px] !bg-primary-500 text-xs shadow-lg md:ml-[-260px] md:mt-[240px] md:h-[46px] md:w-[175px] md:text-lg"
										>
											<b>SCAN ID</b>
										</Button>
									</div>
									<div className="relative h-[245px] w-[330px] md:h-[300px] md:w-[360px]">
										<Image
											width="100%"
											height="100%"
											//src={RyanReynolds}
										/>
										<Button
											type="primary"
											className="absolute ml-[-240px] mt-[200px] h-[40px] w-[155px] !rounded-[10px] !bg-primary-500 text-xs shadow-lg md:ml-[-260px] md:mt-[240px] md:h-[46px] md:w-[175px] md:text-sm"
										>
											<b>
												SCAN PLATE NUMBER <br /> (OPTIONAL)
											</b>
										</Button>
									</div>
								</div>

								<div className="flex flex-col items-center justify-center gap-[10px]">
									<div className="flex flex-col gap-7 lg:flex-row lg:gap-[40px]">
										<div className="flex flex-col items-center gap-7">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>First Name</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[30px]"
													size="large"
													{...register("first_name")}
													onChange={(e) =>
														updateInput(e.target.value, "first_name")
													}
												/>
												{errors?.first_name && (
													<p className="mt-1 text-sm text-red-500">
														{errors.first_name.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Last Name</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[30px]"
													size="large"
													{...register("last_name")}
													onChange={(e) =>
														updateInput(e.target.value, "last_name")
													}
												/>
												{errors?.last_name && (
													<p className="mt-1 text-sm text-red-500">
														{errors.last_name.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Middle Name</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[14px]"
													size="large"
													{...register("middle_name")}
													onChange={(e) =>
														updateInput(e.target.value, "middle_name")
													}
												/>
												{errors?.middle_name && (
													<p className="mt-1 text-sm text-red-500">
														{errors.middle_name.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Email</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[65px]"
													size="large"
													{...register("email")}
													onChange={(e) => updateInput(e.target.value, "email")}
												/>
												{errors?.email && (
													<p className="mt-1 text-sm text-red-500">
														{errors.email.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Plate Number (Optional)</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[16px] md:w-[230px]"
													size="large"
													{...register("plate_num")}
													onChange={(e) =>
														updateInput(e.target.value, "plate_num")
													}
												/>
												{errors?.plate_num && (
													<p className="mt-1 text-sm text-red-500">
														{errors.plate_num.message}
													</p>
												)}
											</div>
										</div>
										<div className="flex flex-col items-start gap-7">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Mobile #</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[20.5px]"
													size="large"
													{...register("phone")}
													onChange={(e) => updateInput(e.target.value, "phone")}
												/>
												{errors?.phone && (
													<p className="mt-1 text-sm text-red-500">
														{errors.phone.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>House #</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[24px]"
													size="large"
													{...register("house")}
													onChange={(e) => updateInput(e.target.value, "house")}
												/>
												{errors?.house && (
													<p className="mt-1 text-sm text-red-500">
														{errors.house.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Street</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[39.5px]"
													size="large"
													{...register("street")}
													onChange={(e) =>
														updateInput(e.target.value, "street")
													}
												/>
												{errors?.street && (
													<p className="mt-1 text-sm text-red-500">
														{errors.street.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Barangay</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[18.5px]"
													size="large"
													{...register("brgy")}
													onChange={(e) => updateInput(e.target.value, "brgy")}
												/>
												{errors?.brgy && (
													<p className="mt-1 text-sm text-red-500">
														{errors.brgy.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>City</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[52px]"
													size="large"
													{...register("city")}
													onChange={(e) => updateInput(e.target.value, "city")}
												/>
												{errors?.city && (
													<p className="mt-1 text-sm text-red-500">
														{errors.city.message}
													</p>
												)}
											</div>

											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Country</h1>
												<Input
													className="h-[35px] w-[300px] md:ml-[27px]"
													size="large"
													{...register("country")}
													onChange={(e) =>
														updateInput(e.target.value, "country")
													}
												/>
												{errors?.country && (
													<p className="mt-1 text-sm text-red-500">
														{errors.country.message}
													</p>
												)}
											</div>
										</div>
									</div>

									<div className="flex flex-col">
										<div className="flex gap-[41px]">
											<div className="flex flex-col gap-5 lg:gap-7">
												<span>Purpose</span>
												<div className="flex flex-col gap-5 lg:flex-row">
													<div>
														<Select
															className="w-[315px] md:w-[400px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="What"
															listHeight={150}
															options={whatOptions}
															{...register("what")}
															onChange={(value: string[]) =>
																handlePurpose("what", value)
															}
														></Select>
														{errors?.what && (
															<p className="mt-1 text-sm text-red-500">
																{errors.what.message}
															</p>
														)}
													</div>

													<div>
														<Select
															className="w-[315px] md:w-[400px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="Who"
															listHeight={150}
															options={whoOptions}
															{...register("who")}
															onChange={(value: string[]) =>
																handlePurpose("who", value)
															}
														></Select>
														{errors?.who && (
															<p className="mt-1 text-sm text-red-500">
																{errors.who.message}
															</p>
														)}
													</div>
												</div>
												<div className="flex flex-col gap-5 lg:flex-row">
													<div>
														<Select
															className="w-[315px] md:w-[400px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="Where"
															listHeight={150}
															options={whereOptions}
															{...register("where")}
															onChange={(value: string[]) =>
																handlePurpose("where", value)
															}
														></Select>
														{errors?.where && (
															<p className="mt-1 text-sm text-red-500">
																{errors.where.message}
															</p>
														)}
													</div>

													<div>
														<DateTimePicker
															globalStyling="w-[315px] md:w-[400px]"
															rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit]"
															size="large"
															visitorMngmnt
															defaultVal={{
																from: formatDate(new Date()),
																to: formatDate(new Date()),
															}}
															// defaultValue={dayjs(
															// 	visitors.purpose.when,
															// 	"YYYY-MM-DD hh:mm A",
															// )}
															onRangeChange={onRangeChange}
														/>
														{errors?.check_in_out && (
															<p className="mt-1 text-sm text-red-500">
																{errors.check_in_out.message}
															</p>
														)}
													</div>
												</div>
												<div className="flex justify-end gap-10">
													<Button
														type="primary"
														className="mt-5 w-[100px] !rounded-[10px] !bg-primary-500"
														htmlType="submit"
													>
														SUBMIT
													</Button>
													<Button
														type="primary"
														className="mt-5 w-[100px] !rounded-[10px] !bg-red-500"
														href="/"
													>
														CANCEL
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</InnerContainer>
					</OuterContainer>
				</div>
			</div>
		</Form>
	);
}
