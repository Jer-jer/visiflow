import React, { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

// Components
import { Form } from "antd";
import StepOneForm from "./form";

// Interfaces
import type { StepOneData } from "../../../utils/zodSchemas";
import { VisitorDataType } from "../../../utils/interfaces";
import { StepOneZod } from "../../../utils/zodSchemas";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Utils
import { formatDate } from "../../../utils";

// Styles
import "./styles.scss";

interface StepOneProps {
	visitorNo: number;
	visitors: VisitorDataType;
	setProgress: Dispatch<SetStateAction<number>>;
	setVisitorNo: Dispatch<SetStateAction<number>>;
	setVisitors: Dispatch<SetStateAction<VisitorDataType>>;
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

	console.log(visitors.expected_time_out)
	console.log(formatDate(visitors.expected_time_out))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<StepOneData>({
		resolver: zodResolver(StepOneZod),
		defaultValues: {
			visitorNo: visitorNo,
			checkInOut: [formatDate(visitors.expected_time_in), formatDate(visitors.expected_time_out)],
			what: visitors.purpose.what,
			when: visitors.purpose.when,
			where: visitors.purpose.where,
			who: visitors.purpose.who,
			termsConditions: visitors.termsConditions,
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
