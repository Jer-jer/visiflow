import React, { useState, useContext, createContext } from "react";
import { useSelector } from "react-redux";

//Interfaces
import { VisitorRecordContext } from "../../../layouts/admin/visitor-management/visitor-details";
import { VisitorDetailsProps, PurposeProps } from "../../../utils/interfaces";

//Layouts
import VisitorCompanionsModal from "../../../layouts/admin/visitor-management/companion-details";
import CompanionLogs from "../../../layouts/admin/visitor-management/companion-logs";

//Components
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

//Store
import { RootState } from "../../../store";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface VisitorCompanionsProps {
	search: string;
}

export const CompanionRecord = createContext<VisitorDetailsProps | undefined>(
	undefined,
);

export default function VisitorCompanionsList({
	search,
}: VisitorCompanionsProps) {
	const [openDetails, setOpenDetails] = useState(false);
	const [openLogs, setOpenLogs] = useState(false);
	const [companionRecord, setCompanionRecord] = useState<VisitorDetailsProps>();
	const [companionLastname, setCompanionLastname] = useState("");
	const [companionId, setCompanionId] = useState("");
	const [companionPurpose, setCompanionPurpose] = useState<PurposeProps>();

	const { companions } = useSelector((state: RootState) => state.companions);

	const companionDetails = companions.map(
		(companion) => companion.visitor_details,
	);

	const recordContext = useContext(VisitorRecordContext);

	const viewLogs = (lastName: string, id: string, purpose: PurposeProps) => {
		setCompanionLastname(lastName);
		setOpenLogs(!openLogs);
		setCompanionId(id);
		setCompanionPurpose(purpose);
	};

	const viewDetails = (record: VisitorDetailsProps) => {
		setCompanionRecord(record);
		setOpenDetails(!openDetails);
	};

	const columns: ColumnsType<VisitorDetailsProps> = [
		{
			title: "ID",
			dataIndex: "_id",
			key: "_id",
			className: "hidden",
		},
		{
			title: "Name",
			key: "name",
			render: (_, { name }) => {
				return `${name.last_name}, ${name.first_name} ${name.middle_name ? name.middle_name : ""}`;
			},
			sorter: (a, b) => a.name.last_name.localeCompare(b.name.last_name),
		},
		{
			title: "Email",
			dataIndex: "companion_details",
			key: "email",
			render: (_, { email }) => {
				return email;
			},
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<div className="flex gap-[10px]">
					<Button
						onClick={() =>
							viewLogs(
								record.name.last_name,
								record._id,
								recordContext!.purpose,
							)
						}
					>
						View Logs
					</Button>
					<Button onClick={() => viewDetails(record)}>View Details</Button>
				</div>
			),
		},
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={companionDetails.filter((companion) => {
					return search.toLowerCase() === ""
						? companion
						: companion.name.first_name
								.toLowerCase()
								.includes(search.toLowerCase()) ||
								companion.name
									.middle_name!.toLowerCase()
									.includes(search.toLowerCase()) ||
								companion.name.last_name
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								`${companion.name.last_name} ${companion.name.first_name} ${companion.name.middle_name}`
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								`${companion.name.first_name}${
									companion.name.middle_name
										? ` ${companion.name.middle_name}`
										: ""
								} ${companion.name.last_name}`
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								companion.email.includes(search);
				})}
				// dataSource={recordContext!.companion_details!.filter((companion) => {
				// 	return search.toLowerCase() === ""
				// 		? companion
				// 		: companion.name.first_name
				// 				.toLowerCase()
				// 				.includes(search.toLowerCase()) ||
				// 				companion.name
				// 					.middle_name!.toLowerCase()
				// 					.includes(search.toLowerCase()) ||
				// 				companion.name.last_name
				// 					.toLowerCase()
				// 					.includes(search.toLowerCase()) ||
				// 				`${companion.name.last_name} ${companion.name.first_name} ${companion.name.middle_name}`
				// 					.toLowerCase()
				// 					.includes(search.toLowerCase()) ||
				// 				`${companion.name.first_name}${
				// 					companion.name.middle_name
				// 						? ` ${companion.name.middle_name}`
				// 						: ""
				// 				} ${companion.name.last_name}`
				// 					.toLowerCase()
				// 					.includes(search.toLowerCase()) ||
				// 				companion.email.includes(search);
				// })}
				pagination={{ pageSize: 5 }}
			/>
			<CompanionRecord.Provider value={companionRecord}>
				<VisitorCompanionsModal
					mainVisitorId={recordContext!._id}
					open={openDetails}
					setOpen={setOpenDetails}
				/>
				<CompanionLogs
					open={openLogs}
					setOpen={setOpenLogs}
					lastname={companionLastname}
					companionId={companionId}
					purpose={companionPurpose}
				/>
			</CompanionRecord.Provider>
		</>
	);
}
