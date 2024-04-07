import React, { useState } from "react";

// Interface
import { VisitorDataType } from "../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../utils/enums";

// Components
import Stepper from "../stepper";
import StepOne from "../forms/new-visitor/step-one";
import StepTwo from "../forms/new-visitor/step-two";
import StepThree from "../forms/new-visitor/step-three";

import "./styles.scss";

function NewVisitor() {
	const [progress, setProgress] = useState(1);
	const [visitorNo, setVisitorNo] = useState(1);
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

	return (
		<div className="flex w-full flex-col pb-[32px]">
			<Stepper progress={progress} setProgress={setProgress} />
			<div className="flex-start ml-[20px] mt-[25px] flex flex-col gap-[10px] md:ml-[30px] lg:ml-[182px]">
				<h1 className="font-700 header mb-[10px] text-[38px] text-[#1B3B22]">
					Pre-Registration Form
				</h1>
				{progress === 1 ? (
					<StepOne
						setProgress={setProgress}
						visitorNo={visitorNo}
						mainVisitor={visitors[0]}
						visitors={visitors}
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
	);
}

export default NewVisitor;
