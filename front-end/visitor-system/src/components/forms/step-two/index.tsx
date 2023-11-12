import React, { SetStateAction, Dispatch } from "react";

// Interfaces
import { VisitorData } from "../../../utils/interfaces";

// Components
import Form from "./form";
import { Tabs } from "antd";

// Utils

interface StepTwoProps {
	visitorNo: number;
	visitors: VisitorData[];
	setVisitors: Dispatch<SetStateAction<VisitorData[]>>;
}

export default function StepTwo({
	visitorNo,
	visitors,
	setVisitors,
}: StepTwoProps) {
	return (
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
						<Form
							visitorId={visitors[i].id}
							visitors={visitors}
							visitor={visitors[i].data}
							increment={i}
							setVisitors={setVisitors}
						/>
					),
				};
			})}
		/>
	);
}
