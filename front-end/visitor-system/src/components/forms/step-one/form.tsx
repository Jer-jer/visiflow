import React, { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

// Components
import {
	Button,
	InputNumber,
	Select,
	Checkbox,
	Modal,
	Form,
	DatePicker,
	Input,
	Tooltip,
} from "antd";

// Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
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
import type { DatePickerProps } from "antd";

// Utils
import { formatDateObjToString } from "../../../utils";

// Styles
import "./styles.scss";

interface FormProps {
	visitorNo: number;
	visitors: VisitorDataType;
	isTCOpen: boolean;
	errors: FieldErrors<StepOneData>;
	register: UseFormRegister<StepOneData>;
	setValue: UseFormSetValue<StepOneData>;

	showTC: () => void;
	handleTCOk: () => void;
	handleTCCancel: () => void;

	setVisitorNo: Dispatch<SetStateAction<number>>;
	setVisitors: Dispatch<SetStateAction<VisitorDataType>>;
}

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

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
		setValue("visitorNo", value);
		if (value > visitorNo) {
			setVisitors((prevVisitors) => ({
				...prevVisitors,
				companions_details: [
					...prevVisitors.companions_details!,
					{
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
				],
			}));
		} else if (value < visitorNo) {
			const indexToRemove = visitors.companions_details!.length - 1;
			setVisitors((prevVisitors) => ({
				...prevVisitors,
				companions_details: prevVisitors.companions_details!.filter(
					(_, index) => index !== indexToRemove,
				),
			}));
		}
	};

	const onChangeRange = (
		value: RangePickerProps["value"],
		dateString: [string, string],
	) => {
		setVisitors({
			...visitors,
			expected_time_in: new Date(dateString[0]),
			expected_time_out: new Date(dateString[1]),
		});
		setValue("checkInOut", [new Date(dateString[0]), new Date(dateString[1])]);
	};

	const onChange = (e: CheckboxChangeEvent) => {
		setVisitors({ ...visitors, termsConditions: e.target.checked });

		setValue("termsConditions", e.target.checked);
	};

	const handlePurpose = (
		purpose: string,
		value: string | string[] | Date[] | Date,
	) => {
		switch (purpose) {
			case "what":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						what: value as string[],
					},
				}));
				setValue("what", value as string[]);
				break;
			case "when":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						when: value as Date,
					},
				}));
				setValue("when", value as Date);
				break;
			case "where":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						where: value as string[],
					},
				}));
				setValue("where", value as string[]);
				break;
			case "who":
				setVisitors((prevVisitors) => ({
					...prevVisitors,
					purpose: {
						...prevVisitors.purpose,
						who: value as string[],
					},
				}));
				setValue("who", value as string[]);
				break;
			default:
				console.error("Something went wrong");
		}
	};

	const onChangeDate: DatePickerProps["onChange"] = (date, dateString) =>
		handlePurpose("when", new Date(dateString as string));

	return (
		<>
			<Form.Item>
				<div className="mb-[5px] flex items-center gap-8 lg:w-[20%]">
					<span className="text-[16px] font-[400] text-[#0000004d]">
						No. of Visitors
					</span>

					<InputNumber
						className="rounded-[5px] border-none bg-[#DFEAEF] focus-within:!bg-[#DFEAEF] hover:bg-[#DFEAEF] focus:border-primary-500 focus:!bg-[#DFEAEF] focus:outline-0 focus:!ring-transparent"
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
				<div className="mb-[5px] flex items-center gap-8 lg:w-[20%]">
					<span className="plate-num w-[24%] text-[16px] font-[400] text-[#0000004d] md:w-[14%] lg:w-[100%]">
						Plate Number
					</span>

					<Input
						className="w-[100px] rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent lg:w-full"
						{...register("plateNum")}
						value={visitors.plate_num === null ? "" : visitors.plate_num}
						onChange={(event: any) => {
							setVisitors((prevVisitors) => ({
								...prevVisitors,
								plate_num: event.target.value,
							}));
							setValue("plateNum", event.target.value);
						}}
					/>
				</div>
				{errors?.plateNum && (
					<p className="mt-1 text-sm text-red-500">{errors.plateNum.message}</p>
				)}
			</Form.Item>

			<Form.Item>
				<div
					className={`mb-[10px] flex flex-col items-start gap-[10px] md:mb-[5px] md:flex-row md:items-center md:gap-8 ${
						errors?.checkInOut && "items-start"
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
								dayjs(
									formatDateObjToString(visitors.expected_time_in),
									`YYYY-MM-DD ${timeFormat}`,
								),
								dayjs(
									formatDateObjToString(visitors.expected_time_out),
									`YYYY-MM-DD ${timeFormat}`,
								),
							]}
							minDate={dayjs(dayjs(), `YYYY-MM-DD ${timeFormat}`)}
							onChange={onChangeRange}
							placeholder={["From", "To"]}
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

			<div className="mb-[27px] flex w-[50%] flex-col gap-[8px]">
				<span className="text-[16px] font-[400] text-[#0000004d]">
					Purpose of Visit
				</span>
				<div className="flex flex-col gap-[15px] lg:flex-row">
					<div className="flex w-full flex-col">
						<Select
							className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
							style={{ width: "100%" }}
							showSearch
							mode="multiple"
							allowClear
							placeholder="What"
							listHeight={128}
							defaultValue={visitors.purpose.what}
							onChange={(value: string[]) => handlePurpose("what", value)}
							options={[
								{
									value: "meeting",
									label: "Meeting",
								},
								{
									value: "intramurals",
									label: "Intramurals",
								},
								{
									value: "conference",
									label: "Conference",
								},
							]}
						/>
						{errors?.what && (
							<p className="mt-1 text-sm text-red-500">{errors.what.message}</p>
						)}
					</div>

					<div className="flex w-full flex-col">
						<Select
							className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
							showSearch
							mode="multiple"
							allowClear
							placeholder="Where"
							defaultValue={visitors.purpose.where}
							onChange={(value: string[]) => handlePurpose("where", value)}
							options={[
								{
									value: "gym",
									label: "Gymnasium",
								},
								{
									value: "office_of_the_president",
									label: "Office of the President",
								},
								{
									value: "guard_house",
									label: "Guard House",
								},
							]}
						/>
						{errors?.where && (
							<p className="mt-1 text-sm text-red-500">
								{errors.where.message}
							</p>
						)}
					</div>

					<div className="flex w-full flex-col">
						<Tooltip title="When">
							<DatePicker
								showTime
								className="vm-placeholder hover:bg-[#DFEAEF]!border-[#d9d9d9] h-[52px] border-none bg-[#e0ebf0] hover:!border-primary-500 hover:bg-[#DFEAEF] focus:!border-primary-500"
								placeholder="When"
								defaultValue={dayjs(
									formatDateObjToString(visitors.purpose.when),
									`YYYY-MM-DD ${timeFormat}`,
								)}
								minDate={dayjs(dayjs(), `YYYY-MM-DD ${timeFormat}`)}
								onChange={onChangeDate}
								format={`YYYY-MM-DD ${timeFormat}`}
							/>
						</Tooltip>

						{errors?.when && (
							<p className="mt-1 text-sm text-red-500">{errors.when.message}</p>
						)}
					</div>

					<div className="flex w-full flex-col">
						<Select
							className="font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]"
							showSearch
							mode="multiple"
							allowClear
							placeholder="Who"
							defaultValue={visitors.purpose.who}
							onChange={(value: string[]) => handlePurpose("who", value)}
							options={[
								{
									value: "john_doe",
									label: "Dr. John Doe",
								},
								{
									value: "lucy_grimm",
									label: "Lucy Grimm",
								},
							]}
						/>
						{errors?.who && (
							<p className="mt-1 text-sm text-red-500">{errors.who.message}</p>
						)}
					</div>
				</div>
			</div>

			<div className="mb-[5px] flex flex-col md:w-[50%] lg:w-[30%]">
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
