import React, { useState } from "react";

// Components
import Stepper from "../../components/stepper";
import StepOne from "../../components/forms/step-one";
import StepTwo from "../../components/forms/step-two";
import StepThree from "../../components/forms/step-three";

// Interfaces
import { VisitorDataType } from "../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../utils/enums";

// Styles
import "./styles.scss";

export default function PreRegister() {
	const [progress, setProgress] = useState(1);
	const [visitorNo, setVisitorNo] = useState(1);
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
	});

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
						visitors={visitors}
						setVisitorNo={setVisitorNo}
						setVisitors={setVisitors}
					/>
				) : progress === 2 ? (
					<StepTwo
						setProgress={setProgress}
						visitorNo={visitorNo}
						visitors={visitors}
						setVisitors={setVisitors}
					/>
				) : (
					progress === 3 && (
						<StepThree
							visitorNo={visitorNo}
							setProgress={setProgress}
							visitors={visitors}
						/>
					)
				)}
				<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end"></div>
			</div>
		</div>
	);
}
