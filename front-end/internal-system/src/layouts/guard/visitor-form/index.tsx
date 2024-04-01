import React, {
	useState,
	useContext,
	createContext,
	MutableRefObject,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { useParams } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import queryString from "query-string";
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
import {
	GuardVisitorDataType,
	VisitorDataType,
} from "../../../utils/interfaces";
import type { RangePickerProps } from "antd/es/date-picker";
import type { Dayjs } from "dayjs";
import { VisitorStatus, VisitorType } from "../../../utils/enums";
import type { DatePickerProps } from "antd";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";
import { Form, Button, Input, Image, Select, DatePicker } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import Label from "../../../components/fields/input/label";
import Alert from "../../../components/alert";

//Assets
import TheRock from "../../../assets/the_rock.jpg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

// Libraries
import AxiosInstance from "../../../lib/axios";

// Utils
import { formatDateObjToString } from "../../../utils";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface VisitorDeetsProps {
	record: VisitorDataType;
}

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

const now = () => {
	const now = new Date();
	const formattedDateTime = new Intl.DateTimeFormat("en-CA", {
		hour12: true,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(now);
	const removeColumn = formattedDateTime.replace(/,\s*/, " ");
	const timePart = removeColumn.split(" ");
	const amPm = timePart[2];

	let finalDateTime = removeColumn;

	if (amPm === "a.m.") finalDateTime = finalDateTime.replace("a.m.", "AM");
	else if (amPm === "p.m.") finalDateTime = finalDateTime.replace("p.m.", "PM");

	return finalDateTime;
};

// eslint-disable-next-line no-restricted-globals
const parsed = queryString.parse(location.search);
const qr_id = parsed.qr_id;
let qrPath = "";
if (qr_id != undefined) {
	const pathname = window.location.pathname;
	const parts = pathname.split("/");
	const qrPart = parts[parts.length - 1];
	qrPath = qrPart;
	console.log(qrPath);
}
export { qrPath };

export default function VisitorFormLayout() {
	const [status, setStatus] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [visitor_id, setVisitorId] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<WalkInFormTypeZod>({
		defaultValues: {
			expected_time_out: new Date(),
		},
		resolver: zodResolver(WalkInFormZod),
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
			case "expected_time_out":
				setValue(property, value as Date);
				break;
			case "plate_num":
				setValue(property, value as string);
				break;
			case "what":
				setValue(property, value as string[]);
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
				setValue("what", value as string[]);
				break;
			case "where":
				setValue("where", value as string[]);
				break;
			case "who":
				setValue("who", value as string[]);
				break;
			default:
				console.error("Something went wrong");
		}
	};

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		updateInput(new Date(dateString as string), "expected_time_out");
	};

	const saveAction = (zodData: WalkInFormInterfaceZod) => {
		AxiosInstance.post("/visitor/new", {
			visitor_data: {
				visitor_details: {
					name: {
						first_name: zodData.first_name,
						middle_name: zodData.middle_name,
						last_name: zodData.last_name,
					},
					address: {
						house: zodData.house,
						street: zodData.street,
						brgy: zodData.brgy,
						city: zodData.city,
						// province: zodData.province, //INPUT PROVINCEEE
						country: zodData.country,
					},
					email: zodData.email,
					phone: zodData.phone,
				},
				expected_time_in: new Date(),
				expected_time_out: new Date(zodData.expected_time_out),
				plate_num: zodData.plate_num,
				purpose: {
					what: zodData.what,
					when: new Date(),
					where: zodData.where,
					who: zodData.who,
				},
				id_picture: {
					front: "",
					back: "",
					selfie: "",
				},
				status: VisitorStatus.Approved,
				visitor_type: VisitorType.WalkIn,
			},
			// Add QR variable here
		})
			.then((res) => {
				setVisitorId(res.data.visitor._id);

				AxiosInstance.post("/badge/newBadge", {
					visitor_id: res.data.visitor._id,
					qr_id: parseInt(qr_id as string),
				})
					.then((res) => {
						setStatus(true);
						setAlertMsg("Successfully Timed-In");
						setAlertOpen(true);
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
			})
			.catch((err) => {
				// setStatus(false);
				// setAlertMsg(err || err.response.data.error || err.response.data.errors);
				// setAlertOpen(!alertOpen);

				console.log(err || err.response.data.error || err.response.data.errors);
			});
	};

	const onSubmit = handleSubmit((data) => {
		// console.log("HAAAAAAAKKKKKKDOGGG", data);
		saveAction(data);
	});

	if (qr_id === undefined) {
		return (
			<div className="mb-[35px] ml-2 mt-3 flex">
				<div className="w-[380px] flex-auto md:w-[761px]">
					<OuterContainer header="VISITOR FORM">
						<InnerContainer>
							<div className="mb-[60px] mt-[25px] flex items-center justify-center text-lg text-green-500">
								<b>PLEASE SCAN A QR CODE</b>
							</div>
						</InnerContainer>
					</OuterContainer>
				</div>
			</div>
		);
	} else {
		return (
			<div className="visitor-form">
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
						statusTextHeaderColor={
							status ? "text-primary-500" : "text-error-500"
						}
						descStyling="text-sm text-gray-600"
						header="Information Box"
						desc={alertMsg}
						open={alertOpen}
						setOpen={setAlertOpen}
					/>
				</div>

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

										<div className="flex flex-col items-center justify-center gap-[20px]">
											<div className="flex flex-col gap-7 lg:flex-row lg:gap-[40px]">
												<div className="flex flex-col items-center gap-7">
													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>First Name</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[30px]"
																size="large"
																{...register("first_name")}
																onChange={(e) =>
																	updateInput(e.target.value, "first_name")
																}
															/>
														</div>
														{errors?.first_name && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.first_name.message}
															</p>
														)}
													</div>

													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Last Name</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[31px]"
																size="large"
																{...register("last_name")}
																onChange={(e) =>
																	updateInput(e.target.value, "last_name")
																}
															/>
														</div>
														{errors?.last_name && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.last_name.message}
															</p>
														)}
													</div>

													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Middle Name</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[13px]"
																size="large"
																{...register("middle_name")}
																onChange={(e) =>
																	updateInput(e.target.value, "middle_name")
																}
															/>
														</div>
														{errors?.middle_name && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.middle_name.message}
															</p>
														)}
													</div>

													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Email</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[64px]"
																size="large"
																{...register("email")}
																onChange={(e) =>
																	updateInput(e.target.value, "email")
																}
															/>
														</div>
														{errors?.email && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.email.message}
															</p>
														)}
													</div>

													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Mobile #</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[42px]"
																size="large"
																{...register("phone")}
																onChange={(e) =>
																	updateInput(e.target.value, "phone")
																}
															/>
														</div>
														{errors?.phone && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.phone.message}
															</p>
														)}
													</div>

													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Plate Number (Optional)</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[16px] md:w-[230px]"
																size="large"
																{...register("plate_num")}
																onChange={(e) =>
																	updateInput(e.target.value, "plate_num")
																}
															/>
														</div>
														{errors?.plate_num && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.plate_num.message}
															</p>
														)}
													</div>
												</div>

												<div className="flex flex-col items-start gap-7">
													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>House #</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[24px]"
																size="large"
																{...register("house")}
																onChange={(e) =>
																	updateInput(e.target.value, "house")
																}
															/>
														</div>
														{errors?.house && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.house.message}
															</p>
														)}
													</div>
													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Street</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[39.5px]"
																size="large"
																{...register("street")}
																onChange={(e) =>
																	updateInput(e.target.value, "street")
																}
															/>
														</div>
														{errors?.street && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.street.message}
															</p>
														)}
													</div>
													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Barangay</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[18.5px]"
																size="large"
																{...register("brgy")}
																onChange={(e) =>
																	updateInput(e.target.value, "brgy")
																}
															/>
														</div>
														{errors?.brgy && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.brgy.message}
															</p>
														)}
													</div>
													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>City</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[52px]"
																size="large"
																{...register("city")}
																onChange={(e) =>
																	updateInput(e.target.value, "city")
																}
															/>
														</div>
														{errors?.city && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.city.message}
															</p>
														)}
													</div>
													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Province</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[23px]"
																size="large"
																{...register("province")}
																onChange={(e) =>
																	updateInput(e.target.value, "province")
																}
															/>
														</div>
														{errors?.province && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.province.message}
															</p>
														)}
													</div>
													<div className="flex flex-col">
														<div className="flex flex-col md:flex-row md:items-center">
															<h1>Country</h1>
															<Input
																className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-green-200 focus:ring-green-600 md:ml-[27px]"
																size="large"
																{...register("country")}
																onChange={(e) =>
																	updateInput(e.target.value, "country")
																}
															/>
														</div>
														{errors?.country && (
															<p className="absolute mt-[36px] text-sm text-red-500">
																{errors.country.message}
															</p>
														)}
													</div>
												</div>
											</div>

											<div className="flex flex-col">
												<div className="flex gap-[41px]">
													<div className="flex flex-col gap-5 lg:gap-7">
														<span className="mb-[-15px]">Purpose</span>
														<div className="flex flex-col gap-5 lg:flex-row">
															<div className="flex flex-col">
																<div>
																	<Select
																		className="w-[315px] md:w-[397px]"
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
																</div>
																{errors?.what && (
																	<p className="absolute mt-[36px] text-sm text-red-500">
																		{errors.what.message}
																	</p>
																)}
															</div>

															<div className="flex flex-col">
																<div>
																	<Select
																		className="w-[315px] md:w-[397px]"
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
																</div>
																{errors?.who && (
																	<p className="absolute mt-[36px] text-sm text-red-500">
																		{errors.who.message}
																	</p>
																)}
															</div>
														</div>
														<div className="flex flex-col gap-5 lg:flex-row">
															<div className="flex flex-col">
																<div>
																	<Select
																		className="w-[315px] md:w-[397px]"
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
																</div>
																{errors?.where && (
																	<p className="absolute mt-[36px] text-sm text-red-500">
																		{errors.where.message}
																	</p>
																)}
															</div>

															<div className="flex flex-col">
																<div className="flex flex-col md:flex-row md:items-center">
																	<h1>Expected Time Out</h1>
																	<DatePicker
																		showTime
																		className="focus:!bg-[#e0ebf0]vm-placeholder ml-[20px] h-[35px] w-[180px] border-none !border-[#d9d9d9] bg-[#e0ebf0] focus-within:!bg-[#e0ebf0] hover:!border-primary-500 hover:!bg-[#e0ebf0] focus:!border-primary-500 md:w-[260px]"
																		defaultValue={dayjs(
																			dayjs(),
																			"YYYY-MM-DD hh:mm A",
																		)}
																		format="YYYY-MM-DD hh:mm A"
																		onChange={onChange}
																	/>
																</div>
																{errors?.expected_time_out && (
																	<p className="absolute mt-[36px] text-sm text-red-500">
																		{errors.expected_time_out.message}
																	</p>
																)}
															</div>
														</div>
														<div className="flex justify-end gap-10">
															<Button
																type="primary"
																className="mt-[10px] w-[100px] !rounded-[10px] !bg-primary-500"
																htmlType="submit"
															>
																SUBMIT
															</Button>
															<Button
																type="primary"
																className="mt-[10px] w-[100px] !rounded-[10px] !bg-red-500"
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
			</div>
		);
	}
}
