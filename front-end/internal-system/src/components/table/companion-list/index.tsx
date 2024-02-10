import React, { useState, useContext, createContext } from "react";

//Interfaces
import { VisitorRecordContext } from "../../../layouts/admin/visitor-management/visitor-details";
import { VisitorDetailsProps } from "../../../utils/interfaces";

//Layouts
import VisitorCompanionsModal from "../../../layouts/admin/visitor-management/companion-details";
import CompanionLogs from "../../../layouts/admin/visitor-management/companion-logs";

//Components
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export const CompanionRecord = createContext<VisitorDetailsProps | undefined>(
	undefined,
);

export default function VisitorCompanionsList() {
	const [openDetails, setOpenDetails] = useState(false);
	const [openLogs, setOpenLogs] = useState(false);
	const [companionRecord, setCompanionRecord] = useState<VisitorDetailsProps>();

	const recordContext = useContext(VisitorRecordContext);

	const viewLogs = () => {
		setOpenLogs(!openLogs);
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
				return `${name.last_name}, ${name.first_name} ${name.middle_name}`;
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
				dataSource={recordContext!.companion_details}
				pagination={{ pageSize: 5 }}
			/>
			<CompanionRecord.Provider value={companionRecord}>
				<VisitorCompanionsModal
					mainVisitorId={recordContext!._id}
					open={openDetails}
					setOpen={setOpenDetails}
				/>
				<CompanionLogs open={openLogs} setOpen={setOpenLogs} />
			</CompanionRecord.Provider>
		</>
	);
}
