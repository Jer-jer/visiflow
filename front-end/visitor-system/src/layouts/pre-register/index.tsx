import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Components
import {
	Button,
	Image,
	InputNumber,
	Select,
	DatePicker,
	Checkbox,
	Modal,
} from "antd";
import Stepper from "../../components/stepper";
import StepTwo from "../../components/forms/step-two";
import StepThree from "../../components/forms/step-three";

// Interfaces
import { VisitorData } from "../../utils/interfaces";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

// Styles
import "./styles.scss";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

export default function PreRegister() {
	const [isTCOpen, setIsTCOpen] = useState(false);
	const [isPhotoOpen, setIsPhotoOpen] = useState(false);
	const [progress, setProgress] = useState(1);
	const [visitors, setVisitors] = useState<VisitorData[]>([
		{
			id: 1,
			data: {
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
		},
	]);
	const [visitorNo, setVisitorNo] = useState(1);

	const { RangePicker } = DatePicker;
	const timeFormat = "hh:mm A";

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const onChange = (e: CheckboxChangeEvent) => {
		console.log(`checked = ${e.target.checked}`);
	};

	const showTC = () => {
		setIsTCOpen(true);
	};

	const handleTCOk = () => {
		setIsTCOpen(false);
	};

	const handleTCCancel = () => {
		setIsTCOpen(false);
	};

	const showModalPhoto = () => {
		setIsPhotoOpen(true);
	};

	const handleOkPhoto = () => {
		setIsPhotoOpen(false);
	};

	const handleCancelPhoto = () => {
		setIsPhotoOpen(false);
	};

	const nextStep = () => {
		setProgress(progress + 1);
	};

	const previousStep = () => {
		setProgress(progress - 1);
	};

	const addVisitor = (value: any) => {
		setVisitorNo(value);
		if (value > visitors.length) {
			const updateVisitors = [...visitors];

			for (let x = visitorNo; x < value; x++) {
				updateVisitors.push({
					id: x + 1,
					data: {
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
				});
			}
			setVisitors(updateVisitors);
		} else if (value < visitors.length) {
			setVisitors(visitors.slice(0, value));
			console.warn("remove visitor", visitors);
		}
	};

	const StepOne = () => {
		return (
			<>
				<div className="mb-[5px] flex items-center gap-8 lg:w-[20%]">
					<span className="text-[16px] font-[400] text-[#0000004d]">
						No. of Visitors
					</span>
					<InputNumber
						className="rounded-[5px] border-none bg-[#DFEAEF] focus:border-primary-500 focus:outline-0 focus:!ring-transparent"
						style={{ width: 80, height: 35 }}
						min={1}
						defaultValue={visitorNo}
						onChange={addVisitor}
					/>
				</div>
				<div className="mb-[5px] flex items-center gap-8 lg:w-[30%]">
					<span className="text-[16px] font-[400] text-[#0000004d]">
						Person of Interest
					</span>
					<Select
						className="border-none"
						defaultValue="johnDoe"
						style={{ width: 180 }}
						onChange={handleChange}
						options={[
							{ value: "johnDoe", label: "Dr. John Doe" },
							{ value: "lucyGrimm", label: "Lucy Grimm" },
						]}
					/>
				</div>
				<div className="mb-[10px] flex flex-col gap-[10px] md:mb-[5px] md:flex-row md:items-center md:gap-8">
					<span className="text-[16px] font-[400] text-[#0000004d]">
						Check-in and Check-out
					</span>
					<RangePicker
						className="vm-placeholder w-[86%] !border-[#d9d9d9] hover:!border-primary-500 focus:!border-primary-500 md:w-auto"
						size="middle"
						defaultValue={[
							dayjs("0000-00-00 00:00 AM", `YYYY-MM-DD ${timeFormat}`),
							dayjs("0000-00-00 00:00 AM", `YYYY-MM-DD ${timeFormat}`),
						]}
						placeholder={["From", "To"]}
						changeOnBlur={false}
						format={`YYYY-MM-DD ${timeFormat}`}
						showTime={{ format: timeFormat }}
						style={{
							borderColor: "#0db284",
						}}
					/>
				</div>
				<div className="mb-[27px] flex w-[50%] flex-col gap-[8px]">
					<span className="text-[16px] font-[400] text-[#0000004d]">
						Purpose of Visit
					</span>
					<div className="flex flex-wrap gap-[15px]">
						<Select
							className="border-none"
							defaultValue="what"
							style={{ width: 180 }}
							onChange={handleChange}
							options={[{ value: "what", label: "What" }]}
						/>
						<Select
							className="border-none"
							defaultValue="who"
							style={{ width: 180 }}
							onChange={handleChange}
							options={[{ value: "who", label: "Who" }]}
						/>
						<Select
							className="border-none"
							defaultValue="when"
							style={{ width: 180 }}
							onChange={handleChange}
							options={[{ value: "when", label: "When" }]}
						/>
						<Select
							className="border-none"
							defaultValue="where"
							style={{ width: 180 }}
							onChange={handleChange}
							options={[{ value: "where", label: "Where" }]}
						/>
					</div>
				</div>
				<div className="mb-[5px] flex items-center gap-[13px] md:w-[44%] lg:w-[30%]">
					<Checkbox onChange={onChange}></Checkbox>
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
			</>
		);
	};

	return (
		<div className="flex w-full flex-col pb-[32px]">
			<Stepper progress={progress} setProgress={setProgress} />
			<div className="flex-start ml-[20px] mt-[25px] flex flex-col gap-[10px] md:ml-[30px] lg:ml-[182px]">
				<h1 className="font-700 mb-[10px] text-[38px] text-[#1B3B22]">
					Pre-Registration Form
				</h1>
				{progress === 1 ? (
					<StepOne />
				) : progress === 2 ? (
					<StepTwo
						visitorNo={visitorNo}
						visitors={visitors}
						setVisitors={setVisitors}
					/>
				) : (
					progress === 3 && <StepThree visitors={visitors} />
				)}
				<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end">
					{progress === 1 ? (
						<Button
							className="w-full bg-primary-500 lg:w-auto"
							type="primary"
							onClick={nextStep}
						>
							Next
						</Button>
					) : progress === 2 ? (
						<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
							<Button
								className="w-[inherit] bg-primary-500"
								type="primary"
								onClick={showModalPhoto}
							>
								Upload ID
							</Button>
							<Modal
								title={
									<>
										<span className="flex text-[25px] font-[700] text-[#2C4C32]">
											Check your photo
										</span>
										<span className="flex text-[14px] font-[400] text-[#2C4C32]">
											Make sure the lighting is good and any lettering is clean
											before continuing.
										</span>
									</>
								}
								width={1000}
								open={isPhotoOpen}
								onOk={handleOkPhoto}
								onCancel={handleCancelPhoto}
							>
								<Image.PreviewGroup>
									<div className="flex flex-col items-center justify-center gap-[65px]">
										<div className="flex flex-col gap-[65px] md:flex-row">
											<div className="flex flex-col items-center">
												<label className="label">
													<span className="label-text text-[16px] font-medium text-black">
														Front of ID
													</span>
												</label>
												<Image
													width={300}
													src="https://media.philstar.com/photos/2021/07/23/10_2021-07-23_18-27-24.jpg"
												/>
											</div>
											<div className="flex flex-col items-center">
												<label className="label">
													<span className="label-text text-[16px] font-medium text-black">
														Back of ID
													</span>
												</label>
												<Image
													width={300}
													src="https://s3-alpha-sig.figma.com/img/6541/e76f/4938b0155718de8af5610a0f82b07fc5?Expires=1696809600&Signature=g9ee7Y9K6izTlUfPBSWDgv2t9CilaBU3wsYb~xTBNwzFqBIgD~qDFl1WJms9oyFfyQXVxeFC5zydUUKHzBz-JaG~jZ31ambhXu9Gqte1D5vDh9x6WnZF8Kszq9IisRwRC1ytG02cYqFmIFpwLjb-hZ-JFXIWPbB~g-EA-pVFCSsElqjTHikVTTSSmEQiViHAXOSZo0OF3spgfGhfQhtobuWeryxKXlrr3Wu6CnxlIN0VGWKrCMzNH3qp6o99M8KZ4tkEsA8oFrhz~ijLF2GntP1DSBpZNm07wWoLJ2T1l7zSdqRJ5OOl4wiRucamxNbR8wnqPxjrKxrRGE7nJhAQ6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
												/>
											</div>
										</div>
										<div className="flex flex-col items-center">
											<label className="label">
												<span className="label-text text-[16px] font-medium text-black">
													Selfie with your ID
												</span>
											</label>
											<Image
												width={300}
												src="https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg"
											/>
										</div>
									</div>
								</Image.PreviewGroup>
							</Modal>
							<Button
								className="w-[inherit] bg-primary-500"
								type="primary"
								onClick={previousStep}
							>
								Previous
							</Button>
							<Button
								className="w-[inherit] bg-primary-500"
								type="primary"
								onClick={nextStep}
							>
								Next
							</Button>
						</div>
					) : (
						progress === 3 && (
							<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
								<Button
									className="w-[inherit] bg-primary-500"
									type="primary"
									onClick={previousStep}
								>
									Previous
								</Button>
								<Button className="w-[inherit] bg-primary-500" type="primary">
									Submit
								</Button>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
}
