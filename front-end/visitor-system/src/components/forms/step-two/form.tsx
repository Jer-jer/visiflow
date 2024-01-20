import React, { useEffect, Dispatch, SetStateAction } from "react";

// Components
import { Input, Divider, Form } from "antd";

// Interfaces
import { VisitorInput, VisitorData } from "../../../utils/interfaces";
import type { StepTwoData } from "../../../utils/zodSchemas";
import type {
	UseFormRegister,
	UseFormSetValue,
	FieldErrors,
} from "react-hook-form";

// Styles
import "./form.scss";

interface FormProps {
	visitorId: number;
	visitors: VisitorData;
	visitorsData: VisitorInput[];
	visitor: VisitorInput;
	increment: number;
	errors: FieldErrors<StepTwoData>;
	register: UseFormRegister<StepTwoData>;
	setValue: UseFormSetValue<StepTwoData>;
	setVisitors: Dispatch<SetStateAction<VisitorData>>;
}

export default function StepTwoForm({
	visitorId,
	visitors,
	visitorsData,
	visitor,
	increment,
	errors,
	register,
	setValue,
	setVisitors,
}: FormProps) {
	useEffect(() => {
		if (visitor) {
			setValue("firstName", visitor.firstName);
			setValue("middleName", visitor.middleName);
			setValue("lastName", visitor.lastName);
			setValue("email", visitor.email);
			setValue("mobile", visitor.mobile);
			setValue("house", visitor.house);
			setValue("street", visitor.street);
			setValue("barangay", visitor.barangay);
			setValue("city", visitor.city);
			setValue("province", visitor.province);
			setValue("country", visitor.country);
		}
	}, [setValue, visitor]);

	const updateData = (value: string, property: string) => {
		const updatedVisitors = visitors.data;

		switch (property) {
			case "firstName":
				setValue(property, value);
				updatedVisitors[increment].firstName = value;
				break;
			case "middleName":
				setValue(property, value);
				updatedVisitors[increment].middleName = value;
				break;
			case "lastName":
				setValue(property, value);
				updatedVisitors[increment].lastName = value;
				break;
			case "email":
				setValue(property, value);
				updatedVisitors[increment].email = value;
				break;
			case "mobile":
				const reg = /^[0-9\-+\b]*$/;
				if (reg.test(value)) {
					setValue(property, value);
					updatedVisitors[increment].mobile = value;
				}

				break;
			case "house":
				setValue(property, value);
				updatedVisitors[increment].house = value;
				break;
			case "street":
				setValue(property, value);
				updatedVisitors[increment].street = value;
				break;
			case "barangay":
				setValue(property, value);
				updatedVisitors[increment].barangay = value;
				break;
			case "city":
				setValue(property, value);
				updatedVisitors[increment].city = value;
				break;
			case "province":
				setValue(property, value);
				updatedVisitors[increment].province = value;
				break;
			case "country":
				setValue(property, value);
				updatedVisitors[increment].country = value;
				break;
			default:
				console.error("Something went wrong");
		}

		setVisitors({ ...visitors, data: updatedVisitors });
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
								value={visitor.firstName}
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
								value={visitor.middleName}
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
								value={visitor.lastName}
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
								value={visitor.email}
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
								value={visitor.mobile}
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
								value={visitor.house}
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
								value={visitor.street}
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
							errors?.barangay ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.barangay && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Barangay
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("barangay")}
								value={visitor.barangay}
								onChange={(event: any) =>
									updateData(event.target.value, "barangay")
								}
							/>
							{errors?.barangay && (
								<p className="mt-1 text-sm text-red-500">
									{errors.barangay.message}
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
								value={visitor.city}
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
								value={visitor.province}
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
								value={visitor.country}
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
