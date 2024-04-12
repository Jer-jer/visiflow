import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

// Components
import { Input, Divider, Form, Select, Tooltip } from "antd";

// Interfaces
import {
	VisitorDataType,
	VisitorDetailsProps,
} from "../../../../utils/interfaces";
import type { StepTwoData } from "../../../../utils/zodSchemas";
import {
	type UseFormRegister,
	type UseFormSetValue,
	type FieldErrors,
} from "react-hook-form";

// Utils
import { mainOrCompanion } from "../../../../utils";

// Assets
import { LoadingOutlined } from "@ant-design/icons";

// Styles
import "./form.scss";

interface AddressSelectProps {
	value: string;
	label: string;
}

interface FormProps {
	visitorNo: number;
	visitorDetails: VisitorDetailsProps;
	increment: number;
	errors: FieldErrors<StepTwoData>;
	register: UseFormRegister<StepTwoData>;
	setValue: UseFormSetValue<StepTwoData>;
	setVisitors: Dispatch<SetStateAction<VisitorDataType[]>>;
}

export default function StepTwoForm({
	visitorNo,
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

		if (visitorDetails.address.province && visitorDetails.address.city) {
			onChangeCountry(visitorDetails.address.country);
			onChangeState(visitorDetails.address.province);
		}
	}, []);

	useEffect(() => {
		setValue("firstName", visitorDetails.name.first_name);
		setValue("middleName", visitorDetails.name.middle_name);
		setValue("lastName", visitorDetails.name.last_name);
		setValue("email", visitorDetails.email);
		setValue("mobile", visitorDetails.phone);
		setValue("house", visitorDetails.address.house);
		setValue("street", visitorDetails.address.street);
		setValue("brgy", visitorDetails.address.brgy);
		setValue("city", visitorDetails.address.city);
		setValue("province", visitorDetails.address.province);
		setValue("country", visitorDetails.address.country);
	}, [visitorDetails]);

	const updateData = (value: string, property: string) => {
		// const updatedVisitors = mainOrCompanion(increment, mainVisitor, companions);
		const updatedVisitors = visitorDetails;
		// let updatedCompanions = companions;

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

		setVisitors((preVisitors) => {
			let updateVisitors = preVisitors.map((visitor, index) => {
				if (index === visitorNo - 1) {
					return {
						...visitor,
						visitor_details: updatedVisitors,
					};
				}
				return visitor;
			});

			return updateVisitors;
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
				country: visitorDetails.address.country,
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
								value={visitorDetails.name.first_name}
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
								value={visitorDetails.name.middle_name}
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
								value={visitorDetails.name.last_name}
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
						className={`flex md:w-[500px] ${
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
								value={visitorDetails.email}
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
						className={`flex md:w-[500px] ${
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
								value={visitorDetails.phone}
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
								value={visitorDetails.address.house}
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
								value={visitorDetails.address.street}
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
							<Tooltip title="can be suburb, village, ward, etc.">
								<Input
									key={increment}
									className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
									{...register("brgy")}
									value={visitorDetails.address.brgy}
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
						className={`flex ${
							errors?.city ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						{visitorDetails.address.province ? (
							<>
								<span
									className={`w-[120px] ${
										errors?.city && "mt-[6px]"
									} text-[16px] font-[400] text-[#0000004d] lg:w-[50px]`}
								>
									City
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
											value={visitorDetails.address.city}
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
											defaultValue={visitorDetails.address.city || null}
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
						className={`flex ${
							errors?.province ? "items-start" : "items-center"
						} justify-between gap-[5%]`}
					>
						{visitorDetails.address.country ? (
							<>
								<span
									className={`w-[120px] ${
										errors?.province && "mt-[6px]"
									} text-[16px] font-[400] text-[#0000004d]`}
								>
									Province
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
												value={visitorDetails.address.province}
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
												defaultValue={visitorDetails.address.province || null}
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
							{loadCountries ? (
								<div className="pl-[30%]">
									<LoadingOutlined className="text-[24px] text-primary-500" />
								</div>
							) : noCountries ? (
								<Input
									key={increment}
									className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
									{...register("country")}
									value={visitorDetails.address.country}
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
									placeholder={visitorDetails.address.country}
									defaultValue={visitorDetails.address.country || null}
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
