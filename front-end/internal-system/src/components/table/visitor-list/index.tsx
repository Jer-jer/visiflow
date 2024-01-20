/* Built using Ant Design */
import React from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import {
	VisitorDataType,
	VisitorStatus,
	VisitorType,
} from "../../../utils/interfaces";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface AdminTableProps {
	addTab: (record: VisitorDataType) => void;
}

export default function VisitorListTable({ addTab }: AdminTableProps) {
	const data: VisitorDataType[] = [
		{
			key: 1,
			id: "UVG4827",
			visitor_details: {
				fullName: {
					first_name: "Juan",
					middle_name: "Dela Cruz",
					last_name: "Garcia",
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
			companions_details: [
				{
					companion_id: "UVGVC0001",
					companion_details: {
						fullName: {
							first_name: "John",
							middle_name: "Doe",
							last_name: "Smith",
						},
						mobile: "123-456-7890",
						email: "john.smith@example.com",
						houseNo: "123",
						city: "Manila",
						street: "Main Street",
						province: "Metro Manila",
						brgy: "Makati",
						country: "Philippines",
						timeIn: "2023-09-01 09:00 AM",
						timeOut: "2023-09-01 05:00 PM",
					},
				},
				{
					companion_id: "UVGVC0002",
					companion_details: {
						fullName: {
							first_name: "Maria",
							middle_name: "Garcia",
							last_name: "Perez",
						},
						mobile: "987-654-3210",
						email: "maria.perez@example.com",
						city: "Cebu",
						province: "Cebu",
						brgy: "Cebu City",
						timeIn: "2023-09-02 10:30 AM",
						timeOut: "2023-09-02 03:30 PM",
					},
				},
				{
					companion_id: "UVGVC0003",
					companion_details: {
						fullName: {
							first_name: "Pedro",
							middle_name: "Gomez",
							last_name: "Lopez",
						},
						mobile: "555-123-4567",
						email: "pedro.lopez@example.com",
						city: "Davao",
						province: "Davao del Sur",
						brgy: "Davao City",
						timeIn: "2023-09-03 11:45 AM",
						timeOut: "2023-09-03 01:30 PM",
					},
				},
				{
					companion_id: "UVGVC0004",
					companion_details: {
						fullName: {
							first_name: "Sofia",
							middle_name: "Torres",
							last_name: "Gonzalez",
						},
						mobile: "222-333-4444",
						email: "sofia.gonzalez@example.com",
						houseNo: "456",
						city: "Quezon City",
						province: "Metro Manila",
						brgy: "Katipunan",
						country: "Philippines",
						timeIn: "2023-09-04 03:15 PM",
						timeOut: "2023-09-04 06:00 PM",
					},
				},
			],
			purpose: "Meeting with Client",
			status: VisitorStatus.Approved,
			visitor_type: VisitorType.WalkIn,
			date: "10-04-2023 4:50 AM",
		},
		{
			key: 2,
			id: "UVG9175",
			visitor_details: {
				fullName: {
					first_name: "Maria",
					middle_name: "Santos",
					last_name: "Fernandez",
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
			purpose: "Interview",
			status: VisitorStatus.InProgress,
			visitor_type: VisitorType.PreRegistered,
			date: "11-20-2023 8:25 PM",
		},
		{
			key: 3,
			id: "UVG3268",
			visitor_details: {
				fullName: {
					first_name: "Andres",
					middle_name: "Bonifacio",
					last_name: "Luna",
				},
				mobile: "0933-555-8888",
				email: "andres.luna@example.com",
				city: "Quezon City",
				province: "Metro Manila",
				brgy: "Cubao",
				timeIn: "2023-09-03 11:15 AM",
				timeOut: "2023-09-03 06:00 PM",
			},
			companions_details: [
				{
					companion_id: "UVGVC0001",
					companion_details: {
						fullName: {
							first_name: "Juan",
							middle_name: "Santos",
							last_name: "Gonzales",
						},
						mobile: "777-888-9999",
						email: "juan.gonzales@example.com",
						houseNo: "789",
						city: "Makati",
						province: "Metro Manila",
						brgy: "Salcedo Village",
						country: "Philippines",
						timeIn: "2023-09-05 02:30 PM",
						timeOut: "2023-09-05 04:45 PM",
					},
				},
				{
					companion_id: "UVGVC0002",
					companion_details: {
						fullName: {
							first_name: "Luisa",
							middle_name: "Rodriguez",
							last_name: "Martinez",
						},
						mobile: "666-555-4444",
						email: "luisa.martinez@example.com",
						city: "Cagayan de Oro",
						province: "Misamis Oriental",
						brgy: "Carmen",
						timeIn: "2023-09-06 10:15 AM",
						timeOut: "2023-09-06 12:30 PM",
					},
				},
			],
			purpose: "Training Session",
			status: VisitorStatus.Approved,
			visitor_type: VisitorType.PreRegistered,
			date: "10-08-2023 11:40 AM",
		},
		{
			key: 4,
			id: "UVG5902",
			visitor_details: {
				fullName: {
					first_name: "Emilio",
					middle_name: "Aguinaldo",
					last_name: "Rizal",
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
			purpose: "Staff Meeting",
			status: VisitorStatus.InProgress,
			visitor_type: VisitorType.WalkIn,
			date: "12-01-2023 7:55 PM",
		},
		{
			key: 5,
			id: "UVG8741",
			visitor_details: {
				fullName: {
					first_name: "Mariano",
					middle_name: "Ponce",
					last_name: "Lopez",
				},
				mobile: "0945-678-9012",
				email: "mariano.lopez@example.com",
				city: "Davao City",
				province: "Davao del Sur",
				brgy: "Downtown",
				timeIn: "2023-09-05 10:00 AM",
				timeOut: "2023-09-05 04:15 PM",
			},
			purpose: "Site Inspection",
			status: VisitorStatus.Approved,
			visitor_type: VisitorType.PreRegistered,
			date: "11-12-2023 3:10 AM",
		},
		{
			key: 6,
			id: "UVG1359",
			visitor_details: {
				fullName: {
					first_name: "Apolinario",
					middle_name: "Mabini",
					last_name: "Magsaysay",
				},
				mobile: "0955-432-1098",
				email: "apolinario.magsaysay@example.com",
				city: "Bacolod City",
				province: "Negros Occidental",
				brgy: "Downtown",
				timeIn: "2023-09-06 08:45 AM",
				timeOut: "2023-09-06 03:30 PM",
			},
			purpose: "Meeting with Client",
			status: VisitorStatus.Declined,
			visitor_type: VisitorType.WalkIn,
			date: "09-30-2023 1:20 AM",
		},
		{
			key: 7,
			id: "UVG7624",
			visitor_details: {
				fullName: {
					first_name: "Melchora",
					middle_name: "Aquila",
					last_name: "Lakandula",
				},
				mobile: "0932-876-5432",
				email: "melchora.lakandula@example.com",
				city: "Cagayan de Oro",
				province: "Misamis Oriental",
				brgy: "Downtown",
				timeIn: "2023-09-07 10:15 AM",
				timeOut: "2023-09-07 05:00 PM",
			},
			purpose: "Meeting with Client",
			status: VisitorStatus.InProgress,
			visitor_type: VisitorType.WalkIn,
			date: "09-19-2023 6:00 AM",
		},
		{
			key: 8,
			id: "UVG6498",
			visitor_details: {
				fullName: {
					first_name: "Leonor",
					middle_name: "Rivera",
					last_name: "Bonifacio",
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
			purpose: "Meeting with Client",
			status: VisitorStatus.Approved,
			visitor_type: VisitorType.PreRegistered,
			date: "10-28-2023 5:15 PM",
		},
		{
			key: 9,
			id: "UVG2083",
			visitor_details: {
				fullName: {
					first_name: "Gregorio",
					middle_name: "Del Pilar",
					last_name: "Ramos",
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
			purpose: "Meeting with Client",
			status: VisitorStatus.Approved,
			visitor_type: VisitorType.WalkIn,
			date: "12-15-2023 9:45 AM",
		},
		{
			key: 10,
			id: "UVG5739",
			visitor_details: {
				fullName: {
					first_name: "Melchor",
					middle_name: "Aquino",
					last_name: "Laurel",
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
			purpose: "Meeting with Client",
			status: VisitorStatus.Declined,
			visitor_type: VisitorType.WalkIn,
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
				a.visitor_details.fullName.last_name.localeCompare(
					b.visitor_details.fullName.last_name,
				),
			render: (_, { visitor_details }) => {
				return `${visitor_details.fullName.last_name}, ${visitor_details.fullName.first_name} ${visitor_details.fullName.middle_name}`;
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact",
			render: (_, { visitor_details }) => {
				return visitor_details.mobile;
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
			render: (_, { visitor_type }) => {
				let color;
				if (visitor_type === VisitorType.WalkIn) color = "#E88B23";
				else if (visitor_type === VisitorType.PreRegistered) color = "#0db284";
				return (
					<Tag color={color} key={visitor_type}>
						{visitor_type.toUpperCase()}
					</Tag>
				);
			},
			onFilter: (value: any, record) =>
				record.visitor_type.indexOf(value) === 0,
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
				<Button onClick={() => addTab(record)}>View Details</Button>
			),
		},
	];

	return (
		<Table columns={columns} dataSource={data} pagination={{ pageSize: 8 }} />
	);
}
