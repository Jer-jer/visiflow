import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

// Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
import { VisitorStatus, VisitorType } from "../../../utils/enums";

// Components
import { Tabs, Divider, Button, Form, Modal } from "antd";

// Utils
import { mainOrCompanion } from "../../../utils";

// Assets
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";

// Lib
import AxiosInstace from "../../../lib/axios";

interface StepThreeProps {
	visitorNo: number;
	visitors: VisitorDataType;
	setProgress: Dispatch<SetStateAction<number>>;
}

interface ConfirmFormProps {
	visitors: VisitorDataType;
	increment: number;
}

const { confirm } = Modal;

export default function StepThree({
	setProgress,
	visitors,
	visitorNo,
}: StepThreeProps) {
	const [loading, setLoading] = useState(false);

	//TODO Create a validation that would make sure the companions (if there are any) are filled
	const [modal, contextHolder] = Modal.useModal();

	const { handleSubmit } = useForm({
		defaultValues: {
			visitor_details: visitors.visitor_details,
			companion_details: visitors.companions_details,
			expected_time_in: visitors.expected_time_in,
			expected_time_out: visitors.expected_time_out,
			purpose: visitors.purpose,
			plate_num: null,
			id_picture: visitors.id_picture,
			status: VisitorStatus.InProgress,
			visitor_type: VisitorType.PreRegistered,
		},
	});

	const showConfirm = (data: any) => {
		confirm({
			title: "Do you want to proceed?",
			icon: <ExclamationCircleFilled />,
			onOk() {
				setLoading(true);
				AxiosInstace.post("/visitor/new", {
					visitor_data: data,
				})
					.then((res: any) => {
						setLoading(false);
						successMessage(res.data.message);
					})
					.catch((err: any) => {
						setLoading(false);
						if (err.response) {
							error(
								err.response.data.error ||
									err.response.data.errors ||
									err.response.errors,
							);
						} else {
							error("Something went wrong.");
						}
					});
			},
		});
	};

	const successMessage = (message: string) => {
		let secondsToGo = 8;

		const instance = modal.success({
			title: message,
			content: `Please wait for email confirmation. 
			This form will close after ${secondsToGo} second.`,
			onOk() {
				clearInterval(timer);
				window.location.reload();
			},
		});

		const timer = setInterval(() => {
			secondsToGo -= 1;
			instance.update({
				content: `Please wait for email confirmation. 
			This form will close after ${secondsToGo} second.`,
			});
		}, 1000);

		setTimeout(() => {
			clearInterval(timer);
			instance.destroy();
			window.location.reload();
		}, secondsToGo * 1000);
	};

	const error = (message: string) => {
		Modal.error({
			title: `Error`,
			content: message,
		});
	};

	const previousStep = () => {
		setProgress((prev) => prev - 1);
	};

	const onSubmit = handleSubmit((data) => {
		showConfirm(data);
	});

	const ConfirmForm = ({ visitors, increment }: ConfirmFormProps) => {
		return (
			<>
				{loading && (
					<div className="absolute left-[50%]">
						<div className="relative left-[-50%]">
							<LoadingOutlined className="text-[128px] text-primary-500" />
						</div>
					</div>
				)}
				<div className="flex flex-col">
					<div className="flex flex-col gap-x-[5%] gap-y-[0.8em] lg:flex-row lg:flex-wrap">
						<div className="flex items-center gap-[3%] lg:w-[25%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								First Name:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).name.first_name
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[30%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Middle Name:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).name.middle_name
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[35%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Last Name:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).name.last_name
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[40%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Email Address:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).email
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[40%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Mobile Number:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).phone
								}
							</span>
						</div>
					</div>
					<Divider className="border border-[#00000030]" /> {/* Divider */}
					<div className="flex flex-col gap-x-[5%] gap-y-[0.8em] lg:flex-row lg:flex-wrap">
						<div className="flex items-center gap-[3%] lg:w-[28%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								House No.:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).address.house
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[28%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Street:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).address.street
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[28%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Barangay:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).address.brgy
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[28%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								City:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).address.city
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[28%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Province:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).address.province
								}
							</span>
						</div>
						<div className="flex items-center gap-[3%] lg:w-[28%]">
							<label className="text-[1.15rem] font-[400] text-[#0000004d]">
								Country:
							</label>
							<span className="text-[1.15rem]">
								{
									mainOrCompanion(
										increment,
										visitors.visitor_details,
										visitors.companions_details!,
									).address.country
								}
							</span>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			{contextHolder}
			<Form name="Step Three Form" onFinish={onSubmit} autoComplete="off">
				<Tabs
					className="w-[80%]"
					defaultActiveKey="1"
					size="middle"
					style={{ marginBottom: 32 }}
					items={new Array(visitorNo).fill(null).map((_, i) => {
						const id = String(i + 1);
						return {
							label: `Visitor ${id}`,
							key: id,
							children: <ConfirmForm increment={i} visitors={visitors} />,
						};
					})}
				/>
				<div className="mr-[30px] flex items-center justify-center gap-2 lg:mr-0 lg:w-[80%] lg:justify-end">
					<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
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
							Submit
						</Button>
					</div>
				</div>
			</Form>
		</>
	);
}
