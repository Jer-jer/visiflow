import React, { useState } from "react";

// Interface
import type { SearchProps } from "antd/es/input/Search";
import { VisitorStatus, VisitorType } from "../../utils/enums";
import { VisitorDataType } from "../../utils/interfaces";

// Components
import { Input, Tooltip, Modal, Button } from "antd";
import Stepper from "../stepper";
import StepOne from "../forms/recurring-visitor/step-one";
import StepTwo from "../forms/recurring-visitor/step-two";
import StepThree from "../forms/recurring-visitor/step-three";
import VisitorFoundList from "../visitor-found-list";

// Lib
import AxiosInstance from "../../lib/axios";

// Assets
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";

// Styles
import "./styles.scss";

const { Search } = Input;

const errorModal = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
	});
};

function RecurringVisitor() {
	const [visitorFound, setVisitorFound] = useState(false);
	const [foundMultiple, setFoundMultiple] = useState(false);

	const [loading, setLoading] = useState(false);

	//Modal States
	const [foundRecurring, setFoundRecurring] = useState(false);

	const [progress, setProgress] = useState(1);
	const [visitorNo, setVisitorNo] = useState(0);
	const [visitors, setVisitors] = useState<VisitorDataType[]>([
		{
			visitor_no: 1,
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
			expected_time_in: new Date(),
			expected_time_out: new Date(),
			purpose: {
				what: [],
				when: new Date(),
				where: [],
				who: [],
			},
			termsConditions: false,
			plate_num: "",
			id_picture: {
				front: "",
				back: "",
				selfie: "",
			},
			status: VisitorStatus.InProgress,
			visitor_type: VisitorType.PreRegistered,
		},
	]);

	//? If form is error
	const [error, setError] = useState(false);

	const recurringOk = () => {
		setFoundRecurring(false);
		setFoundMultiple(false);
		setVisitorFound(true);
	};

	const recurringCancel = () => {
		setFoundRecurring(false);
		setFoundMultiple(false);
	};

	const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
		setLoading(true);
		if (value) {
			setError(false);
			await AxiosInstance.post("/visitor/find-recurring", {
				visitor: value,
			})
				.then((res) => {
					if (res.status === 200) {
						if (res.data.visitors) {
							if (res.data.visitors.length >= 1) {
								const respVisitors: VisitorDataType[] = res.data.visitors.map(
									(visitor: VisitorDataType, index: number) => ({
										key: visitor._id,
										visitor_no: index + 1,
										visitor_details: visitor.visitor_details,
										expected_time_in: new Date(),
										expected_time_out: new Date(),
										purpose: {
											what: [],
											when: new Date(),
											where: [],
											who: [],
										},
										plate_num: visitor.plate_num,
										id_picture: {
											front: visitor.id_picture.front,
											back: visitor.id_picture.back,
											selfie: visitor.id_picture.selfie,
										},
										termsConditions: false,
										status: VisitorStatus.InProgress,
										visitor_type: VisitorType.PreRegistered,
									}),
								);

								setVisitors(respVisitors);
								setFoundMultiple(true);
							} else throw new Error("Visitor not found");
						} else {
							setVisitors((prev) => {
								const updatedVisitor = prev.map((visitor, index) => ({
									...visitor,
									id: res.data.visitor_id,
									id_picture: res.data.id_picture,
									visitor_details: {
										...visitor.visitor_details,
										name: res.data.name,
									},
								}));
								return updatedVisitor;
							});

							setFoundRecurring(true);
						}
					}
					setLoading(false);
				})
				.catch(() => {
					errorModal("Visitor not found");
					setVisitorFound(false);
					setLoading(false);
				});
		} else {
			setError(true);
		}
	};

	return (
		<>
			<Modal
				title={
					<span className="text-[24px] font-bold text-primary-500">
						Visitor Found
					</span>
				}
				open={foundRecurring}
				onOk={recurringOk}
				onCancel={recurringCancel}
			>
				<div className="flex flex-col">
					<p className="text-[16px] font-semibold">{`${visitors[0].visitor_details.name.last_name}, ${visitors[0].visitor_details.name.first_name} ${visitors[0].visitor_details.name.middle_name ? visitors[0].visitor_details.name.middle_name : ""}`}</p>
					<p>Is this you?</p>
					<p className="mt-[20px] text-[10px]">
						If it's not you, please contact{" "}
						<span className="italic text-error">09123456789</span>
					</p>
				</div>
			</Modal>
			{!visitorFound ? (
				<div className="flex h-full w-full flex-col items-center justify-center gap-10">
					{loading ? (
						<LoadingOutlined className="text-[128px] text-primary-500" />
					) : (
						<>
							<div className="flex flex-col items-center gap-3">
								<Tooltip title={error ? "Must be filled" : ""}>
									<Search
										className="search-visitor"
										status={error ? "error" : ""}
										placeholder="Enter your lastname or email"
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
							{!foundRecurring && foundMultiple && (
								<VisitorFoundList
									visitors={visitors}
									setVisitorFound={setVisitorFound}
									setVisitors={setVisitors}
								/>
							)}
						</>
					)}
				</div>
			) : (
				<div className="flex w-full flex-col pb-[32px]">
					<Stepper progress={progress} setProgress={setProgress} />
					<div className="flex-start ml-[20px] mt-[25px] flex flex-col gap-[10px] md:ml-[30px] lg:ml-[182px]">
						<h1 className="font-700 header mb-[10px] text-[38px] text-[#1B3B22]">
							Pre-Registration Form (Recurring)
						</h1>
						{progress === 1 ? (
							<StepOne
								visitorNo={visitorNo}
								mainVisitor={visitors[0]}
								visitors={visitors}
								setProgress={setProgress}
								setVisitorNo={setVisitorNo}
								setVisitors={setVisitors}
							/>
						) : progress === 2 ? (
							<StepTwo
								setProgress={setProgress}
								visitorNo={visitorNo}
								visitors={visitors}
								mainVisitor={visitors[0]}
								setVisitors={setVisitors}
							/>
						) : (
							progress === 3 && (
								<StepThree
									visitorNo={visitorNo}
									setProgress={setProgress}
									mainVisitor={visitors[0]}
									visitors={visitors}
								/>
							)
						)}
						<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end"></div>
					</div>
				</div>
			)}
		</>
	);
}

export default RecurringVisitor;
