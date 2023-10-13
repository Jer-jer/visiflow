/* Built using Ant Design */
import React from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

//Interfaces
import { VisitorDataType, VisitorDetailsProps } from "../../../utils";

//Styles
import "../../../utils/variables.scss";

interface ScheduleListTableProps {
	addTab: (
		record: VisitorDataType,
	) => void;
}

export default function ScheduleListTable({ addTab }: ScheduleListTableProps) {
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
				status: "approved",
			},
			companionNumber: "4",
			companionsDetails: [
				{
					fullName: {
						firstName: "John",
						middleName: "Doe",
						lastName: "Smith",
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
					status: "approved",
				},
				{
					fullName: {
						firstName: "Maria",
						middleName: "Garcia",
						lastName: "Perez",
					},
					mobile: "987-654-3210",
					email: "maria.perez@example.com",
					city: "Cebu",
					province: "Cebu",
					brgy: "Cebu City",
					timeIn: "2023-09-02 10:30 AM",
					timeOut: "2023-09-02 03:30 PM",
					status: "in-progress",
				},
				{
					fullName: {
						firstName: "Pedro",
						middleName: "Gomez",
						lastName: "Lopez",
					},
					mobile: "555-123-4567",
					email: "pedro.lopez@example.com",
					city: "Davao",
					province: "Davao del Sur",
					brgy: "Davao City",
					timeIn: "2023-09-03 11:45 AM",
					timeOut: "2023-09-03 01:30 PM",
					status: "in-progress",
				},
				{
					fullName: {
						firstName: "Sofia",
						middleName: "Torres",
						lastName: "Gonzalez",
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
					status: "declined",
				},
			],
			personOfInterest: "Jose Mari Chan",
			purpose: "Document Signing",
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
				status: "in-progress",
			},
			companionNumber: "0",
			personOfInterest: "Example Example",
			purpose: "Check up",
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
				status: "declined",
			},
			companionNumber: "2",
			companionsDetails: [
				{
					fullName: {
						firstName: "Juan",
						middleName: "Santos",
						lastName: "Gonzales",
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
					status: "approved",
				},
				{
					fullName: {
						firstName: "Luisa",
						middleName: "Rodriguez",
						lastName: "Martinez",
					},
					mobile: "666-555-4444",
					email: "luisa.martinez@example.com",
					city: "Cagayan de Oro",
					province: "Misamis Oriental",
					brgy: "Carmen",
					timeIn: "2023-09-06 10:15 AM",
					timeOut: "2023-09-06 12:30 PM",
					status: "approved",
				},
			],
			visitorType: "Pre-Registered",
			personOfInterest: "Alexa Google",
			purpose: "Contract",
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
				status: "in-progress",
			},
			companionNumber: "0",
			visitorType: "Walk-in",
			personOfInterest: "Manny Pacquiao",
			purpose: "Meeting",
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
				status: "approved",
			},
			companionNumber: "0",
			visitorType: "Pre-Registered",
			personOfInterest: "Alex Gonzaga",
			purpose: "Research",
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
				status: "declined",
			},
			companionNumber: "0",
			personOfInterest: "Jose Mari Chan",
			purpose: "Tournament",
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
				status: "in-progress",
			},
			companionNumber: "0",
			visitorType: "Walk-in",
			personOfInterest: "Bea Alonzo",
			purpose: "Check up",
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
				status: "approved",
			},
			companionNumber: "0",
			visitorType: "Pre-Registered",
			personOfInterest: "Jose Mari Chan",
			purpose: "Meeting",
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
				status: "approved",
			},
			companionNumber: "0",
			visitorType: "Walk-in",
			personOfInterest: "Toni Gonzaga",
			purpose: "Speaker",
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
				status: "declined",
			},
			companionNumber: "0",
			visitorType: "Walk-in",
			personOfInterest: "Kim Chiu",
			purpose: "Lunch",
			date: "11-03-2023 2:30 PM",
		},
	];

	const columns: ColumnsType<VisitorDataType> = [
		{
			title: "ID",
			dataIndex: "userId",
		},
		{
			title: "Name",
			dataIndex: "visitorDetails",
			sorter: (a, b) => a.visitorDetails.fullName.lastName.localeCompare(b.visitorDetails.fullName.lastName),
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
			title: "Status",
			dataIndex: "status",
			filters: [
				{
					text: "In-Progress",
					value: "In-Progress",
				},
				{
					text: "Approved",
					value: "Approved",
				},
				{
					text: "Declined",
					value: "Declined",
				},
				{
					text: "Completed",
					value: "Completed"
				}
			],
			render: (_, { visitorDetails }) => {
				let color;
				if(visitorDetails.status === "In-Progress") color = "#E88B23";
				else if(visitorDetails.status === "Approved") color = "#0db284";
				else if(visitorDetails.status === "Declined") color = "#FF0000";
				else if(visitorDetails.status === "Completed") color = "#9C9C9C";
				return (
					<Tag color={color} key={visitorDetails.status}>
						{visitorDetails.status.toUpperCase()}
					</Tag>
				);
			},
		},
        {
			title: "Action",
			key: "action",
			render: (_, record) => (
				<>
					<Button>Delete</Button>
					<Button className="ml-4" onClick={() => {
						console.log("Clicked edit button");
						console.log("CONSOLE", record);
						addTab(record)
					}}
					>Edit</Button>
				</>

			),
		},
	];

	return (
		<Table columns={columns} dataSource={data} pagination={{ pageSize: 8 }} />
	);
}
