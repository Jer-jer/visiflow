import React, {
	useState,
	useContext,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

//Interfaces
import { CompanionRecord } from "../../../../components/table/companion-list";
import {
	CompanionDetailZod,
	CompanionDetailsInterfaceZod,
} from "../../../../utils/zodSchemas";
import type { Dayjs } from "dayjs";
import type { RootState } from "../../../../store";

//Store
import { update } from "../../../../states/visitors";
import { deleteCompanion } from "../../../../states/visitors/companions";

//Components
import { Button, Form, Input, Modal } from "antd";
import DateTimePicker from "../../../../components/datetime-picker";
import Label from "../../../../components/fields/input/label";
import Alert from "../../../../components/alert";

//Lib
import AxiosInstance from "../../../../lib/axios";

//Utils
import { formatDateObjToString } from "../../../../utils";

//Assets
import { ExclamationCircleFilled } from "@ant-design/icons";

//Styles
import "./styles.scss";
interface CompanionDetailsProps {
	mainVisitorId: string;
	id: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

type CompanionDetailTypeZod = z.infer<typeof CompanionDetailZod>;

const { confirm } = Modal;

export default function CompanionDetails({
	mainVisitorId,
	id,
	setOpen,
}: CompanionDetailsProps) {
	const record = useContext(CompanionRecord);

	const { data } = useSelector((state: RootState) => state.visitors);
	const mainVisitorIndex = data.findIndex((item) => item._id === mainVisitorId);

	const expected_in = formatDateObjToString(
		data[mainVisitorIndex].expected_time_in,
	);
	const expected_out = formatDateObjToString(
		data[mainVisitorIndex].expected_time_out,
	);

	//Alert State
	const [alertOpen, setAlertOpen] = useState(false);
	const [status, setStatus] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	const [disabledInputs, setDisabledInputs] = useState<boolean>(true);

	//Delete?
	const [deleteComp, setDeleteComp] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (deleteComp) {
			deleteCompanionDB();
			setDeleteComp(false);
		}
	}, [deleteComp]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<CompanionDetailTypeZod>({
		resolver: zodResolver(CompanionDetailZod),
		defaultValues: {
			first_name: record!.visitor_details.name.first_name,
			middle_name: record!.visitor_details.name.middle_name,
			last_name: record!.visitor_details.name.last_name,
			phone: record!.visitor_details.phone,
			email: record!.visitor_details.email,
			house: record!.visitor_details.address.house,
			street: record!.visitor_details.address.street,
			brgy: record!.visitor_details.address.brgy,
			city: record!.visitor_details.address.city,
			province: record!.visitor_details.address.province,
			country: record!.visitor_details.address.country,
			check_in_out: [expected_in, expected_out],
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
			case "phone":
				setValue(property, value as string);
				break;
			case "email":
				setValue(property, value as string);
				break;
			case "street":
				setValue(property, value as string);
				break;
			case "brgy":
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

	const saveAction = (zodData: CompanionDetailsInterfaceZod) => {
		AxiosInstance.put("/visitor/update", {
			_id: id,
			first_name: zodData
				? zodData.first_name
				: record!.visitor_details.name.first_name,
			middle_name: zodData
				? zodData.middle_name
				: record!.visitor_details.name.middle_name,
			last_name: zodData
				? zodData.last_name
				: record!.visitor_details.name.last_name,
			phone: zodData ? zodData.phone : record!.visitor_details.phone,
			email: zodData ? zodData.email : record!.visitor_details.email,
			house_no: zodData ? zodData.house : record!.visitor_details.address.house,
			street: zodData ? zodData.street : record!.visitor_details.address.street,
			brgy: zodData ? zodData.brgy : record!.visitor_details.address.brgy,
			city: zodData ? zodData.city : record!.visitor_details.address.city,
			province: zodData
				? zodData.province
				: record!.visitor_details.address.province,
			country: zodData
				? zodData.country
				: record!.visitor_details.address.country,
		})
			.then((res) => {
				dispatch(update(res.data.visitor));

				setStatus(true);
				setAlertMsg("Companion has been updated.");
				setAlertOpen(true);
				setDisabledInputs(!disabledInputs);
			})
			.catch((err) => {
				setStatus(false);
				setAlertOpen(true);
				setAlertMsg(err?.response?.data?.error || "Something went wrong.");
			});
	};

	const onSubmit = handleSubmit((data) => {
		saveAction(data);
	});

	const deleteCompanionDB = () => {
		AxiosInstance.put("/visitor/update", {
			_id: mainVisitorId,
			first_name: data[mainVisitorIndex].visitor_details.name.first_name,
			middle_name: data[mainVisitorIndex].visitor_details.name.middle_name,
			last_name: data[mainVisitorIndex].visitor_details.name.last_name,
			phone: data[mainVisitorIndex].visitor_details.phone,
			email: data[mainVisitorIndex].visitor_details.email,
			house_no: data[mainVisitorIndex].visitor_details.address.house,
			street: data[mainVisitorIndex].visitor_details.address.street,
			brgy: data[mainVisitorIndex].visitor_details.address.brgy,
			city: data[mainVisitorIndex].visitor_details.address.city,
			province: data[mainVisitorIndex].visitor_details.address.province,
			country: data[mainVisitorIndex].visitor_details.address.country,
			companions: data[mainVisitorIndex].companions!.filter(
				(item) => item !== id,
			),
			plate_num: data[mainVisitorIndex].plate_num,
			status: data[mainVisitorIndex].status,
			visitor_type: data[mainVisitorIndex].visitor_type,
		})
			.then(() => {
				setOpen(false);
			})
			.catch((err) => {
				setStatus(false);
				setAlertOpen(true);
				setAlertMsg(err.response.data.error);
			});
	};

	const showDeleteConfirm = () => {
		confirm({
			title: "Are you sure you want to remove companion?",
			className: "confirm-buttons",
			icon: <ExclamationCircleFilled className="!text-error-500" />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				dispatch(deleteCompanion(id));
				setDeleteComp(true);
			},
		});
	};

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
					statusColor={status ? "bg-primary-500" : "bg-error-500"}
					spanStyling="font-semibold"
					statusTextHeaderColor={status ? "text-primary-500" : "text-error-500"}
					descStyling="text-sm text-gray-600"
					header="Information Box"
					desc={alertMsg}
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
					<div className="ml-[58px] mt-[50px] flex flex-col gap-[25px]">
						<div className="flex justify-between">
							<div className="flex w-[782px] flex-col gap-[20px]">
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
												placeholder={record!.visitor_details.name.first_name}
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
												placeholder={record!.visitor_details.name.middle_name}
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
												placeholder={record!.visitor_details.name.last_name}
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
											Phone Number
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.visitor_details.phone}
												{...register("phone")}
												onChange={(e) => updateInput(e.target.value, "phone")}
												disabled={disabledInputs}
											/>
											{errors?.phone && (
												<p className="mt-1 text-sm text-red-500">
													{errors.phone.message}
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
											placeholder={record!.visitor_details.email}
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
												placeholder={record!.visitor_details.address.house}
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
												placeholder={record!.visitor_details.address.city}
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
												placeholder={record!.visitor_details.address.street}
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
												placeholder={record!.visitor_details.address.province}
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
											Brgy
										</Label>
										<div className={`flex ${errors && "w-[220px]"} flex-col`}>
											<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={record!.visitor_details.address.brgy}
												{...register("brgy")}
												onChange={(e) => updateInput(e.target.value, "brgy")}
												disabled={disabledInputs}
											/>
											{errors?.brgy && (
												<p className="mt-1 text-sm text-red-500">
													{errors.brgy.message}
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
												placeholder={record!.visitor_details.address.country}
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
											rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit] hover:!bg-[#e0ebf0] focus-within:!bg-[#e0ebf0] focus:!bg-[#e0ebf0]"
											size="large"
											defaultVal={{
												from:
													formatDateObjToString(
														data[mainVisitorIndex].expected_time_out,
													) || formatDateObjToString(new Date()),
												to:
													formatDateObjToString(
														data[mainVisitorIndex].expected_time_out,
													) || formatDateObjToString(new Date()),
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
						</div>
						{/* <div className="divider" /> */}
						<div className="flex justify-end gap-[15px]">
							{!disabledInputs && (
								<>
									<Button
										onClick={() => showDeleteConfirm()}
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-error-500"
									>
										Delete
									</Button>
									<Button
										type="primary"
										size="large"
										className="search-button !rounded-[18px] !bg-primary-500"
										htmlType="submit"
									>
										Save
									</Button>
								</>
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
