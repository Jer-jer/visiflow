import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import z from "zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Webcam from "react-webcam";
import PhoneInput from "react-phone-number-input";

//Interfaces
import { useForm } from "react-hook-form";
import {
	WalkInFormZod,
	WalkInFormInterfaceZod,
} from "../../../utils/zodSchemas";
import type { DatePickerProps } from "antd";

//Components
import {
	Button,
	Form,
	Modal,
	Image,
	Input,
	Select,
	DatePicker,
	Spin,
} from "antd";
import Alert from "../../alert";
import { capitalizeEachWord } from "../../../utils";
import { isMobile } from "react-device-detect";
import { GuardVisitorDataType } from "../../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../../utils/enums";

//Utils
import { capitilizeFirstLetter } from "../../../utils";

//Lib
import AxiosInstance from "../../../lib/axios";

//Assets
import flags from "react-phone-number-input/flags";

//Styles
import "react-phone-number-input/style.css";
import "./styles.scss";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

type WalkInFormTypeZod = z.infer<typeof WalkInFormZod>;

interface RecurringProps {
	visitor: GuardVisitorDataType;
	isSuccessOpen: boolean;
	alertOpen: boolean;
	status: boolean;
	alertMsg: string;
	whatOptions: {
		label: string;
		value: string;
	}[];
	whoOptions: {
		label: string;
		value: string;
	}[];
	whereOptions: {
		label: string;
		value: string;
	}[];
	qr_id?: string;
	setAlertOpen: Dispatch<SetStateAction<boolean>>;
	handleSuccessOk: () => void;
	setLoading: Dispatch<SetStateAction<boolean>>;
	setIsSuccessOpen: Dispatch<SetStateAction<boolean>>;
	setStatus: Dispatch<SetStateAction<boolean>>;
	setAlertMsg: Dispatch<SetStateAction<string>>;
}

const selfieMode = {
	width: 1280,
	height: 720,
	facingMode: "user",
};

const outMode = {
	width: 1280,
	height: 720,
	facingMode: { exact: "environment" },
};

function RecurringVisitor({
	visitor,
	isSuccessOpen,
	alertOpen,
	status,
	alertMsg,
	whatOptions,
	whereOptions,
	whoOptions,
	qr_id,
	setAlertOpen,
	handleSuccessOk,
	setLoading,
	setIsSuccessOpen,
	setStatus,
	setAlertMsg,
}: RecurringProps) {
	const desktopMedia = window.matchMedia("(min-width: 1024px)");

	const [firstName, setFirstName] = useState<string>(
		visitor.visitor_details.name.first_name,
	);
	const [middleName, setMiddleName] = useState<string>(
		visitor.visitor_details.name.middle_name
			? visitor.visitor_details.name.middle_name
			: "",
	);
	const [lastName, setLastName] = useState<string>(
		visitor.visitor_details.name.last_name,
	);

	const [house, setHouse] = useState<string>(
		visitor.visitor_details.address.house
			? visitor.visitor_details.address.house
			: "",
	);
	const [street, setStreet] = useState<string>(
		visitor.visitor_details.address.street
			? visitor.visitor_details.address.street
			: "",
	);
	const [brgy, setBrgy] = useState<string>(
		visitor.visitor_details.address.brgy,
	);
	const [city, setCity] = useState<string>(
		visitor.visitor_details.address.city,
	);
	const [province, setProvince] = useState<string>(
		visitor.visitor_details.address.province,
	);
	const [country, setCountry] = useState<string>(
		visitor.visitor_details.address.country,
	);

	const [plateNO, setPlateNO] = useState<string>(
		visitor.plate_num ? visitor.plate_num : "",
	);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const webcamRef = useRef<Webcam>(null);
	const [cameraActive, setCameraActive] = useState(true);
	const [loadingModal, setLoadingModal] = useState(false);

	const [imageUrlScan, setImageUrlScan] = useState<string | undefined>(
		undefined,
	);
	const [imageUrlID, setImageUrlID] = useState<string | undefined>(
		"https://cdn-icons-png.flaticon.com/512/6080/6080012.png",
	);
	const [imageUrlPlateNO, setImageUrlPlateNO] = useState<string | undefined>(
		"https://cdn-icons-png.flaticon.com/512/6080/6080012.png",
	);

	const [scan, setScan] = useState<"ID" | "PlateNO" | "">("");

	const capture = async () => {
		const imageSrc = webcamRef.current?.getScreenshot();
		const base64String = (imageSrc as string)?.split(",")[1];
		if (imageSrc) {
			setLoadingModal(true);
			setCameraActive(false);
			setImageUrlScan(imageSrc);
			console.log(scan);
			try {
				if (scan === "ID") {
					const response: any = await AxiosInstance.post("/scan/", {
						image: base64String,
					});
					const data = response.data.inference.prediction;

					let firstName = "";
					let middleName = "";
					let lastName = "";
					let house = "";
					let street = "";
					let brgy = "";
					let city = "";
					let province = "";
					let country = "";

					if (data.surnames.length >= 2) {
						middleName = data.surnames.pop().value;
					} else if (data.givenNames.length >= 2) {
						middleName = data.givenNames.pop().value;
					}

					firstName = data.givenNames
						.map((nameObj: any) => nameObj.value)
						.join(" ");
					lastName = data.surnames
						.map((nameObj: any) => nameObj.value)
						.join(" ");

					const parts = data.address.value
						.split(",")
						.map((part: any) => part.trim());

					const variables = [
						"house",
						"street",
						"brgy",
						"city",
						"province",
						"country",
					];

					parts.forEach((part: any, index: number) => {
						if (index < variables.length) {
							eval(`${variables[index]} = part`);
						}
					});

					setFirstNameZod(capitalizeEachWord(firstName));
					setMiddleNameZod(capitalizeEachWord(middleName));
					setLastNameZod(capitalizeEachWord(lastName));
					setHouseZod(capitalizeEachWord(house));
					setStreetZod(capitalizeEachWord(street));
					setBrgyZod(capitalizeEachWord(brgy));
					setCityZod(capitalizeEachWord(city));
					setProvinceZod(capitalizeEachWord(province));
					setCountryZod(capitalizeEachWord(country));
					setImageUrlID(imageSrc);
				} else if (scan === "PlateNO") {
					let formData: any = new FormData();
					formData.append("upload", imageSrc);
					formData.append("regions", "ph"); // Change to your country

					const response = await axios.post(
						"https://api.platerecognizer.com/v1/plate-reader/",
						formData,
						{
							headers: {
								Authorization: "Token 7cb6cc054aaf57979580f75ac193ffc63f826307",
							},
						},
					);
					const data = response.data.results[0];

					setPlateNoZod(data.plate.toUpperCase());
					setImageUrlPlateNO(imageSrc);
				}

				handleOk();
			} catch (err) {
				console.log(err);
			}
			setLoadingModal(false);
			setCameraActive(true);
		}
	};

	const setFirstNameZod = (value: any) => {
		setFirstName(value);
		updateInput(value, "first_name");
	};

	const setMiddleNameZod = (value: any) => {
		setMiddleName(value);
		updateInput(value, "middle_name");
	};

	const setLastNameZod = (value: any) => {
		setLastName(value);
		updateInput(value, "last_name");
	};

	const setHouseZod = (value: any) => {
		setHouse(value);
		updateInput(value, "house");
	};

	const setStreetZod = (value: any) => {
		setStreet(value);
		updateInput(value, "street");
	};

	const setBrgyZod = (value: any) => {
		setBrgy(value);
		updateInput(value, "brgy");
	};

	const setCityZod = (value: any) => {
		setCity(value);
		updateInput(value, "city");
	};

	const setProvinceZod = (value: any) => {
		setProvince(value);
		updateInput(value, "province");
	};

	const setCountryZod = (value: any) => {
		setCountry(value);
		updateInput(value, "country");
	};

	const setPlateNoZod = (value: any) => {
		setPlateNO(value);
		updateInput(value, "plate_num");
	};

	const showModal = (module: "ID" | "PlateNO") => {
		setIsModalOpen(true);
		setScan(module);
		setImageUrlScan(undefined);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setScan("");
		setImageUrlScan(undefined);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setScan("");
		setImageUrlScan(undefined);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<WalkInFormTypeZod>({
		defaultValues: {
			first_name: visitor.visitor_details.name.first_name,
			middle_name: visitor.visitor_details.name.middle_name
				? visitor.visitor_details.name.middle_name
				: "",
			last_name: visitor.visitor_details.name.last_name,
			email: visitor.visitor_details.email,
			phone: visitor.visitor_details.phone,
			plate_num: visitor.plate_num,
			house: visitor.visitor_details.address.house,
			street: visitor.visitor_details.address.street,
			brgy: visitor.visitor_details.address.brgy,
			city: visitor.visitor_details.address.city,
			province: visitor.visitor_details.address.province,
			country: visitor.visitor_details.address.country,
			what: visitor.purpose.what,
			who: visitor.purpose.who,
			where: visitor.purpose.where,
			expected_time_out: new Date(),
		},
		resolver: zodResolver(WalkInFormZod),
	});

	const updateInput = (
		value: string | [string, string] | string[] | Date | any,
		property: string,
	) => {
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
			case "house":
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
			case "expected_time_out":
				setValue(property, value as Date);
				break;
			case "plate_num":
				setValue(property, value as string);
				break;
			case "what":
				setValue(property, value as string[]);
				break;
			case "where":
				setValue(property, value as string[]);
				break;
			case "who":
				setValue(property, value as string[]);
				break;
		}
	};

	const disabledDateTime = () => {
		const currentHour = dayjs().hour();
		const currentMinute = dayjs().minute();

		return {
			disabledHours: () => range(0, currentHour),
			disabledMinutes: (selectedHour: number) => {
				if (selectedHour === currentHour) {
					return range(0, currentMinute);
				}
				return [];
			},
		};
	};

	// Helper function to generate range array
	const range = (start: number, end: number) => {
		return Array.from({ length: end - start }, (_, i) => start + i);
	};

	const handlePurpose = (purpose: string, value: string | string[]) => {
		switch (purpose) {
			case "what":
				setValue("what", value as string[]);
				break;
			case "where":
				setValue("where", value as string[]);
				break;
			case "who":
				setValue("who", value as string[]);
				break;
			default:
				console.error("Something went wrong");
		}
	};

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		updateInput(new Date(dateString as string), "expected_time_out");
	};

	const saveAction = async (zodData: WalkInFormInterfaceZod) => {
		setLoading(true);
		await AxiosInstance.post("/visitor/new-recurring-walk-in", {
			_id: visitor._id,
			visitor_details: {
				name: {
					first_name: capitilizeFirstLetter(zodData.first_name),
					middle_name: zodData.middle_name
						? capitilizeFirstLetter(zodData.middle_name)
						: "",
					last_name: capitilizeFirstLetter(zodData.last_name),
				},
				address: {
					house: zodData.house,
					street: zodData.street,
					brgy: zodData.brgy,
					city: zodData.city,
					province: zodData.province,
					country: zodData.country,
				},
				email: zodData.email,
				phone: zodData.phone,
			},
			expected_time_in: new Date(),
			expected_time_out: new Date(zodData.expected_time_out),
			plate_num: zodData.plate_num,
			purpose: {
				what: zodData.what,
				when: new Date(),
				where: zodData.where,
				who: zodData.who,
			},
			status: VisitorStatus.Approved,
			visitor_type: VisitorType.WalkIn,
		})
			.then((res) => {
				AxiosInstance.post("/badge/newBadge", {
					visitor_id: res.data.visitor._id,
					qr_id: qr_id,
				})
					.then((res) => {
						setLoading(false);
						setIsSuccessOpen(true);
					})
					.catch((err) => {
						if (err & err.response) {
							setLoading(false);
							setStatus(false);
							setAlertOpen(true);
							const errorMessage = err.response.data.error;

							setAlertMsg(errorMessage);
						}
					});
			})
			.catch((err) => {
				if (err & err.response) {
					setLoading(false);
					setStatus(false);
					setAlertOpen(true);
					const errorMessage = err.response.data.error;

					setAlertMsg(errorMessage);
				}
			});
	};

	const onSubmit = handleSubmit((data) => {
		saveAction(data);
	});

	return (
		<>
			<Modal
				title={
					<span className="text-[24px] font-semibold text-primary-500">
						Success
					</span>
				}
				open={isSuccessOpen}
				onOk={handleSuccessOk}
			>
				<span>Sucessfully registered and timed-in visitor.</span>
			</Modal>
			<div
				className={`transition-alert absolute z-[1] w-[380px] scale-y-0 ease-in-out ${
					alertOpen && "scale-y-100"
				}`}
			>
				<Alert
					globalCustomStyling={`flex w-[380px] overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
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
			<Form name="Visitor Details" onFinish={onSubmit} autoComplete="off">
				<div className="mb-[35px] ml-2 mt-[-30px] flex lg:mt-3">
					<div className="w-[280px] flex-auto md:w-[761px]">
						<div className="mb-[35px] ml-[5px] mr-[25px] flex h-fit flex-col items-center justify-center gap-[50px] md:ml-[20px] lg:flex-row lg:gap-[40px]">
							<div className="flex flex-col items-center justify-center gap-[40px] lg:mt-[-55px]">
								<div className="flex h-[200px] w-[300px] flex-col items-center md:h-[240px] md:w-[320px]">
									<Image
										width={desktopMedia.matches ? "100%" : "90%"}
										height="100%"
										src={imageUrlID}
									/>
									<Button
										type="primary"
										className="shadow-lgmd:h-[46px] h-[40px] !rounded-[10px] !bg-primary-500 text-xs md:text-lg"
										onClick={() => showModal("ID")}
									>
										<b>SCAN ID (OPTIONAL)</b>
									</Button>
								</div>
								<div className="flex h-[200px] w-[300px] flex-col items-center md:h-[240px] md:w-[320px]">
									<Image
										width={desktopMedia.matches ? "100%" : "90%"}
										height="100%"
										src={imageUrlPlateNO}
									/>
									<Button
										type="primary"
										className="h-[40px] !rounded-[10px] !bg-primary-500 text-xs shadow-lg md:h-[46px] md:text-lg"
										onClick={() => showModal("PlateNO")}
									>
										<b>SCAN PLATE NO. (OPTIONAL)</b>
									</Button>
								</div>
								<Modal
									title={`Scan ${scan}`}
									open={isModalOpen}
									onCancel={() => handleCancel()}
									width={642}
									centered
									footer={[
										<Button
											onClick={() => handleCancel()}
											className="!bg-secondary-500 mt-[-50px] !rounded-[5px] text-xs shadow-lg"
											type="primary"
										>
											Cancel
										</Button>,
									]}
								>
									<Spin
										tip="Scanning in progress..."
										spinning={loadingModal}
										delay={500}
									>
										{cameraActive && (
											<Webcam
												audio={false}
												height={720}
												screenshotFormat="image/png"
												width={1280}
												videoConstraints={isMobile ? outMode : selfieMode}
												ref={webcamRef}
											/>
										)}
										{!cameraActive && <img src={imageUrlScan} alt="Captured" />}

										<div className="flex justify-center">
											<Button
												onClick={capture}
												className="mt-[-50px] !rounded-[5px] !bg-primary-500 text-xs shadow-lg"
												type="primary"
											>
												<b>Capture photo</b>
											</Button>
										</div>
									</Spin>
								</Modal>
							</div>

							<div className="flex flex-col items-center justify-center gap-[20px]">
								<div className="flex flex-col gap-7 lg:flex-row lg:gap-[40px]">
									<div className="flex flex-col items-center gap-7">
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>
													First Name <span className="text-error-500">*</span>
												</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[30px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.name.first_name}
													{...register("first_name")}
													value={firstName}
													onChange={(e) => {
														setFirstNameZod(e.target.value);
													}}
												/>
											</div>
											{errors?.first_name && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.first_name.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Middle Name</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[13px] md:w-[300px]"
													size="large"
													defaultValue={
														visitor.visitor_details.name.middle_name
													}
													{...register("middle_name")}
													value={middleName}
													onChange={(e) => {
														setMiddleNameZod(e.target.value);
													}}
												/>
											</div>
											{errors?.middle_name && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.middle_name.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>
													Last Name <span className="text-error-500">*</span>
												</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[31px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.name.last_name}
													{...register("last_name")}
													value={lastName}
													onChange={(e) => {
														setLastNameZod(e.target.value);
													}}
												/>
											</div>
											{errors?.last_name && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.last_name.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Email</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[64px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.email}
													{...register("email")}
													onChange={(e) => updateInput(e.target.value, "email")}
												/>
											</div>
											{errors?.email && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.email.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>
													Mobile <span className="text-error-500">*</span>
												</h1>
												<PhoneInput
													className="phone-input-walk-in w-[260px] md:w-[310px]"
													defaultCountry="PH"
													international
													countryCallingCodeEditable={false}
													flags={flags}
													{...register("phone")}
													value={visitor.visitor_details.phone}
													onChange={(value: any) => updateInput(value, "phone")}
												/>
												{/* <Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[42px]"
													size="large"
													defaultValue={visitor.visitor_details.phone}
													{...register("phone")}
													onChange={(e) => updateInput(e.target.value, "phone")}
												/> */}
											</div>
											{errors?.phone && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.phone.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Plate Number</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[16px] md:w-[230px]"
													size="large"
													defaultValue={visitor.plate_num ?? ""}
													{...register("plate_num")}
													value={plateNO}
													onChange={(e) => setPlateNO(e.target.value)}
												/>
											</div>
											{errors?.plate_num && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.plate_num.message}
												</p>
											)}
										</div>
									</div>

									<div className="flex flex-col items-start gap-7">
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>House #</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[24px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.address.house}
													{...register("house")}
													value={house}
													onChange={(e) => setHouseZod(e.target.value)}
												/>
											</div>
											{errors?.house && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.house.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Street</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[39.5px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.address.street}
													{...register("street")}
													value={street}
													onChange={(e) => setStreetZod(e.target.value)}
												/>
											</div>
											{errors?.street && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.street.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>
													Barangay <span className="text-error-500">*</span>
												</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[18.5px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.address.brgy}
													{...register("brgy")}
													value={brgy}
													onChange={(e) => setBrgyZod(e.target.value)}
												/>
											</div>
											{errors?.brgy && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.brgy.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>
													City <span className="text-error-500">*</span>
												</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[52px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.address.city}
													{...register("city")}
													value={city}
													onChange={(e) => setCityZod(e.target.value)}
												/>
											</div>
											{errors?.city && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.city.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>
													Province <span className="text-error-500">*</span>
												</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[23px] md:w-[300px]"
													size="large"
													defaultValue={
														visitor.visitor_details.address.province
													}
													{...register("province")}
													value={province}
													onChange={(e) => setProvinceZod(e.target.value)}
												/>
											</div>
											{errors?.province && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.province.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>
													Country <span className="text-error-500">*</span>
												</h1>
												<Input
													className="h-[35px] w-[260px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[27px] md:w-[300px]"
													size="large"
													defaultValue={visitor.visitor_details.address.country}
													{...register("country")}
													value={country}
													onChange={(e) => setCountryZod(e.target.value)}
												/>
											</div>
											{errors?.country && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.country.message}
												</p>
											)}
										</div>
									</div>
								</div>

								<div className="flex flex-col">
									<div className="flex gap-[41px]">
										<div className="flex flex-col gap-5 lg:gap-7">
											<span className="mb-[-15px]">
												Purpose <span className="text-error-500">*</span>
											</span>
											<div className="flex flex-col gap-5 lg:flex-row">
												<div className="flex flex-col">
													<div>
														<Select
															className="w-[260px] md:w-[397px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="What"
															listHeight={150}
															options={whatOptions}
															{...register("what")}
															onChange={(value: string[]) =>
																handlePurpose("what", value)
															}
														></Select>
													</div>
													{errors?.what && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.what.message}
														</p>
													)}
												</div>

												<div className="flex flex-col">
													<div>
														<Select
															className="w-[260px] md:w-[397px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="Who"
															listHeight={150}
															options={whoOptions}
															{...register("who")}
															onChange={(value: string[]) =>
																handlePurpose("who", value)
															}
														></Select>
													</div>
													{errors?.who && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.who.message}
														</p>
													)}
												</div>
											</div>
											<div className="flex flex-col gap-5 lg:flex-row">
												<div className="flex flex-col">
													<div>
														<Select
															className="w-[260px] md:w-[397px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="Where"
															listHeight={150}
															options={whereOptions}
															{...register("where")}
															onChange={(value: string[]) =>
																handlePurpose("where", value)
															}
														></Select>
													</div>
													{errors?.where && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.where.message}
														</p>
													)}
												</div>

												<div className="flex flex-col">
													<div className="flex flex-col md:flex-row md:items-center">
														<h1>
															Expected Time Out{" "}
															<span className="text-error-500">*</span>
														</h1>
														<DatePicker
															showTime
															className="focus:!bg-[#e0ebf0]vm-placeholder h-[35px] w-[260px] border-none !border-[#d9d9d9] bg-[#e0ebf0] focus-within:!bg-[#e0ebf0] hover:!border-primary-500 hover:!bg-[#e0ebf0] focus:!border-primary-500 md:ml-[20px] md:w-[260px]"
															defaultValue={dayjs(
																dayjs(),
																"YYYY-MM-DD hh:mm A",
															)}
															format="YYYY-MM-DD hh:mm A"
															onChange={onChange}
															disabledDate={(current) => {
																return current < dayjs().startOf("day");
															}}
															disabledTime={disabledDateTime}
														/>
													</div>
													{errors?.expected_time_out && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.expected_time_out.message}
														</p>
													)}
												</div>
											</div>
											<div className="flex justify-end gap-10">
												<Button
													type="primary"
													className="mt-[10px] w-[100px] !rounded-[10px] !bg-primary-500"
													htmlType="submit"
												>
													SUBMIT
												</Button>
												<Button
													type="primary"
													className="mt-[10px] w-[100px] !rounded-[10px] !bg-red-500"
													href="/"
												>
													CANCEL
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</>
	);
}

export default RecurringVisitor;
