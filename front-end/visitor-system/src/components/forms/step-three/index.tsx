import React from "react";

// Interfaces
import { VisitorInput, VisitorData } from "../../../utils/interfaces";

// Components
import { Tabs, Divider } from "antd";

interface StepThreeProps {
	visitors: VisitorData[];
}

interface ConfirmFormProps {
	visitor: VisitorInput;
}

export default function StepThree({ visitors }: StepThreeProps) {
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
				items={visitors.map((visitor, key) => {
					return {
						label: `Visitor ${key + 1}`,
						key: key.toString(),
						children: <ConfirmForm visitor={visitor.data} />,
					};
				})}
			/>
		</>
	);
}
