/* Components designed using Ant Design */

import React, { useState, Dispatch, SetStateAction } from "react";

//Interfaces
import { VisitorDetailsProps } from "../../../../utils/interfaces";

//Layouts
// import CompanionDetails from "./details";

//Components
import StandardModal from "../../../../components/modal";
import Label from "../../../../components/fields/input/label";
import Input from "../../../../components/fields/input/input";
import TextArea from "antd/es/input/TextArea";

//Styles
import "./styles.scss";

//Assets

interface VisitorCompanionsProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	emailInput: string | string[];
	companionRecords?: VisitorDetailsProps[];
	modalHeader: string;
	subject: string;
	message: string;
	disabled?: boolean;
	setVisitorMessage?: Dispatch<SetStateAction<string>>;
	onOk?: () => void;
}

export default function Notify({
	open,
	setOpen,
	emailInput,
	companionRecords,
	modalHeader,
	subject,
	message,
	disabled,
	setVisitorMessage,
	onOk,
}: VisitorCompanionsProps) {
	let ccArray: string[] = [];
	companionRecords?.map((item) => ccArray.push(item.email));

	let emailArray: string[] = [];
	let combinedEmails = "";

	if (typeof emailInput === "object") {
		emailArray = emailInput as string[];
		combinedEmails = emailArray.join(",");
	}

	const [email, setEmail] = useState(
		ccArray.length > 0
			? [emailInput, ccArray].join(", ")
			: (emailInput as string) || combinedEmails || "",
	);

	return (
		<StandardModal
			header={<span className="text-[22px] text-[#0C0D0D]">{modalHeader}</span>}
			open={open}
			setOpen={setOpen}
			someOkFunction={onOk}
		>
			<div className="mt-[20px] flex flex-col justify-between">
				<div className="mb-[20px] flex">
					<Label
						labelStyling="w-[16%]"
						spanStyling="text-black font-medium text-[16px]"
					>
						Email Address
					</Label>
					<Input
						inputType="text"
						inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-full"
						placeHolder="Email Address"
						input={email}
						setInput={setEmail}
						disabled
					/>
				</div>
				<div className="mb-[20px] flex">
					<Label
						labelStyling="w-[16%]"
						spanStyling="text-black font-medium text-[16px]"
					>
						Subject
					</Label>
					<Input
						inputType="text"
						inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-full"
						placeHolder="Email Address"
						input={subject}
						disabled
					/>
				</div>
				<div className="flex flex-col">
					<Label spanStyling="text-black font-medium text-[16px]">
						Message
					</Label>
					<TextArea
						className="input h-[38px] rounded-[5px] hover:border-transparent hover:bg-[#DFEAEF] focus:border-primary-500 focus:outline-none focus:ring-0"
						onChange={(e) =>
							setVisitorMessage && setVisitorMessage(e.target.value)
						}
						value={message}
						rows={4}
						disabled={disabled}
					/>
				</div>
			</div>
		</StandardModal>
	);
}
