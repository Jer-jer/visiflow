import React, { useState, useContext, createContext } from "react";

//Interfaces
import { VisitorCompanionsContext } from "../../../layouts/admin/visitor-management/visitor-details";
import {
	VisitorDetailsProps,
	CompanionDetailsProps,
} from "../../../utils/interfaces";

//Layouts
import VisitorCompanionsModal from "../../../layouts/admin/visitor-management/companion-details";
import CompanionLogs from "../../../layouts/admin/visitor-management/companion-logs";

//Components
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export const CompanionRecord = createContext<CompanionDetailsProps | undefined>(
	undefined,
);

export default function VisitorCompanionsList() {
	const [openDetails, setOpenDetails] = useState(false);
	const [openLogs, setOpenLogs] = useState(false);
	const [companionRecord, setCompanionRecord] =
		useState<CompanionDetailsProps>();
	const companionsContext = useContext(VisitorCompanionsContext);

	const viewLogs = () => {
		setOpenLogs(!openLogs);
	};

	const viewDetails = (record: CompanionDetailsProps) => {
		setOpenDetails(!openDetails);
		setCompanionRecord(record);
	};

	const columns: ColumnsType<CompanionDetailsProps> = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			className: "hidden",
		},
		{
			title: "Name",
			dataIndex: "companion_details",
			key: "fullName",
			render: (_, { companion_details }) => {
				return `${companion_details.fullName.last_name}, ${companion_details.fullName.first_name} ${companion_details.fullName.middle_name}`;
			},
			sorter: (a, b) =>
				a.companion_details.fullName.last_name.localeCompare(
					b.companion_details.fullName.last_name,
				),
		},
		{
			title: "Email",
			dataIndex: "companion_details",
			key: "email",
			render: (_, { companion_details }) => {
				return companion_details.email;
			},
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<div className="flex gap-[10px]">
					<Button onClick={viewLogs}>View Logs</Button>
					<Button onClick={() => viewDetails(record)}>View Details</Button>
				</div>
			),
		},
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={companionsContext}
				pagination={{ pageSize: 5 }}
			/>
			<CompanionRecord.Provider value={companionRecord}>
				<VisitorCompanionsModal open={openDetails} setOpen={setOpenDetails} />
				<CompanionLogs open={openLogs} setOpen={setOpenLogs} />
			</CompanionRecord.Provider>
		</>
	);
}
