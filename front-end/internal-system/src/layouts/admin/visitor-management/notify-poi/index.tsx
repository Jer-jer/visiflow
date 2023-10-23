/* Components designed using Ant Design */

import React, { useState, Dispatch, SetStateAction } from "react";

//Interfaces
import { VisitorDetailsProps } from "../../../../utils";

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
	emailInput?: string;
	companionRecords?: VisitorDetailsProps[];
}

export default function NotifyPOI({
	open,
	setOpen,
	emailInput,
	companionRecords,
}: VisitorCompanionsProps) {
	let emailArray: any = [];
	companionRecords?.map((item) => emailArray.push(item.email));
	const combinedEmail = emailArray.join(",");

	const [email, setEmail] = useState(emailInput || "");
	const [cc, setCC] = useState(combinedEmail || "");
	const [subject, setSubject] = useState("Pre-Registration Request");
	const [disabledInputs, setDisabledInputs] = useState<boolean>(false);

	return (
		<StandardModal
			header="Notify Person of Interest"
			open={open}
			setOpen={setOpen}
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
						disabled={disabledInputs}
					/>
				</div>
				<div className="mb-[20px] flex">
					<Label
						labelStyling="w-[16%]"
						spanStyling="text-black font-medium text-[16px]"
					>
						CC
					</Label>
					<Input
						inputType="text"
						inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 w-full"
						placeHolder="CC"
						input={cc}
						setInput={setCC}
						disabled={disabledInputs}
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
						setInput={setSubject}
						disabled={true}
					/>
				</div>
				<div className="flex flex-col">
					<Label spanStyling="text-black font-medium text-[16px]">
						Message
					</Label>
					<TextArea
						className="input h-[38px] rounded-[5px] hover:border-transparent focus:border-primary-500 focus:outline-none focus:ring-0"
						rows={4}
					/>
				</div>
			</div>
		</StandardModal>
	);
}
