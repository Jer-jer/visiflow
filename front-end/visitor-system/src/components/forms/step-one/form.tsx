import React, { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

// Components
import {
	Input,
	Button,
	InputNumber,
	Select,
	Checkbox,
	Modal,
	Form,
	DatePicker,
} from "antd";

// Interfaces
import { VisitorData } from "../../../utils/interfaces";
import type {
	UseFormRegister,
	UseFormSetValue,
	FieldErrors,
} from "react-hook-form";
import type { RangePickerProps } from "antd/es/date-picker";
import { StepOneData } from "../../../utils/zodSchemas";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface FormProps {
	visitorNo: number;
	visitors: VisitorData;
	isTCOpen: boolean;
	errors: FieldErrors<StepOneData>;
	register: UseFormRegister<StepOneData>;
	setValue: UseFormSetValue<StepOneData>;

	showTC: () => void;
	handleTCOk: () => void;
	handleTCCancel: () => void;

	setVisitorNo: Dispatch<SetStateAction<number>>;
	setVisitors: Dispatch<SetStateAction<VisitorData>>;
}

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const { TextArea } = Input;

function StepOneForm({
	visitorNo,
	visitors,
	isTCOpen,
	errors,
	register,
	setValue,
	showTC,
	handleTCOk,
	handleTCCancel,
	setVisitorNo,
	setVisitors,
}: FormProps) {
	const { RangePicker } = DatePicker;
	const timeFormat = "hh:mm A";

	const addVisitor = (value: any) => {
		setVisitorNo(value);
		setValue("visitorNo", visitorNo);
		if (value > visitors.data.length) {
			setVisitors((prevVisitors) => ({
				...prevVisitors,
				data: [
					...prevVisitors.data,
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
			}));
		} else if (value < visitors.data.length) {
			const indexToRemove = visitors.data.length - 1;
			setVisitors((prevVisitors) => ({
				...prevVisitors,
				data: prevVisitors.data.filter((_, index) => index !== indexToRemove),
			}));
		}
	};

	const handleChangePoi = (value: string) => {
		setVisitors({ ...visitors, poi: value });

		setValue("poi", visitors.poi!);
	};

	const onChangeDate = (
		value: RangePickerProps["value"],
		dateString: [string, string],
	) => {
		setVisitors({ ...visitors, timeIn: dateString[0], timeOut: dateString[1] });
		setValue("checkInOut", dateString);
	};

	const handlePurpose = (value: string) => {
		setVisitors({ ...visitors, purpose: value });
		setValue("purpose", value);
	};

	const onChange = (e: CheckboxChangeEvent) => {
		setVisitors({ ...visitors, termsConditions: e.target.checked });

		setValue("termsConditions", e.target.checked);
	};

	return (
		<>
			<Form.Item>
				<div className="mb-[5px] flex items-center gap-8 lg:w-[20%]">
					<span className="text-[16px] font-[400] text-[#0000004d]">
						No. of Visitors
					</span>

					<InputNumber
						className="rounded-[5px] border-none bg-[#DFEAEF] focus:border-primary-500 focus:outline-0 focus:!ring-transparent"
						{...register("visitorNo", { valueAsNumber: true })}
						style={{ width: 80, height: 35 }}
						min={1}
						defaultValue={visitorNo}
						onChange={addVisitor}
					/>
				</div>
				{errors?.visitorNo && (
					<p className="mt-1 text-sm text-red-500">
						{errors.visitorNo.message}
					</p>
				)}
			</Form.Item>
			<Form.Item>
				<div
					className={`mb-[5px] flex ${
						errors?.poi ? "items-start" : "items-center"
					}  gap-8 lg:w-[30%]`}
				>
					<span className="text-[16px] font-[400] text-[#0000004d]">
						Person of Interest
					</span>
					<div className="flex flex-col">
						<Select
							className="border-none"
							{...register("poi")}
							defaultValue={visitors.poi}
							style={{ width: 180 }}
							onChange={handleChangePoi}
							options={[
								{ value: "johnDoe", label: "Dr. John Doe" },
								{ value: "lucyGrimm", label: "Lucy Grimm" },
							]}
						/>
						{errors?.poi && (
							<p className="mt-1 text-sm text-red-500">{errors.poi.message}</p>
						)}
					</div>
				</div>
			</Form.Item>

			<Form.Item>
				<div
					className={`mb-[10px] flex flex-col gap-[10px] md:mb-[5px] md:flex-row md:items-center md:gap-8 ${
						errors?.checkInOut ? "items-start" : "items-center"
					}`}
				>
					<span className="text-[16px] font-[400] text-[#0000004d]">
						Check in and Check out
					</span>

					<div className="flex flex-col">
						<RangePicker
							className="vm-placeholder w-[86%] !border-[#d9d9d9] hover:!border-primary-500 focus:!border-primary-500 md:w-auto"
							size="middle"
							defaultValue={[
								dayjs(visitors.timeIn, `YYYY-MM-DD ${timeFormat}`),
								dayjs(visitors.timeOut, `YYYY-MM-DD ${timeFormat}`),
							]}
							onChange={onChangeDate}
							placeholder={["From", "To"]}
							changeOnBlur={false}
							format={`YYYY-MM-DD ${timeFormat}`}
							showTime={{ format: timeFormat }}
							style={{
								borderColor: "#0db284",
							}}
						/>
						{errors?.checkInOut && (
							<p className="mt-1 text-sm text-red-500">
								{errors.checkInOut.message}
							</p>
						)}
					</div>
				</div>
			</Form.Item>

			<Form.Item>
				<div className="mb-[27px] flex w-[50%] flex-col gap-[8px]">
					<span className="text-[16px] font-[400] text-[#0000004d]">
						Purpose of Visit
					</span>

					<div>
						<div className="flex flex-wrap gap-[15px]">
							<TextArea
								{...register("purpose")}
								value={visitors.purpose}
								onChange={(event: any) => handlePurpose(event.target.value)}
								rows={4}
							/>
						</div>
						{errors?.purpose && (
							<p className="mt-1 text-sm text-red-500">
								{errors.purpose.message}
							</p>
						)}
					</div>
				</div>
			</Form.Item>

			<div className="mb-[5px] flex flex-col md:w-[44%] lg:w-[30%]">
				<div className="flex items-center gap-[13px] ">
					<Form.Item className="m-0" rules={[{ required: true }]}>
						<Checkbox
							{...register("termsConditions")}
							checked={visitors.termsConditions!}
							onChange={onChange}
						></Checkbox>
					</Form.Item>

					<span className="text-[16px] font-[400] text-[#000000]">
						I have agreed to the{" "}
						<Button
							type="link"
							className="p-0 text-[16px] text-warning hover:!text-warning"
							onClick={showTC}
						>
							terms and conditions
						</Button>
						<Modal
							title={
								<span className="flex justify-center text-[25px] font-[700] text-[#0C0D0D]">
									TERMS AND CONDITIONS
								</span>
							}
							maskClosable
							footer={false}
							open={isTCOpen}
							onOk={handleTCOk}
							onCancel={handleTCCancel}
						>
							<span className="text-justify font-[400] text-black">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
								vulputate, nibh ut pellentesque pharetra, ligula lectus gravida
								ipsum, a bibendum quam lacus sit amet eros. Etiam nec elementum
								nisl. Etiam mattis turpis. Sed interdum eleifend justo, eu
								eleifend . em, non molestie dui. Nullam blandit Nam tincidunt
								lacinia metus in suscipit. Nullam sed tempus urna. Maecenas nec
								erat magna. Maecenas ac tortor bibendum metus condimentum mollis
								at eu urna. Aliquam vitae malesuada enim. Donec scelerisque
								egestas massa, ut vulputate tortor placerat sit amet. Integer
								facilisis, nisl quis tincidunt rhoncus, orci massa pellentesque
								erat, a porta nisi nisi sed nisl. In eu imperdiet ipsum.
								Phasellus tempus, arcu et imperdiet ornare, tellus diam
								fermentum risus, ut luctus velit eros ut lacus. Nulla posuere
								tempus auctor. Nullam dignissim, mauris eget suscipit lobortis,
								elit lectus blandit elit, id consectetur purus nunc in risus.
								Nullam venenatis sem vel odio lobortis, ut eleifend orci
								faucibus. Aliquam quis volutpat sem. Quisque dignissim eget ante
								eu mollis. amet. Integer facilisis, nisl quis tincidunt rhoncus,
								orci massa pellentesque erat, a porta nisi nisi sed nisl. In eu
								imperdiet ipsum. Phasellus tempus, arcu et imperdiet ornare,
								tellus diam fermentum risus, ut luctus velit eros ut lacus.
								Nulla posuere tempus auctor. Nullam dignissim, mauris eget
								suscipit lobortis, elit lectus blandit elit, id consectetur
								purus nunc in risus. Nullam venenatis sem vel odio lobortis, ut
								eleifend orci faucibus. Aliquam quis volutpat sem. Quisque
								dignissim eget ante eu mollis.
							</span>
						</Modal>
					</span>
				</div>
				{errors?.termsConditions && (
					<p className="mt-1 text-sm text-red-500">
						{errors.termsConditions.message}
					</p>
				)}
			</div>

			<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end">
				<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
					<Button
						className="w-[inherit] bg-primary-500"
						type="primary"
						htmlType="submit"
					>
						Next
					</Button>
				</div>
			</div>
		</>
	);
}

export default StepOneForm;
