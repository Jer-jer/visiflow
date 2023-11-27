// import React, { useState } from "react";
// import { z } from "zod";

// // Components
// import { Button, Image, Modal, Form } from "antd";
// import Stepper from "../../components/stepper";
// import StepOne from "../../components/forms/step-one";
// import StepTwo from "../../components/forms/step-two";
// import StepThree from "../../components/forms/step-three";

// // Interfaces
// import { VisitorData } from "../../utils/interfaces";
// import { VisitorZod } from "../../utils/zodSchemas";

// // Styles
// import "./styles.scss";

// //TODO Integrate Zod to form

// type VisitorVal = z.infer<typeof VisitorZod>;

// type FieldType = {
// 	username?: string;
// 	password?: string;
// 	remember?: string;
// };

// export default function PreRegister() {
// 	const [progress, setProgress] = useState(1);
// 	const [visitorNo, setVisitorNo] = useState(1);
// 	const [visitors, setVisitors] = useState<VisitorData[]>([
// 		{
// 			id: 1,
// 			poi: "",
// 			checkInOut: [],
// 			purpose: "",
// 			data: {
// 				firstName: "",
// 				middleName: "",
// 				lastName: "",
// 				email: "",
// 				mobile: "",
// 				house: "",
// 				street: "",
// 				barangay: "",
// 				city: "",
// 				province: "",
// 				country: "",
// 			},
// 		},
// 	]);
// 	const [visitorForm] = Form.useForm();
// 	const [isPhotoOpen, setIsPhotoOpen] = useState(false);

// 	const showModalPhoto = () => {
// 		setIsPhotoOpen(true);
// 	};

// 	const handleOkPhoto = () => {
// 		setIsPhotoOpen(false);
// 	};

// 	const handleCancelPhoto = () => {
// 		setIsPhotoOpen(false);
// 	};

// 	const nextStep = () => {
// 		setProgress(progress + 1);
// 	};

// 	const previousStep = () => {
// 		setProgress(progress - 1);
// 	};

// 	const onFinish = (values: any) => {
// 		console.log("Success:", values);
// 	};

// 	const onReset = () => {
// 		visitorForm.resetFields();
// 	};

// 	const onFinishFailed = (errorInfo: any) => {
// 		console.log("Failed:", errorInfo);
// 	};

// 	return (
// 		<div className="flex w-full flex-col pb-[32px]">
// 			<Stepper progress={progress} setProgress={setProgress} />
// 			<Form
// 				name="Pre-Registration Form"
// 				form={visitorForm}
// 				onFinish={onFinish}
// 				onFinishFailed={onFinishFailed}
// 				autoComplete="off"
// 			>
// 				<div className="flex-start ml-[20px] mt-[25px] flex flex-col gap-[10px] md:ml-[30px] lg:ml-[182px]">
// 					<h1 className="font-700 mb-[10px] text-[38px] text-[#1B3B22]">
// 						Pre-Registration Form
// 					</h1>
// 					{progress === 1 ? (
// 						<StepOne
// 							visitorNo={visitorNo}
// 							visitors={visitors}
// 							setVisitorNo={setVisitorNo}
// 							setVisitors={setVisitors}
// 						/>
// 					) : progress === 2 ? (
// 						<StepTwo
// 							visitorNo={visitorNo}
// 							visitors={visitors}
// 							setVisitors={setVisitors}
// 						/>
// 					) : (
// 						progress === 3 && <StepThree visitors={visitors} />
// 					)}
// 					<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end">
// 						{progress === 1 ? (
// 							<Button
// 								className="w-full bg-primary-500 lg:w-auto"
// 								type="primary"
// 								onClick={nextStep}
// 							>
// 								Next
// 							</Button>
// 						) : progress === 2 ? (
// 							<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
// 								<Button
// 									className="w-[inherit] bg-primary-500"
// 									type="primary"
// 									onClick={showModalPhoto}
// 								>
// 									Upload ID
// 								</Button>
// 								<Modal
// 									title={
// 										<>
// 											<span className="flex text-[25px] font-[700] text-[#2C4C32]">
// 												Check your photo
// 											</span>
// 											<span className="flex text-[14px] font-[400] text-[#2C4C32]">
// 												Make sure the lighting is good and any lettering is
// 												clean before continuing.
// 											</span>
// 										</>
// 									}
// 									width={1000}
// 									open={isPhotoOpen}
// 									onOk={handleOkPhoto}
// 									onCancel={handleCancelPhoto}
// 								>
// 									<Image.PreviewGroup>
// 										<div className="flex flex-col items-center justify-center gap-[65px]">
// 											<div className="flex flex-col gap-[65px] md:flex-row">
// 												<div className="flex flex-col items-center">
// 													<label className="label">
// 														<span className="label-text text-[16px] font-medium text-black">
// 															Front of ID
// 														</span>
// 													</label>
// 													<Image
// 														width={300}
// 														src="https://media.philstar.com/photos/2021/07/23/10_2021-07-23_18-27-24.jpg"
// 													/>
// 												</div>
// 												<div className="flex flex-col items-center">
// 													<label className="label">
// 														<span className="label-text text-[16px] font-medium text-black">
// 															Back of ID
// 														</span>
// 													</label>
// 													<Image
// 														width={300}
// 														src="https://s3-alpha-sig.figma.com/img/6541/e76f/4938b0155718de8af5610a0f82b07fc5?Expires=1696809600&Signature=g9ee7Y9K6izTlUfPBSWDgv2t9CilaBU3wsYb~xTBNwzFqBIgD~qDFl1WJms9oyFfyQXVxeFC5zydUUKHzBz-JaG~jZ31ambhXu9Gqte1D5vDh9x6WnZF8Kszq9IisRwRC1ytG02cYqFmIFpwLjb-hZ-JFXIWPbB~g-EA-pVFCSsElqjTHikVTTSSmEQiViHAXOSZo0OF3spgfGhfQhtobuWeryxKXlrr3Wu6CnxlIN0VGWKrCMzNH3qp6o99M8KZ4tkEsA8oFrhz~ijLF2GntP1DSBpZNm07wWoLJ2T1l7zSdqRJ5OOl4wiRucamxNbR8wnqPxjrKxrRGE7nJhAQ6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
// 													/>
// 												</div>
// 											</div>
// 											<div className="flex flex-col items-center">
// 												<label className="label">
// 													<span className="label-text text-[16px] font-medium text-black">
// 														Selfie with your ID
// 													</span>
// 												</label>
// 												<Image
// 													width={300}
// 													src="https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg"
// 												/>
// 											</div>
// 										</div>
// 									</Image.PreviewGroup>
// 								</Modal>
// 								<Button
// 									className="w-[inherit] bg-primary-500"
// 									type="primary"
// 									onClick={previousStep}
// 								>
// 									Previous
// 								</Button>
// 								<Button
// 									className="w-[inherit] bg-primary-500"
// 									type="primary"
// 									onClick={nextStep}
// 								>
// 									Next
// 								</Button>
// 							</div>
// 						) : (
// 							progress === 3 && (
// 								<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
// 									<Button
// 										className="w-[inherit] bg-primary-500"
// 										type="primary"
// 										onClick={previousStep}
// 									>
// 										Previous
// 									</Button>
// 									<Form.Item>
// 										<Button
// 											className="w-[inherit] bg-primary-500"
// 											type="primary"
// 											htmlType="submit"
// 										>
// 											Submit
// 										</Button>
// 									</Form.Item>
// 								</div>
// 							)
// 						)}
// 					</div>
// 				</div>
// 			</Form>
// 		</div>
// 	);
// }
