import React, { useState, SetStateAction, Dispatch } from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Components
import { Form } from "antd";

// Interfaces
import { VisitorData } from "../../../utils/interfaces";
import type { StepTwoData } from "../../../utils/zodSchemas";
import { StepTwoZod } from "../../../utils/zodSchemas";

// Components
import StepForm from "./form";
import { Tabs, Image, Button, Modal } from "antd";

interface StepTwoProps {
	setProgress: Dispatch<SetStateAction<number>>;
	visitorNo: number;
	visitors: VisitorData[];
	setVisitors: Dispatch<SetStateAction<VisitorData[]>>;
}

export default function StepTwo({
	setProgress,
	visitorNo,
	visitors,
	setVisitors,
}: StepTwoProps) {
	const [isPhotoOpen, setIsPhotoOpen] = useState(false);

	const StepTwoZodArray = z.array(StepTwoZod);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ resolver: zodResolver(StepTwoZod) });

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
		console.log(data);
		nextStep();
	});

	return (
		<Form name="Step One Form" onFinish={onSubmit} autoComplete="off">
			<Tabs
				className="w-[80%]"
				size="middle"
				style={{ marginBottom: 32 }}
				items={new Array(visitorNo).fill(null).map((_, i) => {
					const id = String(i + 1);
					return {
						label: `Visitor ${id}`,
						key: id,
						children: (
							<StepForm
								visitorId={visitors[i].id}
								visitors={visitors}
								visitor={visitors[i].data}
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
						htmlType="submit"
					>
						Next
					</Button>
				</div>
			</div>
		</Form>
	);
}
