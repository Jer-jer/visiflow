import React, { Dispatch, SetStateAction } from "react";

// Interfaces
import { VisitorInput, VisitorData } from "../../../utils/interfaces";

// Components
import { Tabs, Divider, Button } from "antd";

interface StepThreeProps {
	setProgress: Dispatch<SetStateAction<number>>;
	visitors: VisitorData;
}

interface ConfirmFormProps {
	visitor: VisitorInput;
}

export default function StepThree({ setProgress, visitors }: StepThreeProps) {
	const previousStep = () => {
		setProgress((prev) => prev - 1);
	};

	const ConfirmForm = ({ visitor }: ConfirmFormProps) => {
		return (
			<div className="flex flex-col">
				<div className="flex flex-col gap-x-[5%] gap-y-[0.8em] lg:flex-row lg:flex-wrap">
					<div className="flex items-center gap-[3%] lg:w-[25%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							First Name:
						</label>
						<span className="text-[1.15rem]">{visitor.firstName}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[30%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Middle Name:
						</label>
						<span className="text-[1.15rem]">{visitor.middleName}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[35%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Last Name:
						</label>
						<span className="text-[1.15rem]">{visitor.lastName}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[40%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Email Address:
						</label>
						<span className="text-[1.15rem]">{visitor.email}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[40%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Mobile Number:
						</label>
						<span className="text-[1.15rem]">{visitor.mobile}</span>
					</div>
				</div>
				<Divider className="border border-[#00000030]" /> {/* Divider */}
				<div className="flex flex-col gap-x-[5%] gap-y-[0.8em] lg:flex-row lg:flex-wrap">
					<div className="flex items-center gap-[3%] lg:w-[28%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							House No.:
						</label>
						<span className="text-[1.15rem]">{visitor.house}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[28%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Street:
						</label>
						<span className="text-[1.15rem]">{visitor.street}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[28%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Barangay:
						</label>
						<span className="text-[1.15rem]">{visitor.barangay}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[28%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							City:
						</label>
						<span className="text-[1.15rem]">{visitor.city}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[28%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Province:
						</label>
						<span className="text-[1.15rem]">{visitor.province}</span>
					</div>
					<div className="flex items-center gap-[3%] lg:w-[28%]">
						<label className="text-[1.15rem] font-[400] text-[#0000004d]">
							Country:
						</label>
						<span className="text-[1.15rem]">{visitor.country}</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<Tabs
				className="w-[80%]"
				defaultActiveKey="1"
				size="middle"
				style={{ marginBottom: 32 }}
				items={visitors.data.map((visitor, key) => {
					return {
						label: `Visitor ${key + 1}`,
						key: key.toString(),
						children: <ConfirmForm visitor={visitor} />,
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
		</>
	);
}
