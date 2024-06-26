import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";

// Components
import { Input, Divider, Form, Select, Tooltip, Button } from "antd";

// Interfaces
import { VisitorDataType } from "../../../../utils/interfaces";
import type { StepTwoData } from "../../../../utils/zodSchemas";
import {
	type UseFormRegister,
	type UseFormSetValue,
	type FieldErrors,
} from "react-hook-form";

// Assets
import { LoadingOutlined } from "@ant-design/icons";
import flags from "react-phone-number-input/flags";

// Styles
import "react-phone-number-input/style.css";
import "./form.scss";

interface AddressSelectProps {
	value: string;
	label: string;
}

interface FormProps {
	visitorDetails: VisitorDataType;
	increment: number;
	errors: FieldErrors<StepTwoData>;
	register: UseFormRegister<StepTwoData>;
	setValue: UseFormSetValue<StepTwoData>;
	setVisitors: Dispatch<SetStateAction<VisitorDataType[]>>;
}

export default function StepTwoForm({
	visitorDetails,
	increment,
	errors,
	register,
	setValue,
	setVisitors,
}: FormProps) {
	// Address Stuff
	const [loadCountries, setLoadCountries] = useState<boolean>(false);
	const [countries, setCountries] = useState<AddressSelectProps[]>();
	const [noCountries, setNoCountries] = useState<boolean>(false);
	const [loadStates, setLoadStates] = useState<boolean>(false);
	const [states, setStates] = useState<AddressSelectProps[]>([]);
	const [noStates, setNoStates] = useState<boolean>(false);
	const [loadCities, setLoadCities] = useState<boolean>(false);
	const [cities, setCities] = useState<AddressSelectProps[]>([]);
	const [noCities, setNoCities] = useState<boolean>(false);

	useEffect(() => {
		setLoadCountries(true);
		axios
			.get("https://countriesnow.space/api/v0.1/countries/states")
			.then((response) => {
				const data = response.data.data;
				if (data.length > 0) {
					setNoCountries(false);
					setCountries(
						data.map((c: any) => ({ value: c.name, label: c.name })),
					);
				} else setNoCountries(true);
				setLoadCountries(false);
			})
			.catch(() => {
				setNoCountries(true);
				setLoadCountries(false);
			});

		if (
			visitorDetails.visitor_details.address.province &&
			visitorDetails.visitor_details.address.city
		) {
			onChangeCountry(visitorDetails.visitor_details.address.country);
			onChangeState(visitorDetails.visitor_details.address.province);
		}
	}, []);

	useEffect(() => {
		setValue("firstName", visitorDetails.visitor_details.name.first_name);
		setValue("middleName", visitorDetails.visitor_details.name.middle_name);
		setValue("lastName", visitorDetails.visitor_details.name.last_name);
		setValue("email", visitorDetails.visitor_details.email);
		setValue("mobile", visitorDetails.visitor_details.phone);
		setValue("house", visitorDetails.visitor_details.address.house);
		setValue("street", visitorDetails.visitor_details.address.street);
		setValue("brgy", visitorDetails.visitor_details.address.brgy);
		setValue("city", visitorDetails.visitor_details.address.city);
		setValue("province", visitorDetails.visitor_details.address.province);
		setValue("country", visitorDetails.visitor_details.address.country);
	}, [visitorDetails]);

	const updateData = (value: string, property: string) => {
		/*
		 * Deep copy the visitorDetails object
		 * To prevent other tabs utilizing the same object to be updated
		 */
		let updatedVisitors = JSON.parse(JSON.stringify(visitorDetails));

		switch (property) {
			case "firstName":
				setValue(property, value);
				updatedVisitors.visitor_details.name.first_name = value;
				break;
			case "middleName":
				setValue(property, value);
				updatedVisitors.visitor_details.name.middle_name = value;
				break;
			case "lastName":
				setValue(property, value);
				updatedVisitors.visitor_details.name.last_name = value;
				break;
			case "email":
				setValue(property, value);
				updatedVisitors.visitor_details.email = value;
				break;
			case "mobile":
				setValue(property, value);
				updatedVisitors.visitor_details.phone = value;
				break;
			case "house":
				setValue(property, value);
				updatedVisitors.visitor_details.address.house = value;
				break;
			case "street":
				setValue(property, value);
				updatedVisitors.visitor_details.address.street = value;
				break;
			case "brgy":
				setValue(property, value);
				updatedVisitors.visitor_details.address.brgy = value;
				break;
			case "city":
				setValue(property, value);
				updatedVisitors.visitor_details.address.city = value;
				break;
			case "province":
				setValue(property, value);
				updatedVisitors.visitor_details.address.province = value;
				break;
			case "country":
				setValue(property, value);
				updatedVisitors.visitor_details.address.country = value;
				break;
			default:
				console.error("Something went wrong");
		}

		setVisitors((preVisitors) => {
			return preVisitors.map((visitor, index) => {
				if (visitor.visitor_no === visitorDetails.visitor_no) {
					return {
						...visitor,
						visitor_details: {
							...updatedVisitors.visitor_details,
							time_in: "",
							time_out: "",
						},
					};
				}
				return visitor;
			});
		});
	};

	const onChangeCountry = (value: string) => {
		updateData(value, "country");

		setLoadStates(true);
		axios
			.post("https://countriesnow.space/api/v0.1/countries/states", {
				country: value,
			})
			.then((response) => {
				const data = response.data.data;
				if (data.states.length > 0) {
					setNoStates(false);
					setStates(
						data.states.map((s: any) => ({ value: s.name, label: s.name })),
					);
				} else setNoStates(true);

				setLoadStates(false);
			})
			.catch(() => {
				setNoStates(true);
				setLoadStates(false);
			});
	};

	const onChangeState = (value: string) => {
		updateData(value, "province");

		setLoadCities(true);
		axios
			.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
				country: visitorDetails.visitor_details.address.country,
				state: value,
			})
			.then((response) => {
				const data = response.data.data;
				if (data.length > 0) {
					setNoCities(false);
					setCities(data.map((city: string) => ({ value: city, label: city })));
				} else setNoCities(true);

				setLoadCities(false);
			})
			.catch(() => {
				setNoCities(true);
				setLoadCities(false);
			});
	};

	const onChangeCity = async (value: string) => {
		updateData(value, "city");
	};

	const filterCountry = (
		input: string,
		option?: { label: string; value: string },
	) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

	const filterState = (
		input: string,
		option?: { label: string; value: string },
	) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

	const filterCity = (
		input: string,
		option?: { label: string; value: string },
	) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

	return (
		<>
			<div className="flex flex-wrap gap-[21px]">
				<Form.Item>
					<div
						className={`flex flex-col md:flex-row ${
							errors?.firstName ? "items-start" : "items-start md:items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[150px] ${
								errors?.firstName && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							First Name <span className="text-error">*</span>
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("firstName")}
								value={visitorDetails.visitor_details.name.first_name}
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
						className={`flex flex-col md:flex-row ${
							errors?.middleName ? "items-start" : "items-start md:items-center"
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
								value={visitorDetails.visitor_details.name.middle_name}
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
						className={`flex flex-col md:flex-row ${
							errors?.lastName ? "items-start" : "items-start md:items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[150px] ${
								errors?.lastName && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d] md:w-[150px] lg:w-[130px]`}
						>
							Last Name <span className="text-error">*</span>
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("lastName")}
								value={visitorDetails.visitor_details.name.last_name}
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
						className={`flex flex-col md:w-[550px] md:flex-row ${
							errors?.email ? "items-start" : "items-start md:items-center"
						} gap-[5%]`}
					>
						<span
							className={`w-[160px] ${
								errors?.email && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Email Address <span className="text-error">*</span>
						</span>
						<div className="flex w-full flex-col">
							<Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("email")}
								value={visitorDetails.visitor_details.email}
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
						className={`flex flex-col md:w-[500px] md:flex-row ${
							errors?.mobile ? "items-start" : "items-start md:items-center"
						} gap-[5%]`}
					>
						<span
							className={`w-[180px] ${
								errors?.mobile && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Mobile Number <span className="text-error">*</span>
						</span>
						<div className="flex w-full flex-col">
							<PhoneInput
								key={increment}
								className="phone-input"
								defaultCountry="PH"
								limitMaxLength
								international
								countryCallingCodeEditable={false}
								flags={flags}
								{...register("mobile")}
								value={visitorDetails.visitor_details.phone}
								onChange={(value: any) => updateData(value, "mobile")}
							/>
							{/* <Input
								key={increment}
								className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
								{...register("mobile")}
								value={visitorDetails.visitor_details.phone}
								onChange={(event: any) =>
									updateData(event.target.value, "mobile")
								}
							/> */}
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
						className={`flex flex-col md:flex-row ${
							errors?.house ? "items-start" : "items-start md:items-center"
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
								value={visitorDetails.visitor_details.address.house}
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
						className={`flex flex-col md:flex-row ${
							errors?.street ? "items-start" : "items-start md:items-center"
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
								value={visitorDetails.visitor_details.address.street}
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
						className={`flex flex-col md:flex-row ${
							errors?.brgy ? "items-start" : "items-start md:items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[130px] ${
								errors?.brgy && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Barangay <span className="text-error">*</span>
						</span>
						<div className="flex w-full flex-col">
							<Tooltip title="can be suburb, village, ward, etc.">
								<Input
									key={increment}
									className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
									{...register("brgy")}
									value={visitorDetails.visitor_details.address.brgy}
									onChange={(event: any) =>
										updateData(event.target.value, "brgy")
									}
								/>
							</Tooltip>
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
						className={`flex flex-col md:flex-row ${
							errors?.city ? "items-start" : "items-start md:items-center"
						} justify-between gap-[5%]`}
					>
						{visitorDetails.visitor_details.address.province ? (
							<>
								<span
									className={`w-[120px] ${
										errors?.city && "mt-[6px]"
									} text-[16px] font-[400] text-[#0000004d] lg:w-[60px]`}
								>
									City <span className="text-error">*</span>
								</span>
								<div className="flex w-full flex-col">
									{loadCities ? (
										<div className="pl-[30%]">
											<LoadingOutlined className="text-[24px] text-primary-500" />
										</div>
									) : noCities || states.length === 0 ? (
										<Input
											key={increment}
											className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
											{...register("city")}
											value={visitorDetails.visitor_details.address.city}
											onChange={(event: any) =>
												updateData(event.target.value, "city")
											}
										/>
									) : (
										<Select
											key={increment}
											loading={loadCities}
											className="address text-[#0C0D0D] hover:!text-[#0C0D0D]"
											showSearch
											allowClear
											defaultValue={
												visitorDetails.visitor_details.address.city || null
											}
											onChange={onChangeCity}
											options={cities}
											filterOption={filterCity}
										/>
									)}

									{errors?.city && (
										<p className="mt-1 text-sm text-red-500">
											{errors.city.message}
										</p>
									)}
								</div>
							</>
						) : (
							<span>&nbsp;</span>
						)}
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex flex-col md:flex-row ${
							errors?.province ? "items-start" : "items-start md:items-center"
						} justify-between gap-[5%]`}
					>
						{visitorDetails.visitor_details.address.country ? (
							<>
								<span
									className={`w-[120px] ${
										errors?.province && "mt-[6px]"
									} text-[16px] font-[400] text-[#0000004d]`}
								>
									Province <span className="text-error">*</span>
								</span>
								<div className="flex w-full flex-col">
									{loadStates ? (
										<div className="pl-[30%]">
											<LoadingOutlined className="text-[24px] text-primary-500" />
										</div>
									) : noStates ? (
										<Tooltip title="can be state or region">
											<Input
												key={increment}
												className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
												{...register("province")}
												value={visitorDetails.visitor_details.address.province}
												onChange={(event: any) =>
													updateData(event.target.value, "province")
												}
											/>
										</Tooltip>
									) : (
										<Tooltip title="can be state or region">
											<Select
												key={increment}
												loading={loadStates}
												className="address text-[#0C0D0D] hover:!text-[#0C0D0D]"
												showSearch
												allowClear
												defaultValue={
													visitorDetails.visitor_details.address.province ||
													null
												}
												onChange={onChangeState}
												options={states}
												filterOption={filterState}
											/>
										</Tooltip>
									)}

									{errors?.province && (
										<p className="mt-1 text-sm text-red-500">
											{errors.province.message}
										</p>
									)}
								</div>
							</>
						) : (
							<span>&nbsp;</span>
						)}
					</div>
				</Form.Item>
				<Form.Item>
					<div
						className={`flex flex-col md:flex-row ${
							errors?.country ? "items-start" : "items-start md:items-center"
						} justify-between gap-[5%]`}
					>
						<span
							className={`w-[120px] ${
								errors?.country && "mt-[6px]"
							} text-[16px] font-[400] text-[#0000004d]`}
						>
							Country <span className="text-error">*</span>
						</span>
						<div className="flex w-full flex-col">
							{loadCountries ? (
								<div className="pl-[30%]">
									<LoadingOutlined className="text-[24px] text-primary-500" />
								</div>
							) : noCountries ? (
								<Input
									key={increment}
									className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
									{...register("country")}
									value={visitorDetails.visitor_details.address.country}
									onChange={(event: any) =>
										updateData(event.target.value, "country")
									}
								/>
							) : (
								<Select
									loading={loadCountries}
									key={increment}
									className="address text-[#0C0D0D] hover:!text-[#0C0D0D]"
									showSearch
									allowClear
									placeholder={visitorDetails.visitor_details.address.country}
									defaultValue={
										visitorDetails.visitor_details.address.country || null
									}
									onChange={onChangeCountry}
									options={countries}
									filterOption={filterCountry}
								/>
							)}
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
