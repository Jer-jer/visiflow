import React, {Dispatch, SetStateAction} from "react";

//Components
import { Table, Button } from "antd";

//Interfaces
import { GuardVisitorDataType } from "../../../utils/interfaces";
import type { ColumnsType } from "antd/es/table";

//Styles
import "./styles.scss";

interface VisitorFoundListProps {
	visitors: GuardVisitorDataType[];
    setFoundRecurring: Dispatch<SetStateAction<boolean>>;
    setRecurringVisitor: Dispatch<SetStateAction<GuardVisitorDataType | undefined>>
}

function VisitorFoundList({
	visitors,
	setFoundRecurring,
	setRecurringVisitor,
}: VisitorFoundListProps) {
	const openForm = (visitor: GuardVisitorDataType) => {
        setRecurringVisitor(visitor);
		setFoundRecurring(true);
	};

	const columns: ColumnsType<GuardVisitorDataType> = [
		{
			title: "Name",
			dataIndex: "visitor_details",
			sorter: (a, b) =>
				a.visitor_details.name.last_name.localeCompare(
					b.visitor_details.name.last_name,
				),
			render: (_, { visitor_details }) => {
				return `${visitor_details.name.last_name}, ${visitor_details.name.first_name} ${visitor_details.name.middle_name ? visitor_details.name.middle_name : ""}`;
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
			render: (_, { visitor_details }) => {
				return visitor_details.phone;
			},
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			render: (_, record) => (
				<Button type="primary" onClick={() => openForm(record)}>
					Proceed to Form
				</Button>
			),
		},
	];
	return (
		<Table
			className="mt-3"
			columns={columns}
			dataSource={visitors}
			pagination={{ pageSize: 5 }}
		/>
	);
}

export default VisitorFoundList;
