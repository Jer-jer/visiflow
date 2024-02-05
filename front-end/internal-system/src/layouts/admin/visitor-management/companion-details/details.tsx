import React, { useState, useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//Interfaces
import { WidthContext } from "../../../logged-in";
import { CompanionRecord } from "../../../../components/table/companion-list";
import {
	CompanionDetailZod,
	CompanionDetailsInterfaceZod,
} from "../../../../utils/zodSchemas";
import type { Dayjs } from "dayjs";

//Layouts

//Components
import { Button, Avatar, Form, Input } from "antd";
import DateTimePicker from "../../../../components/datetime-picker";
// import Input from "../../../../components/fields/input/input";
import Label from "../../../../components/fields/input/label";
import Alert from "../../../../components/alert";
import Identification from "../identification";

//Assets
import { ExcelDownload } from "../../../../assets/svg";

//Styles
import "./styles.scss";

type CompanionDetailTypeZod = z.infer<typeof CompanionDetailZod>;

export default function CompanionDetails() {
	const record = useContext(CompanionRecord);

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);

	const [identificationOpen, setIdentificationOpen] = useState(false);

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	const width = useContext(WidthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<CompanionDetailTypeZod>({
		resolver: zodResolver(CompanionDetailZod),
		defaultValues: {
			first_name: record!.companion_details.name.first_name,
			middle_name: record!.companion_details.name.middle_name,
			last_name: record!.companion_details.name.last_name,
			mobile: record!.companion_details.phone,
			email: record!.companion_details.email,
			house: record!.companion_details.address.house_no,
			street: record!.companion_details.address.street,
			barangay: record!.companion_details.address.brgy,
			city: record!.companion_details.address.city,
			province: record!.companion_details.address.province,
			country: record!.companion_details.address.country,
			check_in_out: [
				record!.companion_details.time_in,
				record!.companion_details.time_out,
			],
		},
	});

	const updateInput = (value: string | [string, string], property: string) => {
		switch (property) {
			case "first_name":
				setValue(property, value as string);
				break;
			case "middle_name":
				setValue(property, value as string);
				break;
			case "last_name":
				setValue(property, value as string);
				break;
			case "mobile":
				const reg = /^[0-9\-+\b]*$/;
				if (reg.test(value as string)) {
					setValue(property, value as string);
				}
				break;
			case "email":
				setValue(property, value as string);
				break;
			case "street":
				setValue(property, value as string);
				break;
			case "barangay":
				setValue(property, value as string);
				break;
			case "city":
				setValue(property, value as string);
				break;
			case "province":
				setValue(property, value as string);
				break;
			case "country":
				setValue(property, value as string);
				break;
			case "check_in_out":
				setValue(property, value as [string, string]);
				break;
		}
	};

	const onRangeChange = (
		dates: null | (Dayjs | null)[],
		dateStrings: string[],
	) => {
		if (dates) {
			updateInput([dateStrings[0], dateStrings[1]], "check_in_out");
		} else {
			console.log("Clear");
		}
	};

	const editOrCancel = () => {
		setDisabledInputs(!disabledInputs);
		clearErrors();
	};

	const saveAction = (
		companionId: string,
		data: CompanionDetailsInterfaceZod,
	) => {
		//This needs to be customized to whatever the DB returns
		setAlertOpen(!alertOpen);

		setDisabledInputs(!disabledInputs);
	};

	const onSubmit = handleSubmit((data) => {
		saveAction(record!.companion_id, data);
	});

	return (
		<div className="companion-details">
			<div
				className={`transition-alert absolute right-0 z-[1] w-full scale-y-0 ease-in-out ${
					alertOpen && "scale-y-100"
				}`}
			>
				{/* // Needs to be customized to whatever the DB returns */}
				<Alert
					globalCustomStyling={`flex w-full overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
					statusStyling="flex w-12 items-center justify-center"
					statusColor="bg-primary-500"
					spanStyling="font-semibold"
					statusTextHeaderColor="text-primary-500"
					descStyling="text-sm text-gray-600"
					header="Information Box"
					desc="Message successfully sent to Visitor via Email"
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>

			<Form
				name="Visitor Companion Details"
				onFinish={onSubmit}
				autoComplete="off"
			>
				<div className="mr-[135px] flex flex-col gap-[35px]">
					<div className="flex justify-end">
						<ExcelDownload />
					</div>
					<div className="ml-[58px] flex flex-col gap-[25px]">
						<div className="flex justify-between">
							<div className="flex w-[782px] flex-col gap-[20px]">
								<div className="flex w-full gap-[33px]">
									<Label
										spanStyling="text-black font-medium text-[16px]"
										labelStyling="w-[13.8%]"
									>
										Visitor ID
									</Label>
									<Input
										className="vm-placeholder h-[38px] w-[650px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
										placeholder={record!.companion_id}
										disabled
									/>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											First Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.name.first_name}
												{...register("first_name")}
												onChange={(e) =>
													updateInput(e.target.value, "first_name")
												}
												disabled={disabledInputs}
											/>
											{errors?.first_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.first_name.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Middle Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.name.middle_name}
												{...register("middle_name")}
												onChange={(e) =>
													updateInput(e.target.value, "middle_name")
												}
												disabled={disabledInputs}
											/>
											{errors?.middle_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.middle_name.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Last Name
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.name.last_name}
												{...register("last_name")}
												onChange={(e) =>
													updateInput(e.target.value, "last_name")
												}
												disabled={disabledInputs}
											/>
											{errors?.last_name && (
												<p className="mt-1 text-sm text-red-500">
													{errors.last_name.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Mobile Number
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.phone}
												{...register("mobile")}
												onChange={(e) => updateInput(e.target.value, "mobile")}
												disabled={disabledInputs}
											/>
											{errors?.mobile && (
												<p className="mt-1 text-sm text-red-500">
													{errors.mobile.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div
									className={`flex w-[782px] ${
										errors && "items-start"
									} justify-between`}
								>
									<Label
										spanStyling="text-black font-medium text-[16px]"
										labelStyling="w-[15%]"
									>
										Email Address
									</Label>
									<div className="flex flex-col">
										<Input
											className="vm-placeholder h-[38px] w-[640px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
											placeholder={record!.companion_details.email}
											{...register("email")}
											onChange={(e) => updateInput(e.target.value, "email")}
											disabled={disabledInputs}
										/>
										{errors?.email && (
											<p className="mt-1 text-sm text-red-500">
												{errors.email.message}
											</p>
										)}
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											House No.
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.address.house_no}
												{...register("house")}
												onChange={(e) => updateInput(e.target.value, "house")}
												disabled={disabledInputs}
											/>
											{errors?.house && (
												<p className="mt-1 text-sm text-red-500">
													{errors.house.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											City
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.address.city}
												{...register("city")}
												onChange={(e) => updateInput(e.target.value, "city")}
												disabled={disabledInputs}
											/>
											{errors?.city && (
												<p className="mt-1 text-sm text-red-500">
													{errors.city.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Street
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.address.city}
												{...register("street")}
												onChange={(e) => updateInput(e.target.value, "street")}
												disabled={disabledInputs}
											/>
											{errors?.street && (
												<p className="mt-1 text-sm text-red-500">
													{errors.street.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Province
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.address.province}
												{...register("province")}
												onChange={(e) =>
													updateInput(e.target.value, "province")
												}
												disabled={disabledInputs}
											/>
											{errors?.province && (
												<p className="mt-1 text-sm text-red-500">
													{errors.province.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-[60px]">
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Barangay
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.address.brgy}
												{...register("barangay")}
												onChange={(e) =>
													updateInput(e.target.value, "barangay")
												}
												disabled={disabledInputs}
											/>
											{errors?.barangay && (
												<p className="mt-1 text-sm text-red-500">
													{errors.barangay.message}
												</p>
											)}
										</div>
									</div>
									<div
										className={`flex w-[360px] ${
											errors && "items-start"
										} justify-between`}
									>
										<Label spanStyling="text-black font-medium text-[16px]">
											Country
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.companion_details.address.country}
												{...register("country")}
												onChange={(e) => updateInput(e.target.value, "country")}
												disabled={disabledInputs}
											/>
											{errors?.country && (
												<p className="mt-1 text-sm text-red-500">
													{errors.country.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div
									className={`flex w-full ${
										errors && "items-start"
									} justify-between`}
								>
									<Label
										spanStyling="text-black font-medium text-[16px]"
										labelStyling="w-[22.5%]"
									>
										Time In and Out
									</Label>
									<div className="flex w-full flex-col">
										<DateTimePicker
											globalStyling="w-full"
											rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit]"
											size="large"
											defaultVal={{
												from:
													record!.companion_details.time_in ||
													"9999-99-99 99:90 PM",
												to:
													record!.companion_details.time_out ||
													"9999-99-99 99:99 PM",
											}}
											onRangeChange={onRangeChange}
											visitorMngmnt
											disabled={disabledInputs}
										/>
										{errors?.check_in_out && (
											<p className="mt-1 text-sm text-red-500">
												{errors.check_in_out.message}
											</p>
										)}
									</div>
								</div>
							</div>
							<div className="flex w-full flex-col items-center gap-[30px]">
								{/* <Avatar size={width === 1210 ? 150 : 220} src={RyanReynolds} /> */}
								<Avatar
									className="cursor-pointer"
									onClick={() => setIdentificationOpen(!identificationOpen)}
									size={width === 1210 ? 150 : 220}
									src="https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg"
								/>
								<Identification
									open={identificationOpen}
									setOpen={setIdentificationOpen}
									image={{
										frontId:
											"https://media.philstar.com/photos/2021/07/23/10_2021-07-23_18-27-24.jpg",
										backId:
											"https://s3-alpha-sig.figma.com/img/6541/e76f/4938b0155718de8af5610a0f82b07fc5?Expires=1696809600&Signature=g9ee7Y9K6izTlUfPBSWDgv2t9CilaBU3wsYb~xTBNwzFqBIgD~qDFl1WJms9oyFfyQXVxeFC5zydUUKHzBz-JaG~jZ31ambhXu9Gqte1D5vDh9x6WnZF8Kszq9IisRwRC1ytG02cYqFmIFpwLjb-hZ-JFXIWPbB~g-EA-pVFCSsElqjTHikVTTSSmEQiViHAXOSZo0OF3spgfGhfQhtobuWeryxKXlrr3Wu6CnxlIN0VGWKrCMzNH3qp6o99M8KZ4tkEsA8oFrhz~ijLF2GntP1DSBpZNm07wWoLJ2T1l7zSdqRJ5OOl4wiRucamxNbR8wnqPxjrKxrRGE7nJhAQ6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
										selfieId:
											"https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg",
									}}
								/>
							</div>
						</div>
						{/* <div className="divider" /> */}
						<div className="flex justify-end gap-[15px]">
							{!disabledInputs && (
								<Button
									// onClick={saveAction}
									type="primary"
									size="large"
									className="search-button !rounded-[18px] !bg-primary-500"
									htmlType="submit"
								>
									Save
								</Button>
							)}
							<Button
								onClick={editOrCancel}
								type="primary"
								size="large"
								className="search-button !rounded-[18px] !bg-primary-500"
							>
								{disabledInputs ? "Edit" : "Cancel"}
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}
