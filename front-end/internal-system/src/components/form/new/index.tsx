import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { isMobile } from "react-device-detect";

//Interfaces
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { WalkInFormInterfaceZod } from "../../../utils/zodSchemas";

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
import Webcam from "react-webcam";
import { capitalizeEachWord } from "../../../utils";

//Styles
import "./styles.scss";
import AxiosInstance from "../../../lib/axios";
import axios from "axios";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface NewWalkInProps {
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
	errors: FieldErrors<WalkInFormInterfaceZod>;
	register: UseFormRegister<WalkInFormInterfaceZod>;
	setAlertOpen: Dispatch<SetStateAction<boolean>>;
	onSubmit: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined,
	) => Promise<void>;
	handleSuccessOk: () => void;
	updateInput: (
		value: string | [string, string] | string[] | Date | any,
		property: string,
	) => void;
	handlePurpose: (purpose: string, value: string | string[]) => void;
	onChange: (date: dayjs.Dayjs, dateString: string | string[]) => void;
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

function NewWalkIn({
	isSuccessOpen,
	alertOpen,
	status,
	alertMsg,
	errors,
	whatOptions,
	whereOptions,
	whoOptions,
	register,
	setAlertOpen,
	onSubmit,
	handleSuccessOk,
	updateInput,
	handlePurpose,
	onChange,
}: NewWalkInProps) {
	const [firstName, setFirstName] = useState<string>("");
	const [middleName, setMiddleName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");

	const [house, setHouse] = useState<string>("");
	const [street, setStreet] = useState<string>("");
	const [brgy, setBrgy] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [province, setProvince] = useState<string>("");
	const [country, setCountry] = useState<string>("");

	const [plateNO, setPlateNO] = useState<string>("");

	const [isModalOpen, setIsModalOpen] = useState(false);

	const webcamRef = useRef<Webcam>(null);
	const [cameraActive, setCameraActive] = useState(true);
	const [loading, setLoading] = useState(false);

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
			setLoading(true);
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
			setLoading(false);
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
				<div className="mb-[35px] ml-2 mt-3 flex">
					<div className="w-[380px] flex-auto md:w-[761px]">
						<div className="items-around mb-[35px] ml-[20px] mr-[25px] flex h-fit flex-col justify-around gap-[30px] lg:flex-row lg:gap-[25px]">
							<div className="flex flex-col items-center justify-center gap-[50px]">
								<div className="align-center flex h-[245px] w-[330px] flex-col md:h-[300px] md:w-[360px]">
									<Image width="100%" height="100%" src={imageUrlID} />
									<Button
										type="primary"
										className="shadow-lgmd:h-[46px] h-[40px] !rounded-[10px] !bg-primary-500 text-xs md:text-lg"
										onClick={() => showModal("ID")}
									>
										<b>SCAN ID (OPTIONAL)</b>
									</Button>
								</div>
								<div className="align-center flex h-[245px] w-[330px] flex-col md:h-[300px] md:w-[360px]">
									<Image width="100%" height="100%" src={imageUrlPlateNO} />
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
										spinning={loading}
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
												<h1>First Name</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[30px]"
													size="large"
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
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[13px]"
													size="large"
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
												<h1>Last Name</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[31px]"
													size="large"
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
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[64px]"
													size="large"
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
												<h1>Mobile #</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[42px]"
													size="large"
													{...register("phone")}
													onChange={(e) => updateInput(e.target.value, "phone")}
												/>
											</div>
											{errors?.phone && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.phone.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Plate Number (Optional)</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[16px] md:w-[230px]"
													size="large"
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
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[24px]"
													size="large"
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
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[39.5px]"
													size="large"
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
												<h1>Barangay</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[18.5px]"
													size="large"
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
												<h1>City</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[52px]"
													size="large"
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
												<h1>Province</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[23px]"
													size="large"
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
												<h1>Country</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[27px]"
													size="large"
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
											<span className="mb-[-15px]">Purpose</span>
											<div className="flex flex-col gap-5 lg:flex-row">
												<div className="flex flex-col">
													<div>
														<Select
															className="w-[315px] md:w-[397px]"
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
															className="w-[315px] md:w-[397px]"
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
															className="w-[315px] md:w-[397px]"
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
														<h1>Expected Time Out</h1>
														<DatePicker
															showTime
															className="focus:!bg-[#e0ebf0]vm-placeholder ml-[20px] h-[35px] w-[180px] border-none !border-[#d9d9d9] bg-[#e0ebf0] focus-within:!bg-[#e0ebf0] hover:!border-primary-500 hover:!bg-[#e0ebf0] focus:!border-primary-500 md:w-[260px]"
															defaultValue={dayjs(
																dayjs(),
																"YYYY-MM-DD hh:mm A",
															)}
															format="YYYY-MM-DD hh:mm A"
															onChange={onChange}
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

export default NewWalkIn;
