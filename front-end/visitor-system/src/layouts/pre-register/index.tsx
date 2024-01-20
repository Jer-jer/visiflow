import React, { useState } from "react";

// Components
import Stepper from "../../components/stepper";
import StepOne from "../../components/forms/step-one";
import StepTwo from "../../components/forms/step-two";
import StepThree from "../../components/forms/step-three";

// Interfaces
import { VisitorData } from "../../utils/interfaces";

// Styles
import "./styles.scss";

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

	// const finalDateTimeWSlash = finalDateTime.replace(/\\|\//g, "-");
	return finalDateTime;
};

export default function PreRegister() {
	const [progress, setProgress] = useState(1);
	const [visitorNo, setVisitorNo] = useState(1);
	const [visitors, setVisitors] = useState<VisitorData>({
		id: 1,
		poi: "johnDoe",
		timeIn: now(),
		timeOut: now(),
		purpose: "",
		termsConditions: false,
		data: [
			{
				firstName: "",
				middleName: "",
				lastName: "",
				email: "",
				mobile: "",
				house: "",
				street: "",
				barangay: "",
				city: "",
				province: "",
				country: "",
			},
		],
	});

	return (
		<div className="flex w-full flex-col pb-[32px]">
			<Stepper progress={progress} setProgress={setProgress} />
			<div className="flex-start ml-[20px] mt-[25px] flex flex-col gap-[10px] md:ml-[30px] lg:ml-[182px]">
				<h1 className="font-700 mb-[10px] text-[38px] text-[#1B3B22]">
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
						<StepThree setProgress={setProgress} visitors={visitors} />
					)
				)}
				<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end"></div>
			</div>
		</div>
	);
}
