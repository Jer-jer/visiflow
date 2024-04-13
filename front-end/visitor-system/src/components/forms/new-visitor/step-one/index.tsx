import React, { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

// Components
import { Form } from "antd";
import StepOneForm from "./form";

// Interfaces
import type { StepOneData } from "../../../../utils/zodSchemas";
import { VisitorDataType } from "../../../../utils/interfaces";
import { StepOneZod } from "../../../../utils/zodSchemas";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Utils
import { formatDateObjToString } from "../../../../utils";

// Styles
import "./styles.scss";

interface StepOneProps {
	visitorNo: number;
	mainVisitor: VisitorDataType;
	visitors: VisitorDataType[];
	setProgress: Dispatch<SetStateAction<number>>;
	setVisitorNo: Dispatch<SetStateAction<number>>;
	setVisitors: Dispatch<SetStateAction<VisitorDataType[]>>;
}

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

export default function StepOne({
	visitorNo,
	mainVisitor,
	visitors,
	setProgress,
	setVisitorNo,
	setVisitors,
}: StepOneProps) {
	const [isTCOpen, setIsTCOpen] = useState(false);

	// console.log(visitors.expected_time_out);
	// console.log(formatDateObjToString(visitors.expected_time_out));

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<StepOneData>({
		resolver: zodResolver(StepOneZod),
		defaultValues: {
			visitorNo: visitorNo,
			checkInOut: [mainVisitor.expected_time_in, mainVisitor.expected_time_out],
			what: mainVisitor.purpose.what,
			when: mainVisitor.purpose.when,
			where: mainVisitor.purpose.where,
			who: mainVisitor.purpose.who,
			termsConditions: mainVisitor.termsConditions,
		},
	});

	const showTC = () => {
		setIsTCOpen(true);
	};

	const handleTCOk = () => {
		setIsTCOpen(false);
	};

	const handleTCCancel = () => {
		setIsTCOpen(false);
	};

	const nextStep = () => {
		setProgress((prev) => prev + 1);
	};

	const onSubmit = handleSubmit((data) => {
		nextStep();
	});

	return (
		<Form name="Step One Form" onFinish={onSubmit} autoComplete="off">
			<StepOneForm
				visitorNo={visitorNo}
				visitors={visitors}
				mainVisitor={mainVisitor}
				isTCOpen={isTCOpen}
				errors={errors}
				register={register}
				setValue={setValue}
				showTC={showTC}
				handleTCOk={handleTCOk}
				handleTCCancel={handleTCCancel}
				setVisitorNo={setVisitorNo}
				setVisitors={setVisitors}
			/>
		</Form>
	);
}
