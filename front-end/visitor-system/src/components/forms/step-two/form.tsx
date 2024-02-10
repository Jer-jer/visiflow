import React, { useEffect, Dispatch, SetStateAction } from "react";

// Components
import { Input, Divider, Form } from "antd";

// Interfaces
import {
	VisitorDataType,
	VisitorDetailsProps,
} from "../../../utils/interfaces";
import type { StepTwoData } from "../../../utils/zodSchemas";
import type {
	UseFormRegister,
	UseFormSetValue,
	FieldErrors,
} from "react-hook-form";

// Utils
import { mainOrCompanion } from "../../../utils";

// Styles
import "./form.scss";

interface FormProps {
	mainVisitor: VisitorDetailsProps;
	companions: VisitorDetailsProps[];
	increment: number;
	errors: FieldErrors<StepTwoData>;
	register: UseFormRegister<StepTwoData>;
	setValue: UseFormSetValue<StepTwoData>;
	setVisitors: Dispatch<SetStateAction<VisitorDataType>>;
}

export default function StepTwoForm({
	mainVisitor,
	companions,
	increment,
	errors,
	register,
	setValue,
	setVisitors,
}: FormProps) {
	useEffect(() => {
		if (increment === 0) {
			if (mainVisitor) {
				setValue("firstName", mainVisitor.name.first_name);
				setValue("middleName", mainVisitor.name.middle_name);
				setValue("lastName", mainVisitor.name.last_name);
				setValue("email", mainVisitor.email);
				setValue("mobile", mainVisitor.phone);
				setValue("house", mainVisitor.address.house);
				setValue("street", mainVisitor.address.street);
				setValue("brgy", mainVisitor.address.brgy);
				setValue("city", mainVisitor.address.city);
				setValue("province", mainVisitor.address.province);
				setValue("country", mainVisitor.address.country);
			}
		} else if (increment > 0) {
			if (companions[increment - 1]) {
				setValue("firstName", companions[increment - 1].name.first_name);
				setValue("middleName", companions[increment - 1].name.middle_name);
				setValue("lastName", companions[increment - 1].name.last_name);
				setValue("email", companions[increment - 1].email);
				setValue("mobile", companions[increment - 1].phone);
				setValue("house", companions[increment - 1].address.house);
				setValue("street", companions[increment - 1].address.street);
				setValue("brgy", companions[increment - 1].address.brgy);
				setValue("city", companions[increment - 1].address.city);
				setValue("province", companions[increment - 1].address.province);
				setValue("country", companions[increment - 1].address.country);
			}
		}
	}, [setValue, mainVisitor, increment, companions]);

	// const mainOrCompanion = () => {
	// 	return increment === 0 ? mainVisitor : companions[increment - 1];
	// };

	const updateData = (value: string, property: string) => {
		const updatedVisitors = mainOrCompanion(increment, mainVisitor, companions);
		let updatedCompanions = companions;

		switch (property) {
			case "firstName":
				setValue(property, value);
				updatedVisitors.name.first_name = value;
				break;
			case "middleName":
				setValue(property, value);
				updatedVisitors.name.middle_name = value;
				break;
			case "lastName":
				setValue(property, value);
				updatedVisitors.name.last_name = value;
				break;
			case "email":
				setValue(property, value);
				updatedVisitors.email = value;
				break;
			case "mobile":
				setValue(property, value);
				updatedVisitors.phone = value;
				break;
			case "house":
				setValue(property, value);
				updatedVisitors.address.house = value;
				break;
			case "street":
				setValue(property, value);
				updatedVisitors.address.street = value;
				break;
			case "brgy":
				setValue(property, value);
				updatedVisitors.address.brgy = value;
				break;
			case "city":
				setValue(property, value);
				updatedVisitors.address.city = value;
				break;
			case "province":
				setValue(property, value);
				updatedVisitors.address.province = value;
				break;
			case "country":
				setValue(property, value);
				updatedVisitors.address.country = value;
				break;
			default:
				console.error("Something went wrong");
		}

		if (increment === 0) {
			setVisitors((prevVisitors) => ({
				...prevVisitors,
				visitor_details: updatedVisitors,
			}));
		} else {
			updatedCompanions[increment - 1] = updatedVisitors;

			setVisitors((prevVisitors) => ({
				...prevVisitors,
				companions_details: updatedCompanions,
			}));
		}
	};

	return (
		<>
			<div className="flex flex-wrap gap-[21px]">
				<Form.Item>
					<div
						className={`flex ${
							errors?.firstName ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[130px] ${
								errors?.firstName && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							First Name
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("firstName")}
								// value={visitor.firstName}
								value={
									mainOrCompanion(increment, mainVisitor, companions).name
										.first_name
								}
								onChange={(event: any) =>
									updateData(event.target.value, "firstName")
								}
							/>
							{errors?.firstName && (
								<p className="mt-1 text-sm text-red-500">
									{errors.firstName?.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex ${
							errors?.middleName ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[150px] ${
								errors?.middleName && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Middle Name
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("middleName")}
								// value={visitor.middleName}
								value={
									mainOrCompanion(increment, mainVisitor, companions).name
										.middle_name
								}
								onChange={(event: any) =>
									updateData(event.target.value, "middleName")
								}
							/>
							{errors?.middleName && (
								<p className="mt-1 text-sm text-red-500">
									{errors.middleName.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex ${
							errors?.lastName ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[130px] ${
								errors?.lastName && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d] md:w-[150px] lg:w-[120px]`}
						>
							Last Name
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("lastName")}
								// value={visitor.lastName}
								value={
									mainOrCompanion(increment, mainVisitor, companions).name
										.last_name
								}
								onChange={(event: any) =>
									updateData(event.target.value, "lastName")
								}
							/>
							{errors?.lastName && (
								<p className="mt-1 text-sm text-red-500">
									{errors.lastName.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex w-[500px] ${
							errors?.email ? "items-start" : "items-center"
						} gap-[5%]`}
					>
						<span
							className={`w-[150px] ${
								errors?.email && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Email Address
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("email")}
								// value={visitor.email}
								value={
									mainOrCompanion(increment, mainVisitor, companions).email
								}
								onChange={(event: any) =>
									updateData(event.target.value, "email")
								}
							/>
							{errors?.email && (
								<p className="mt-1 text-sm text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex w-[500px] ${
							errors?.mobile ? "items-start" : "items-center"
						} gap-[5%]`}
					>
						<span
							className={`w-[180px] ${
								errors?.mobile && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Mobile Number
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("mobile")}
								// value={visitor.mobile}
								value={
									mainOrCompanion(increment, mainVisitor, companions).phone
								}
								onChange={(event: any) =>
									updateData(event.target.value, "mobile")
								}
							/>
							{errors?.mobile && (
								<p className="mt-1 text-sm text-red-500">
									{errors.mobile.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Divider className="border border-[#00000030]" /> {/* Divider */}
				<Form.Item>
					<div
						className={`flex ${
							errors?.house ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.house && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							House No.
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("house")}
								// value={visitor.house}
								value={
									mainOrCompanion(increment, mainVisitor, companions).address
										.house
								}
								onChange={(event: any) =>
									updateData(event.target.value, "house")
								}
							/>
							{errors?.house && (
								<p className="mt-1 text-sm text-red-500">
									{errors.house.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex ${
							errors?.street ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.street && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Street
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("street")}
								// value={visitor.street}
								value={
									mainOrCompanion(increment, mainVisitor, companions).address
										.street
								}
								onChange={(event: any) =>
									updateData(event.target.value, "street")
								}
							/>
							{errors?.street && (
								<p className="mt-1 text-sm text-red-500">
									{errors.street.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex ${
							errors?.brgy ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.brgy && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Barangay
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("brgy")}
								// value={visitor.barangay}
								value={
									mainOrCompanion(increment, mainVisitor, companions).address
										.brgy
								}
								onChange={(event: any) =>
									updateData(event.target.value, "brgy")
								}
							/>
							{errors?.brgy && (
								<p className="mt-1 text-sm text-red-500">
									{errors.brgy.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex ${
							errors?.city ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.city && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d] lg:w-[50px]`}
						>
							City
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("city")}
								// value={visitor.city}
								value={
									mainOrCompanion(increment, mainVisitor, companions).address
										.city
								}
								onChange={(event: any) =>
									updateData(event.target.value, "city")
								}
							/>
							{errors?.city && (
								<p className="mt-1 text-sm text-red-500">
									{errors.city.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex ${
							errors?.province ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.province && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Province
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("province")}
								// value={visitor.province}
								value={
									mainOrCompanion(increment, mainVisitor, companions).address
										.province
								}
								onChange={(event: any) =>
									updateData(event.target.value, "province")
								}
							/>
							{errors?.province && (
								<p className="mt-1 text-sm text-red-500">
									{errors.province.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex ${
							errors?.country ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.country && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Country
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("country")}
								// value={visitor.country}
								value={
									mainOrCompanion(increment, mainVisitor, companions).address
										.country
								}
								onChange={(event: any) =>
									updateData(event.target.value, "country")
								}
							/>
							{errors?.country && (
								<p className="mt-1 text-sm text-red-500">
									{errors.country.message}
								</p>
							)}
						</div>
					</div>
				</Form.Item>
			</div>
		</>
	);
}
