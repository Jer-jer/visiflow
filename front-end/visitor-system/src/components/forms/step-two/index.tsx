import React, {
	useState,
	SetStateAction,
	Dispatch,
	useRef,
	useCallback,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { isMobile } from "react-device-detect";

// Components
import { Form, Tabs, Image, Button, Modal, Tooltip } from "antd";

// Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
import { StepTwoData, StepTwoZod } from "../../../utils/zodSchemas";

// Components
import StepForm from "./form";

// Utils
import { tabName } from "../../../utils";

// Assets

// Styles
import "./styles.scss";

interface StepTwoProps {
	setProgress: Dispatch<SetStateAction<number>>;
	visitorNo: number;
	visitors: VisitorDataType;
	setVisitors: Dispatch<SetStateAction<VisitorDataType>>;
}

export default function StepTwo({
	setProgress,
	visitorNo,
	visitors,
	setVisitors,
}: StepTwoProps) {
	const [isPhotoOpen, setIsPhotoOpen] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<StepTwoData>({
		resolver: zodResolver(StepTwoZod),
		defaultValues: {
			front: visitors.id_picture.front,
			back: visitors.id_picture.back,
			selfie: visitors.id_picture.selfie,
		},
	});

	// Image Data Stuff
	const webcamRef = useRef<Webcam>(null);
	const [takeFrontImage, setTakeFrontImage] = useState(false);
	const [takeBackImage, setTakeBackImage] = useState(false);
	const [takeSelfieImage, setTakeSelfieImage] = useState(false);

	const selfieMode = {
		facingMode: "user",
	};

	const outMode = {
		facingMode: { exact: "environment" },
	};

	const capture = useCallback(
		(property: string) => {
			const imageSrc = webcamRef.current!.getScreenshot();

			switch (property) {
				case "front":
					setVisitors((prev) => ({
						...prev,
						id_picture: { ...prev.id_picture, front: imageSrc as string },
					}));
					setValue("front", imageSrc as string);
					break;
				case "back":
					setVisitors((prev) => ({
						...prev,
						id_picture: { ...prev.id_picture, back: imageSrc as string },
					}));
					setValue("back", imageSrc as string);
					break;
				case "selfie":
					setVisitors((prev) => ({
						...prev,
						id_picture: { ...prev.id_picture, selfie: imageSrc as string },
					}));
					setValue("selfie", imageSrc as string);
					break;
			}
		},
		[webcamRef],
	);

	const handleOkPhoto = () => {
		setIsPhotoOpen(false);
	};

	const handleCancelPhoto = () => {
		setIsPhotoOpen(false);
	};

	const showModalPhoto = () => {
		setIsPhotoOpen(true);
	};

	const previousStep = () => {
		setProgress((prev) => prev - 1);
	};

	const nextStep = () => {
		setProgress((prev) => prev + 1);
	};

	const onSubmit = handleSubmit((data) => {
		nextStep();
	});

	return (
		<Form name="Step Two Form" onFinish={onSubmit} autoComplete="off">
			<Tabs
				className="w-[80%]"
				size="middle"
				style={{ marginBottom: 32 }}
				items={new Array(visitorNo).fill(null).map((_, i) => {
					const id = String(i + 1);
					return {
						label: tabName(id),
						key: id,
						children: (
							<StepForm
								mainVisitor={visitors.visitor_details} //? Main Visitor Information
								companions={visitors.companions_details!} //? Companions Visitor Information
								increment={i}
								errors={errors}
								register={register}
								setValue={setValue}
								setVisitors={setVisitors}
							/>
						),
					};
				})}
			/>
			<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end">
				<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
					{errors?.front && errors.back && errors.selfie ? (
						<Tooltip title="Required ID Upload">
							<Button
								className={`w-[inherit] ${
									errors.front && errors.back && errors.selfie
										? "!bg-error"
										: "!bg-primary-500"
								}`}
								type="primary"
								onClick={showModalPhoto}
							>
								Upload ID
							</Button>
						</Tooltip>
					) : (
						<Button
							className="!bg-primary-500"
							type="primary"
							onClick={showModalPhoto}
						>
							Upload ID
						</Button>
					)}

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
						width={1250}
						open={isPhotoOpen}
						onOk={handleOkPhoto}
						onCancel={handleCancelPhoto}
					>
						<Image.PreviewGroup>
							<div className="flex flex-col items-center justify-center gap-[65px]">
								<div className="flex flex-col gap-[65px] md:flex-row">
									{!takeBackImage && !takeSelfieImage && (
										<div className="flex flex-col items-center">
											<label className="label">
												<span className="label-text text-[16px] font-medium text-black">
													Front of ID
												</span>
											</label>
											<div className="mx-auto max-w-xs">
												{takeFrontImage ? (
													<>
														{visitors.id_picture.front !== "" ? (
															<>
																<Image
																	width={300}
																	src={visitors.id_picture.front}
																/>
																<div className="flex justify-between">
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => {
																			setTakeFrontImage(true);
																			setVisitors((prev) => ({
																				...prev,
																				id_picture: {
																					...prev.id_picture,
																					front: "",
																				},
																			}));
																		}}
																	>
																		Retake Photo
																	</Button>
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => setTakeFrontImage(false)}
																	>
																		Ok
																	</Button>
																</div>
															</>
														) : (
															<>
																<Webcam
																	height={300}
																	width={300}
																	ref={webcamRef}
																	screenshotFormat="image/jpeg"
																	videoConstraints={
																		isMobile ? outMode : selfieMode
																	}
																/>
																<div className="flex justify-between">
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => capture("front")}
																	>
																		Capture photo
																	</Button>
																	<Button
																		className="w-[inherit] bg-error"
																		type="primary"
																		onClick={() => setTakeFrontImage(false)}
																	>
																		Cancel
																	</Button>
																</div>
															</>
														)}
													</>
												) : (
													<>
														{visitors.id_picture.front && (
															<Image
																width={300}
																src={visitors.id_picture.front}
															/>
														)}
														<Button
															className="w-[inherit] bg-primary-500"
															type="primary"
															onClick={() => setTakeFrontImage(true)}
														>
															Take Photo
														</Button>
													</>
												)}

												{errors?.front && (
													<p className="mt-1 text-sm text-red-500">
														{errors.front?.message}
													</p>
												)}
											</div>
										</div>
									)}
									{!takeFrontImage && !takeSelfieImage && (
										<div className="flex flex-col items-center">
											<label className="label">
												<span className="label-text text-[16px] font-medium text-black">
													Back of ID
												</span>
											</label>
											<div className="mx-auto max-w-xs">
												{takeBackImage ? (
													<>
														{visitors.id_picture.back !== "" ? (
															<>
																<Image
																	width={300}
																	src={visitors.id_picture.back}
																/>
																<div className="flex justify-between">
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => {
																			setTakeBackImage(true);
																			setVisitors((prev) => ({
																				...prev,
																				id_picture: {
																					...prev.id_picture,
																					back: "",
																				},
																			}));
																		}}
																	>
																		Retake Photo
																	</Button>
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => setTakeBackImage(false)}
																	>
																		Ok
																	</Button>
																</div>
															</>
														) : (
															<>
																<Webcam
																	height={300}
																	width={300}
																	ref={webcamRef}
																	screenshotFormat="image/jpeg"
																	videoConstraints={
																		isMobile ? outMode : selfieMode
																	}
																/>
																<div className="flex justify-between">
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => capture("back")}
																	>
																		Capture photo
																	</Button>
																	<Button
																		className="w-[inherit] bg-error"
																		type="primary"
																		onClick={() => setTakeBackImage(false)}
																	>
																		Cancel
																	</Button>
																</div>
															</>
														)}
													</>
												) : (
													<>
														{visitors.id_picture.back && (
															<Image
																width={300}
																src={visitors.id_picture.back}
															/>
														)}
														<Button
															className="w-[inherit] bg-primary-500"
															type="primary"
															onClick={() => setTakeBackImage(true)}
														>
															Take Photo
														</Button>
													</>
												)}
												{errors?.back && (
													<p className="mt-1 text-sm text-red-500">
														{errors.back?.message}
													</p>
												)}
											</div>
										</div>
									)}
									{!takeFrontImage && !takeBackImage && (
										<div className="flex flex-col items-center">
											<label className="label">
												<span className="label-text text-[16px] font-medium text-black">
													Selfie with your ID
												</span>
											</label>
											<div className="mx-auto max-w-xs">
												{takeSelfieImage ? (
													<>
														{visitors.id_picture.selfie !== "" ? (
															<>
																<Image
																	width={300}
																	src={visitors.id_picture.selfie}
																/>
																<div className="flex justify-between">
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => {
																			setTakeSelfieImage(true);
																			setVisitors((prev) => ({
																				...prev,
																				id_picture: {
																					...prev.id_picture,
																					selfie: "",
																				},
																			}));
																		}}
																	>
																		Retake Photo
																	</Button>
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => setTakeSelfieImage(false)}
																	>
																		Ok
																	</Button>
																</div>
															</>
														) : (
															<>
																<Webcam
																	height={300}
																	width={300}
																	ref={webcamRef}
																	screenshotFormat="image/jpeg"
																	videoConstraints={selfieMode}
																/>
																<div className="flex justify-between">
																	<Button
																		className="w-[inherit] bg-primary-500"
																		type="primary"
																		onClick={() => capture("selfie")}
																	>
																		Capture photo
																	</Button>
																	<Button
																		className="w-[inherit] bg-error"
																		type="primary"
																		onClick={() => setTakeSelfieImage(false)}
																	>
																		Cancel
																	</Button>
																</div>
															</>
														)}
													</>
												) : (
													<>
														{visitors.id_picture.selfie && (
															<Image
																width={300}
																src={visitors.id_picture.selfie}
															/>
														)}
														<Button
															className="w-[inherit] bg-primary-500"
															type="primary"
															onClick={() => setTakeSelfieImage(true)}
														>
															Take Photo
														</Button>
													</>
												)}
												{errors?.selfie && (
													<p className="mt-1 text-sm text-red-500">
														{errors.selfie?.message}
													</p>
												)}
											</div>
										</div>
									)}
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
						htmlType="submit"
					>
						Next
					</Button>
				</div>
			</div>
		</Form>
	);
}
