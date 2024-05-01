/* Built using Ant Design */
import React, { useEffect, useState } from "react";
import AxiosInstace from "../../../../lib/axios";

//Interfaces
import type { ColumnsType } from "antd/es/table";
import { OfficeSchedule } from "../../../../utils/interfaces";

//Components
import { Table, Button, Modal, Input } from "antd";

//Layout
import OfficeSchedDetails from "../../../../layouts/admin/home-editor/office-details";

//Assets
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Search } from "../../../../assets/svg";

//Styles
import "../../../../utils/variables.scss";
import "./styles.scss";
import { jwtDecode } from "jwt-decode";

const { confirm } = Modal;

const showDeleteConfirm = () => {
	confirm({
		title: "Are you sure you want to delete this?",
		className: "confirm-buttons",
		icon: <ExclamationCircleFilled className="!text-error-500" />,
		okText: "Yes",
		okType: "danger",
		cancelText: "No",
		onOk() {
			console.log("OK");
		},
		onCancel() {
			console.log("Cancel");
		},
	});
};

export default function OfficeScheduleList() {
	const [pageDetail, setPageDetail] = useState<OfficeSchedule>();
	const [openDetails, setOpenDetails] = useState(false);
	const [data, setData] = useState<any>([]);
	const [offices, setOffices] = useState<OfficeSchedule[]>([]);
	const [searchValue, setSearchValue] = useState("");

	const token = localStorage.getItem("token");
	const decodedtoken = (jwtDecode (token as string));

	useEffect(() => {
		if(searchValue == "") { //if searchvalue is empty fetchandsetoffices will be called
			fetchAndSetOffices();
		}
	}, [searchValue ]) //if this changes useEffect will happen again

	const fetchAndSetOffices = async () => {
		try {
			const response = await AxiosInstace.get('/offices/')
			const data = response.data.office

			//getting only the data we want
			const convertedData: OfficeSchedule[] = data.map((office: any) => ({
				name: office.name,  
				roomNo: office.roomNo,
				pic: office.pic,
				contact: office.contact,
				email: office.email,
			  }));
			setData(data);
			setOffices(convertedData);
		  } catch (error) {
			console.error('Error fetching offices:', error);
		  }
	  };

	const showDeleteConfirm = async(data: any) => {
		confirm({
			title: "Are you sure you want to delete this?",
			className: "confirm-buttons",
			icon: <ExclamationCircleFilled className="!text-error-500" />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				try {
					await AxiosInstace.delete('/offices/delete', { data: { _id: data._id, userID: decodedtoken.sub } }); 
					fetchAndSetOffices();
				  } catch (error) {
					console.error('Error deleting office:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const handleSearch = async() => {
		try {
			const response = await AxiosInstace.post('/offices/search', {query: searchValue})
			const data = response.data.office;
			const convertedData: OfficeSchedule[] = data.map((office: any) => ({
				name: office.name, 
				roomNo: office.roomNo,
				pic: office.pic,
				contact: office.contact,
				email: office.email,
			  }));
			setData(data);
			setOffices(convertedData);
		  } catch (error) {
			console.error('Error fetching offices:', error);
		  }
	}

	const edit = (record: any) => {
		setPageDetail(record);
		setOpenDetails(!openDetails);
	};

	const newOffice = () => {
		setPageDetail(undefined);
		setOpenDetails(!openDetails);
	};

	// const data: OfficeSchedule[] = [
	// 	{
	// 		officeName: "Office of Human Resources",
	// 		operatingHours: "9:00AM - 3:00PM M-F",
	// 		inCharge: "Ms. John Doe",
	// 		location: "Bldg. 1, 4th Floor, Rm 105",
	// 		contact: "091234567891",
	// 		availability: "Available",
	// 	},
	// 	{
	// 		officeName: "Office of Dean",
	// 		operatingHours: "9:00AM - 3:00PM M-F",
	// 		inCharge: "Ms. John Doe",
	// 		location: "Bldg. 1, 4th Floor, Rm 105",
	// 		contact: "091234567891",
	// 		availability: "Unvailable",
	// 	},
	// 	{
	// 		officeName: "Office of Head Security",
	// 		operatingHours: "9:00AM - 3:00PM M-F",
	// 		inCharge: "Ms. John Doe",
	// 		location: "Bldg. 1, 4th Floor, Rm 105",
	// 		contact: "091234567891",
	// 		availability: "Unvailable",
	// 	},
	// 	{
	// 		officeName: "Office of Vice President",
	// 		operatingHours: "9:00AM - 3:00PM M-F",
	// 		inCharge: "Ms. John Doe",
	// 		location: "Bldg. 1, 4th Floor, Rm 105",
	// 		contact: "091234567891",
	// 		availability: "Unvailable",
	// 	},
	// 	{
	// 		officeName: "Office of President",
	// 		operatingHours: "9:00AM - 3:00PM M-F",
	// 		inCharge: "Ms. John Doe",
	// 		location: "Bldg. 1, 4th Floor, Rm 105",
	// 		contact: "091234567891",
	// 		availability: "Unvailable",
	// 	},
	// ];

	const columns: ColumnsType<OfficeSchedule> = [
		{
			title: "Office",
			dataIndex: "name",
		},
		{
			title: (
				<Button onClick={newOffice} className="w-[20%]" type="primary">
					Add
				</Button>
			),
			key: "action",
			width: "30%",
			render: (_, record) => (
				<>
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(data[offices.indexOf(record)])}>
						View
					</Button>
					<Button onClick={() => showDeleteConfirm(data[offices.indexOf(record)])} danger>
						Delete
					</Button>
				</>
			),
		},
	];

	return (
		<div className="ml-[45px] mt-[30px] flex flex-col gap-[50px]">
			{!openDetails && (
				<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
					<Input
						className="w-[366px]"
						size="large"
						placeholder="Search"
						onPressEnter={handleSearch}
						prefix={<Search />}
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
					<Button type="primary" className="search-button !bg-primary-500" onClick={handleSearch}>
						Search
					</Button>
				</div>
			)}
			<div className="mr-[50px]">
				{!openDetails && (
					<Table
						columns={columns}
						dataSource={offices}
						pagination={{ pageSize: 8 }}
					/>
				)}
				{openDetails && (
					<OfficeSchedDetails
						record={pageDetail}
						setOpenDetails={setOpenDetails}
						fetch={fetchAndSetOffices}
					/>
				)}
			</div>
		</div>
	);
}
