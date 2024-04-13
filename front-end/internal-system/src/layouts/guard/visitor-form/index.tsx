import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import queryString from "query-string";
import {
	WalkInFormZod,
	WalkInFormInterfaceZod,
} from "../../../utils/zodSchemas";
import { VisitorStatus, VisitorType } from "../../../utils/enums";
import type { DatePickerProps } from "antd";
import type { SearchProps } from "antd/es/input/Search";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import { Button, Input, Modal, Tooltip } from "antd";
import NewWalkIn from "../../../components/form/new";
import VisitorFoundList from "../../../components/table/visitor-found-list";
import RecurringVisitor from "../../../components/form/recurring";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";

// Libraries
import AxiosInstance from "../../../lib/axios";
import { GuardVisitorDataType } from "../../../utils/interfaces";

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

// eslint-disable-next-line no-restricted-globals
const parsed = queryString.parse(location.search);
export const qr_id = parsed.qr_id;

const { Search } = Input;

const errorModal = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
	});
};

export default function VisitorFormLayout() {
	const [status, setStatus] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [visitorsFound, setVisitorsFound] = useState(false);

	//? State used for fetching search visitors
	const [visitors, setVisitors] = useState<GuardVisitorDataType[]>([
		{
			_id: "",
			visitor_details: {
				_id: "",
				name: {
					first_name: "",
					middle_name: "",
					last_name: "",
				},
				address: {
					house: "",
					street: "",
					brgy: "",
					city: "",
					province: "",
					country: "",
				},
				email: "",
				phone: "",
			},
			plate_num: "",
			purpose: {
				what: [],
				when: new Date(),
				where: [],
				who: [],
			},
			expected_time_out: new Date(),
			status: VisitorStatus.Approved,
			visitor_type: VisitorType.WalkIn,
		},
	]);
	const [recurringVisitor, setRecurringVisitor] =
		useState<GuardVisitorDataType>();

	//Modal Status
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);
	const [foundRecurring, setFoundRecurring] = useState(false);

	//Loading
	const [loading, setLoading] = useState(false);

	const [isNew, setIsNew] = useState(false);
	const [isRecurring, setIsRecurring] = useState(false);

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

	const isNewOrRecurring = (newVisitor: boolean, recurringVisitor: boolean) => {
		setIsNew(newVisitor);
		setIsRecurring(recurringVisitor);
	};

	const handleSuccessOk = () => {
		setIsSuccessOpen(false);
		window.location.href = "/qr-scanner";
	};

	//? If form is error
	const [error, setError] = useState(false);

	const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
		setLoading(true);
		if (value) {
			setError(false);
			AxiosInstance.post("/visitor/find-recurring", {
				last_name: value[0].toUpperCase() + value.slice(1),
			})
				.then((res) => {
					if (res.status === 200) {
						const respVisitors: GuardVisitorDataType[] = res.data.visitors.map(
							(visitor: GuardVisitorDataType) => ({
								key: visitor._id,
								_id: visitor._id,
								visitor_details: visitor.visitor_details,
								plate_num: visitor.plate_num,
								purpose: {
									what: [],
									when: new Date(),
									where: [],
									who: [],
								},
								expected_time_out: new Date(),
								status: VisitorStatus.Approved,
								visitor_type: VisitorType.WalkIn,
							}),
						);

						setVisitors(respVisitors);
						setVisitorsFound(true);
					}
					setLoading(false);
				})
				.catch(() => {
					errorModal("Visitor not found");
					setVisitorsFound(false);
					setLoading(false);
				});
		} else {
			setLoading(false);
			setError(true);
		}
	};

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
		setLoading(true);
		AxiosInstance.post("/visitor/new?auth=true", {
			visitors: [
				{
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
							province: zodData.province,
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
			],
			// Add QR variable here
		})
			.then((res) => {
				AxiosInstance.post("/badge/newBadge", {
					visitor_id: res.data.visitors[0]._id,
					qr_id: parseInt(qr_id as string),
				})
					.then((res) => {
						// setStatus(true);
						// setAlertMsg("Successfully Timed-In");
						// setAlertOpen(true);
						setLoading(false);
						setIsSuccessOpen(true);
					})
					.catch((err) => {
						setLoading(false);
						setStatus(false);
						setAlertOpen(true);
						if (err && err.reponse) {
							const errorMessage =
								err.response.data.error ||
								err.response.data.errors ||
								"Something went wrong processing the badge";

							setAlertMsg(errorMessage);
						}
						const errorMessage = "Something went wrong processing the badge";

						setAlertMsg(errorMessage);
					});
			})
			.catch((err) => {
				setLoading(false);
				setStatus(false);
				setAlertOpen(!alertOpen);

				if (err && err.response) {
					const errorMessage =
						err.response.data.error ||
						err.response.data.errors ||
						"Something went wrong processing the visitor";
					setAlertMsg(errorMessage);
				}

				const errorMessage = "Something went wrong processing the visitor";
				setAlertMsg(errorMessage);
			});
	};

	const onSubmit = handleSubmit((data) => {
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
			<OuterContainer header="VISITOR FORM">
				<InnerContainer>
					{!isNew && !isRecurring && (
						<div className="mb-[60px] mt-[25px] flex h-full items-center justify-center gap-5">
							<Button
								type="primary"
								className="h-[inherit] w-[inherit] bg-primary-500 md:text-lg"
								onClick={(e) => isNewOrRecurring(true, false)}
							>
								New Visitor
							</Button>
							<Button
								type="primary"
								className="h-[inherit] w-[inherit] bg-primary-500 md:text-lg"
								onClick={(e) => isNewOrRecurring(false, true)}
							>
								Recurring Visitor
							</Button>
							<Button
								type="primary"
								className="h-[inherit] w-[inherit] !bg-red-500 md:text-lg"
								href="/"
							>
								CANCEL
							</Button>
						</div>
					)}

					{loading && (
						<div className="absolute left-[40%] top-[50%] z-[100] lg:left-[50%]">
							<LoadingOutlined className=" text-[128px] text-primary-500" />
						</div>
					)}
					{isNew && (
						<NewWalkIn
							isSuccessOpen={isSuccessOpen}
							alertOpen={alertOpen}
							status={status}
							alertMsg={alertMsg}
							errors={errors}
							whatOptions={whatOptions}
							whoOptions={whoOptions}
							whereOptions={whereOptions}
							register={register}
							setAlertOpen={setAlertOpen}
							onSubmit={onSubmit}
							handleSuccessOk={handleSuccessOk}
							updateInput={updateInput}
							handlePurpose={handlePurpose}
							onChange={onChange}
						/>
					)}
					{isRecurring && (
						<>
							{!foundRecurring ? (
								<>
									<div className="flex h-full w-full items-center justify-center">
										{!loading && (
											<div className="flex flex-col items-center gap-3">
												<Tooltip title={error ? "Must be filled" : ""}>
													<Search
														className="search-visitor"
														status={error ? "error" : ""}
														placeholder="Enter your last name"
														allowClear
														onSearch={onSearch}
														style={{ width: 300 }}
													/>
												</Tooltip>
												<Button
													type="link"
													className="flex items-center justify-center text-primary-500 hover:!text-primary-300"
													onClick={() => window.location.reload()}
												>
													<LeftOutlined />
													Go Back
												</Button>
											</div>
										)}
									</div>
									{visitorsFound && (
										<VisitorFoundList
											visitors={visitors}
											setFoundRecurring={setFoundRecurring}
											setRecurringVisitor={setRecurringVisitor}
										/>
									)}
								</>
							) : (
								<RecurringVisitor
									visitor={recurringVisitor!}
									isSuccessOpen={isSuccessOpen}
									alertOpen={alertOpen}
									status={status}
									alertMsg={alertMsg}
									whatOptions={whatOptions}
									whoOptions={whoOptions}
									whereOptions={whereOptions}
									qr_id={parseInt(qr_id as string)}
									setAlertOpen={setAlertOpen}
									handleSuccessOk={handleSuccessOk}
									setLoading={setLoading}
									setIsSuccessOpen={setIsSuccessOpen}
									setStatus={setStatus}
									setAlertMsg={setAlertMsg}
								/>
							)}
						</>
					)}
				</InnerContainer>
			</OuterContainer>
		);
	}
}
