/* Built using Ant Design */
import React, { useEffect, useState } from "react";

//Interfaces
import type { ColumnsType } from "antd/es/table";
import { Employee } from "../../../../utils/interfaces";

//Components
import { Table, Button, Modal, Input } from "antd";

//Layout
import EmployeeDetails from "../../../../layouts/admin/home-editor/employee-details";

//Assets
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Search } from "../../../../assets/svg";

//Styles
import "../../../../utils/variables.scss";
import "./styles.scss";
import { AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstace from "../../../../lib/axios";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

//fetch all announcements
// export const fetchAnnouncements = createAsyncThunk(
// 	"announcements",
// 	async () => {
// 		const response = await AxiosInstace.get("/");
// 		return response.data;
// 	},
// );

const { confirm } = Modal;

//Home editor/announcements
export default function EmployeeList() {
	
	const [pageDetail, setPageDetail] = useState<any>();
	const [openDetails, setOpenDetails] = useState(false);
	//stated variable for useEffect
	const [data, setData] = useState<any>([]);
	const [employees, setEmployees] = useState<Employee[]>([]);
	// const [users, setUsers] = useState<HomeEditor[]>([]);
	const [searchValue, setSearchValue] = useState("");

	  useEffect(() => {
		if(searchValue == "") {
			fetchAndSetEmployees();
		}
	}, [searchValue])
//For getting announcements from back-end
	  //async is used for keyword await
	  const fetchAndSetEmployees = async () => {
		try {
			const response = await AxiosInstace.get('/employees/')
			const data = response.data.employees

			//getting only the data we want
			const convertedData: Employee[] = data.map((employee: any) => ({
				name: employee.name,
				email: employee.email,
				contact: employee.contact,
			  }));
			setData(data);
			setEmployees(convertedData);
		  } catch (error) {
			console.error('Error fetching employees:', error);
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
					await AxiosInstace.delete('/employees/delete', { data: { _id: data._id } }); 
					fetchAndSetEmployees();
				  } catch (error) {
					console.error('Error deleting employees:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const handleSearch = async() => {
		try {
			const response = await AxiosInstace.post('/employees/search', {name: searchValue})
			const data = response.data.employees

			//getting only the data we want
			const convertedData: Employee[] = data.map((employee: any) => ({
				name: employee.name,
				email: employee.email,
				contact: employee.contact,
			  }));
			setData(data);
			setEmployees(convertedData);
		  } catch (error) {
			console.error('Error fetching employees:', error);
		  }
	}

	const edit = (record: any) => {
		setPageDetail(record);
		setOpenDetails(!openDetails);
	};

	const newEmployee = () => {
		setPageDetail(undefined);
		setOpenDetails(!openDetails);
	};
	
	const columns: ColumnsType<Employee> = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Contact No.",
			dataIndex: "contact",
		},
		{
			title: (
				<Button onClick={newEmployee} className="w-[20%]" type="primary">
					Add
				</Button>
			),
			key: "action",
			width: "30%",
			render: (_, record) => (
				<>
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(data[employees.indexOf(record)])}>
						View
					</Button>
					{/* _ is the column data */}
					<Button onClick={() => showDeleteConfirm(data[employees.indexOf(record)])} danger>
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
						dataSource={employees}
						pagination={{ pageSize: 8 }}
					/>
				)}
				{openDetails && (
					<EmployeeDetails
					record={pageDetail}
					setOpenDetails={setOpenDetails}
					fetch={fetchAndSetEmployees}
					/>
				)}
			</div>
		</div>
	);
}

