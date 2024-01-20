import React, { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

// Components
import { Form } from "antd";
import StepOneForm from "./form";

// Interfaces
import type { StepOneData } from "../../../utils/zodSchemas";
import { VisitorData } from "../../../utils/interfaces";
import { StepOneZod } from "../../../utils/zodSchemas";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Styles
import "./styles.scss";

interface StepOneProps {
	visitorNo: number;
	visitors: VisitorData;
	setProgress: Dispatch<SetStateAction<number>>;
	setVisitorNo: Dispatch<SetStateAction<number>>;
	setVisitors: Dispatch<SetStateAction<VisitorData>>;
}

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

export default function StepOne({
	visitorNo,
	visitors,
	setProgress,
	setVisitorNo,
	setVisitors,
}: StepOneProps) {
	const [isTCOpen, setIsTCOpen] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<StepOneData>({
		resolver: zodResolver(StepOneZod),
		defaultValues: {
			visitorNo: visitorNo,
			poi: visitors.poi!,
			checkInOut: [visitors.timeIn!, visitors.timeOut!],
			purpose: visitors.purpose!,
			termsConditions: visitors.termsConditions!,
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
		console.log(data);
		nextStep();
	});

	return (
		<Form name="Step One Form" onFinish={onSubmit} autoComplete="off">
			<StepOneForm
				visitorNo={visitorNo}
				visitors={visitors}
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
