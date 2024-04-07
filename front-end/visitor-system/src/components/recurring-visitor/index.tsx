import React, { useState } from "react";

// Interface
import type { SearchProps } from "antd/es/input/Search";
import { VisitorStatus, VisitorType } from "../../utils/enums";
import { VisitorDataType } from "../../utils/interfaces";

// Components
import { Input, Tooltip, Modal } from "antd";
import Stepper from "../stepper";
import StepOne from "../forms/recurring-visitor/step-one";
import StepTwo from "../forms/recurring-visitor/step-two";
import StepThree from "../forms/recurring-visitor/step-three";

// Lib
import AxiosInstance from "../../lib/axios";

// Assets
import { LoadingOutlined } from "@ant-design/icons";

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

	const [loading, setLoading] = useState(false);

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
			// companions_details: [],
			expected_time_in: new Date(),
			expected_time_out: new Date(),
			purpose: {
				what: [],
				when: new Date(),
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
		},
	]);

	//? If form is error
	const [error, setError] = useState(false);

	const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
		setLoading(true);
		if (value) {
			setError(false);
			AxiosInstance.post("/visitor/find-last-name", {
				last_name: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), //? Capitalize first letter of the last name,
			})
				.then((res) => {
					if (res.status === 200) {
						setVisitors((prev) => {
							const updatedVisitor = prev.map((visitor, index) => ({
								...visitor,
								id: res.data.visitor_id,
								id_picture: res.data.id_picture,
							}));
							return updatedVisitor;
						});
						setVisitorFound(true);
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
			{!visitorFound ? (
				<div className="flex h-full w-full items-center justify-center">
					{loading ? (
						<LoadingOutlined className="text-[128px] text-primary-500" />
					) : (
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
