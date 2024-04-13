import React, { Dispatch, SetStateAction } from "react";

//Components
import { Table, Button } from "antd";

//Interfaces
import { VisitorDataType } from "../../utils/interfaces";
import type { ColumnsType } from "antd/es/table";

//Styles
import "./styles.scss";

interface VisitorFoundListProps {
	visitors: VisitorDataType[];
	setVisitorFound: Dispatch<SetStateAction<boolean>>;
	setVisitors: Dispatch<SetStateAction<VisitorDataType[]>>;
}

function VisitorFoundList({
	visitors,
	setVisitorFound,
	setVisitors,
}: VisitorFoundListProps) {
	const openForm = (visitor: VisitorDataType) => {
		setVisitors([visitor]);
		setVisitorFound(true);
	};

	const columns: ColumnsType<VisitorDataType> = [
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
			className="w-fit lg:w-[50%]"
			columns={columns}
			dataSource={visitors}
			pagination={{ pageSize: 5 }}
		/>
	);
}

export default VisitorFoundList;
