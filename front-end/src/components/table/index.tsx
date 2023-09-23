/* Built using Ant Design */
import React from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

//Interfaces
import { VisitorDataType, VisitorDetailsProps } from "../../utils";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface AdminTableProps {
	addTab: (record: VisitorDetailsProps) => void;
}

const onChange: TableProps<VisitorDataType>["onChange"] = (
	pagination: any,
	filters: any,
	sorter: any,
	extra: any,
) => {
	console.log("params", pagination, filters, sorter, extra);
};

export default function AdminTable({ addTab }: AdminTableProps) {
	const data: VisitorDataType[] = [
		{
			key: 1,
			id: "UVG4827",
			visitorDetails: {
				fullName: {
					firstName: "Juan",
					middleName: "Dela Cruz",
					lastName: "Garcia",
				},
				mobile: "0912-345-6789",
				email: "juan.garcia@example.com",
				houseNo: "123",
				city: "Manila",
				street: "Escolta Street",
				province: "Metro Manila",
				brgy: "Binondo",
				country: "Philippines",
				timeIn: "2023-09-01 09:00 AM",
				timeOut: "2023-09-01 04:30 PM",
			},

			visitorType: "Walk-in",
			date: "10-04-2023 4:50 AM",
		},
		{
			key: 2,
			id: "UVG9175",
			visitorDetails: {
				fullName: {
					firstName: "Maria",
					middleName: "Santos",
					lastName: "Fernandez",
				},
				mobile: "0922-987-6543",
				email: "maria.fernandez@example.com",
				houseNo: "456",
				city: "Cebu City",
				street: "Mango Avenue",
				province: "Cebu",
				brgy: "Downtown",
				country: "Philippines",
				timeIn: "2023-09-02 10:30 AM",
				timeOut: "2023-09-02 05:45 PM",
			},
			visitorType: "Pre-Registered",
			date: "11-20-2023 8:25 PM",
		},
		{
			key: 3,
			id: "UVG3268",
			visitorDetails: {
				fullName: {
					firstName: "Andres",
					middleName: "Bonifacio",
					lastName: "Luna",
				},
				mobile: "0933-555-8888",
				email: "andres.luna@example.com",
				city: "Quezon City",
				province: "Metro Manila",
				brgy: "Cubao",
				timeIn: "2023-09-03 11:15 AM",
				timeOut: "2023-09-03 06:00 PM",
			},
			visitorType: "Pre-Registered",
			date: "10-08-2023 11:40 AM",
		},
		{
			key: 4,
			id: "UVG5902",
			visitorDetails: {
				fullName: {
					firstName: "Emilio",
					middleName: "Aguinaldo",
					lastName: "Rizal",
				},
				mobile: "0917-123-4567",
				email: "emilio.rizal@example.com",
				houseNo: "789",
				city: "Baguio City",
				street: "Session Road",
				province: "Benguet",
				brgy: "Downtown",
				country: "Philippines",
				timeIn: "2023-09-04 09:30 AM",
				timeOut: "2023-09-04 03:45 PM",
			},
			visitorType: "Walk-in",
			date: "12-01-2023 7:55 PM",
		},
		{
			key: 5,
			id: "UVG8741",
			visitorDetails: {
				fullName: {
					firstName: "Mariano",
					middleName: "Ponce",
					lastName: "Lopez",
				},
				mobile: "0945-678-9012",
				email: "mariano.lopez@example.com",
				city: "Davao City",
				province: "Davao del Sur",
				brgy: "Downtown",
				timeIn: "2023-09-05 10:00 AM",
				timeOut: "2023-09-05 04:15 PM",
			},
			visitorType: "Pre-Registered",
			date: "11-12-2023 3:10 AM",
		},
		{
			key: 6,
			id: "UVG1359",
			visitorDetails: {
				fullName: {
					firstName: "Apolinario",
					middleName: "Mabini",
					lastName: "Magsaysay",
				},
				mobile: "0955-432-1098",
				email: "apolinario.magsaysay@example.com",
				city: "Bacolod City",
				province: "Negros Occidental",
				brgy: "Downtown",
				timeIn: "2023-09-06 08:45 AM",
				timeOut: "2023-09-06 03:30 PM",
			},
			visitorType: "Walk-in",
			date: "09-30-2023 1:20 AM",
		},
		{
			key: 7,
			id: "UVG7624",
			visitorDetails: {
				fullName: {
					firstName: "Melchora",
					middleName: "Aquila",
					lastName: "Lakandula",
				},
				mobile: "0932-876-5432",
				email: "melchora.lakandula@example.com",
				city: "Cagayan de Oro",
				province: "Misamis Oriental",
				brgy: "Downtown",
				timeIn: "2023-09-07 10:15 AM",
				timeOut: "2023-09-07 05:00 PM",
			},
			visitorType: "Walk-in",
			date: "09-19-2023 6:00 AM",
		},
		{
			key: 8,
			id: "UVG6498",
			visitorDetails: {
				fullName: {
					firstName: "Leonor",
					middleName: "Rivera",
					lastName: "Bonifacio",
				},
				mobile: "0919-876-5432",
				email: "leonor.bonifacio@example.com",
				houseNo: "222",
				city: "Iloilo City",
				street: "Diversion Road",
				province: "Iloilo",
				brgy: "Jaro",
				country: "Philippines",
				timeIn: "2023-09-09 10:30 AM",
				timeOut: "2023-09-09 05:15 PM",
			},
			visitorType: "Pre-Registered",
			date: "10-28-2023 5:15 PM",
		},
		{
			key: 9,
			id: "UVG2083",
			visitorDetails: {
				fullName: {
					firstName: "Gregorio",
					middleName: "Del Pilar",
					lastName: "Ramos",
				},
				mobile: "0936-987-6543",
				email: "gregorio.ramos@example.com",
				houseNo: "789",
				city: "Angeles City",
				street: "Fields Avenue",
				province: "Pampanga",
				brgy: "Balibago",
				country: "Philippines",
				timeIn: "2023-09-10 09:45 AM",
				timeOut: "2023-09-10 04:30 PM",
			},
			visitorType: "Walk-in",
			date: "12-15-2023 9:45 AM",
		},
		{
			key: 10,
			id: "UVG5739",
			visitorDetails: {
				fullName: {
					firstName: "Melchor",
					middleName: "Aquino",
					lastName: "Laurel",
				},
				mobile: "0915-543-2109",
				email: "melchor.laurel@example.com",
				city: "Cavite City",
				province: "Cavite",
				brgy: "Caridad",
				country: "Philippines",
				timeIn: "2023-09-11 08:15 AM",
				timeOut: "2023-09-11 03:00 PM",
			},
			visitorType: "Walk-in",
			date: "11-03-2023 2:30 PM",
		},
	];

	const columns: ColumnsType<VisitorDataType> = [
		{
			title: "ID",
			dataIndex: "id",
		},
		{
			title: "Name",
			dataIndex: "visitorDetails",
			sorter: (a, b) =>
				a.visitorDetails.fullName.lastName.localeCompare(
					b.visitorDetails.fullName.lastName,
				),
			render: (_, { visitorDetails }) => {
				return `${visitorDetails.fullName.lastName}, ${visitorDetails.fullName.firstName} ${visitorDetails.fullName.middleName}`;
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
			render: (_, { visitorDetails }) => {
				return visitorDetails.mobile;
			},
		},
		{
			title: "Visitor Type",
			dataIndex: "visitorType",
			filters: [
				{
					text: "Walk-in",
					value: "Walk-in",
				},
				{
					text: "Pre-Registered",
					value: "Pre-Registered",
				},
			],
			render: (_, { visitorType }) => {
				let color;
				if (visitorType === "Walk-in") color = "#E88B23";
				else if (visitorType === "Pre-Registered") color = "#0db284";
				return (
					<Tag color={color} key={visitorType}>
						{visitorType.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) => record.visitorType.indexOf(value) === 0,
		},
		{
			title: "Date Created",
			dataIndex: "date",
			sorter: (a, b) => a.date.localeCompare(b.date),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button onClick={() => addTab(record.visitorDetails)}>
					View Details
				</Button>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={data}
			onChange={onChange}
			pagination={{ pageSize: 8 }}
		/>
	);
}
