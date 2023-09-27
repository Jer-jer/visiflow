import React, { useState, useContext, createContext } from "react";

//Interfaces
import { VisitorCompanionsContext } from "../../../layouts/admin/visitor-details";

//Layouts
import VisitorCompanionsModal from "../../../layouts/admin/companion-details";
import CompanionLogs from "../../../layouts/admin/companion-logs";

//Components
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interface
import { VisitorDetailsProps } from "../../../utils";

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
	const companionsContext = useContext(VisitorCompanionsContext);

	const viewLogs = () => {
		setOpenLogs(!openLogs);
	};

	const viewDetails = (record: VisitorDetailsProps) => {
		setOpenDetails(!openDetails);
		setCompanionRecord(record);
	};

	const columns: ColumnsType<VisitorDetailsProps> = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			className: "hidden",
		},
		{
			title: "Name",
			dataIndex: "fullName",
			key: "fullName",
			render: (_, { fullName }) => {
				return `${fullName.lastName}, ${fullName.firstName} ${fullName.middleName}`;
			},
			sorter: (a, b) => a.fullName.lastName.localeCompare(b.fullName.lastName),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
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
