import React, { useState, useContext, createContext } from "react";
import { useSelector } from "react-redux";

//Interfaces
import { VisitorRecordContext } from "../../../layouts/admin/visitor-management/visitor-details";
import {
	VisitorDetailsProps,
	PurposeProps,
	VisitorDataType,
} from "../../../utils/interfaces";

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

export const CompanionRecord = createContext<VisitorDataType | undefined>(
	undefined,
);

export default function VisitorCompanionsList({
	search,
}: VisitorCompanionsProps) {
	const [openDetails, setOpenDetails] = useState(false);
	const [openLogs, setOpenLogs] = useState(false);
	const [companionId, setCompanionId] = useState("");
	const [companionRecord, setCompanionRecord] = useState<VisitorDataType>();
	const [companionLastname, setCompanionLastname] = useState("");
	const [companionPurpose, setCompanionPurpose] = useState<PurposeProps>();

	const { companions } = useSelector((state: RootState) => state.companions);

	// const companionDetails = companions.map(
	// 	(companion) => companion.visitor_details,
	// );

	const recordContext = useContext(VisitorRecordContext);

	const viewLogs = (lastName: string, id: string, purpose: PurposeProps) => {
		setCompanionLastname(lastName);
		setOpenLogs(!openLogs);
		setCompanionId(id);
		setCompanionPurpose(purpose);
	};

	const viewDetails = (record: VisitorDataType) => {
		setCompanionRecord(record);
		setCompanionId(record._id);
		setOpenDetails(!openDetails);
	};

	const columns: ColumnsType<VisitorDataType> = [
		{
			title: "ID",
			dataIndex: "_id",
			key: "_id",
			className: "hidden",
		},
		{
			title: "Name",
			key: "name",
			render: (_, { visitor_details }) => {
				return `${visitor_details.name.last_name}, ${visitor_details.name.first_name} ${visitor_details.name.middle_name ? visitor_details.name.middle_name : ""}`;
			},
			sorter: (a, b) =>
				a.visitor_details.name.last_name.localeCompare(
					b.visitor_details.name.last_name,
				),
		},
		{
			title: "Email",
			dataIndex: "companion_details",
			key: "email",
			render: (_, { visitor_details }) => {
				return visitor_details.email;
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
								record.visitor_details.name.last_name,
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
				dataSource={companions.filter((companion) => {
					return search.toLowerCase() === ""
						? companion
						: companion.visitor_details.name.first_name
								.toLowerCase()
								.includes(search.toLowerCase()) ||
								companion.visitor_details.name
									.middle_name!.toLowerCase()
									.includes(search.toLowerCase()) ||
								companion.visitor_details.name.last_name
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								`${companion.visitor_details.name.last_name} ${companion.visitor_details.name.first_name} ${companion.visitor_details.name.middle_name}`
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								`${companion.visitor_details.name.first_name}${
									companion.visitor_details.name.middle_name
										? ` ${companion.visitor_details.name.middle_name}`
										: ""
								} ${companion.visitor_details.name.last_name}`
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								companion.visitor_details.email.includes(search);
				})}
				pagination={{ pageSize: 5 }}
			/>
			<CompanionRecord.Provider value={companionRecord}>
				<VisitorCompanionsModal
					mainVisitorId={recordContext!._id}
					id={companionId}
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
