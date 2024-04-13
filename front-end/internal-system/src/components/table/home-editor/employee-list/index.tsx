/* Built using Ant Design */
import React, { useEffect, useState } from "react";

//Interfaces
import type { ColumnsType } from "antd/es/table";
import { Employee, Building, EventsSchedule, Reason } from "../../../../utils/interfaces";

//Components
import { Table, Button, Modal, Input, Tabs } from "antd";
import type { TabsProps } from 'antd';

//Layout
import EmployeeDetails from "../../../../layouts/admin/home-editor/employee-details";
import BuildingDetails from "../../../../layouts/admin/home-editor/building-details";

//Assets
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Search } from "../../../../assets/svg";

//Styles
import "../../../../utils/variables.scss";
import "./styles.scss";
import { AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstace from "../../../../lib/axios";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import ReasonDetails from "../../../../layouts/admin/home-editor/reason-details";

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
	const [employeesData, setEmployeesData] = useState<any>([]);
	const [buildingsData, setBuildingsData] = useState<any>([]);
	const [reasonsData, setReasonsData] = useState<any>([]);

	const [employees, setEmployees] = useState<Employee[]>([]);
	const [buildings, setBuildings] = useState<Building[]>([]);
	const [reasons, setReasons] = useState<Reason[]>([]);

	const [activeKey, setActiveKey] = useState("1");
	const [activeTab, setActiveTab] = useState<any>([]);
	const [columns, setColumns] = useState<any>();
	
	

	// const [users, setUsers] = useState<HomeEditor[]>([]);
	const [searchValue, setSearchValue] = useState("");

	  useEffect(() => {
		const fetchData = async () => {
			if (searchValue === "") {
				let employees = await fetchAndSetEmployees();
				let reasons = await fetchAndSetReasons();
				let buildings = await fetchAndSetBuildings();

				if (activeKey === "1") {
					setActiveTab(employees);
				} else if (activeKey === "2") {
					setActiveTab(reasons);
				} else if (activeKey === "3") {
					setActiveTab(buildings);
				}
			}
		};
	
		fetchData();
	}, [searchValue, activeKey])

	useEffect(() => {
		// Update columns based on activeTab
		if (activeTab === employees) {
			setColumns(employeeColumns);
		} else if (activeTab === reasons) {
			setColumns(reasonColumns);
		} else if (activeTab === buildings) {
			setColumns(buildingColumns);
		}
	}, [activeTab]);
	
//For getting employees/the whos from back-end
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
			setEmployeesData(data);
			setEmployees(convertedData);
			return convertedData;
		  } catch (error) {
			console.error('Error fetching employees:', error);
		  }
	  };

	  const fetchAndSetEmployeesActive = async () => {
		let employees = await fetchAndSetEmployees();
		setActiveTab(employees);
	  }

	  const fetchAndSetReasons = async () => {
		try {
			const response = await AxiosInstace.get('/reasons/')
			const data = response.data.reasons

			//getting only the data we want
			const convertedData: Reason[] = data.map((reason: any) => ({
				reason: reason.reason,
			  }));
			setReasonsData(data);
			setReasons(convertedData);
			return convertedData;
		  } catch (error) {
			console.error('Error fetching reasons:', error);
		  }
	  };

	  const fetchAndSetReasonsActive = async () => {
		let reasons = await fetchAndSetReasons();
		setActiveTab(reasons);
	  }
	
//getting data from buildings/ the where
	  const fetchAndSetBuildings = async () => {
		try {
			const response = await AxiosInstace.get('/buildings/')
			const data = response.data.buildings

			//getting only the data we want
			const convertedData: Building[] = data.map((building: any) => ({
				name: building.name,
				roomNo: building.roomNo,
			  }));
			setBuildingsData(data);
			setBuildings(convertedData);
			return convertedData;
		  } catch (error) {
			console.error('Error fetching buildings:', error);
		  }
	  };

	  const fetchAndSetBuildingsActive = async () => {
		let buildings = await fetchAndSetBuildings();
		setActiveTab(buildings);
	  }

	  useEffect(() => {
		//console.log(activeTab);
	  });

	//   Edit New
	  const onChange = (key: string) => {
		setActiveKey(key);
		
		changeActiveTab(key);
	  };

	  const changeActiveTab = (key: string) => {
		if(key === "1"){
			setActiveTab(employees);
			setColumns(employeeColumns);
		} else if (key === "2") {
			setActiveTab(reasons);
			setColumns(reasonColumns);
		} else if(key === "3") {
			setActiveTab(buildings);
			setColumns(buildingColumns);
		}
	  }

	  const items: TabsProps['items'] = [
		{
		  key: '1',
		  label: 'Who',
		  children: '',
		},
		{
		  key: '2',
		  label: 'What',
		  children: '',
		},
		{
		  key: '3',
		  label: 'Where',
		  children: '',
		},
	  ];
	  
	const showDeleteConfirmEmployee = async(data: any) => {
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
					fetchAndSetEmployeesActive();
				  } catch (error) {
					console.error('Error deleting employees:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const showDeleteConfirmReason = async(data: any) => {
		confirm({
			title: "Are you sure you want to delete this?",
			className: "confirm-buttons",
			icon: <ExclamationCircleFilled className="!text-error-500" />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				try {
					await AxiosInstace.delete('/reasons/delete', { data: { _id: data._id } }); 
					fetchAndSetReasonsActive();
				  } catch (error) {
					console.error('Error deleting reasons:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const showDeleteConfirmBuilding = async(data: any) => {
		confirm({
			title: "Are you sure you want to delete this?",
			className: "confirm-buttons",
			icon: <ExclamationCircleFilled className="!text-error-500" />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				try {
					await AxiosInstace.delete('/buildings/delete', { data: { _id: data._id } }); 
					fetchAndSetBuildingsActive();
				  } catch (error) {
					console.error('Error deleting buildings:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const handleSearch = async() => {
		if(activeKey === '1') {
			try {
				const response = await AxiosInstace.post('/employees/search', {name: searchValue})
				const data = response.data.employees
	
				//getting only the data we want
				const convertedData: Employee[] = data.map((employee: any) => ({
					name: employee.name,
					email: employee.email,
					contact: employee.contact,
					}));
				setEmployeesData(data);
				setEmployees(convertedData);
				setActiveTab(convertedData);
			} catch (error) {
			console.error('Error fetching employees:', error);
			}
		} else if(activeKey === '2') {
			try {
				const response = await AxiosInstace.post('/reasons/search', {reason: searchValue})
				const data = response.data.reasons
	
				//getting only the data we want
				const convertedData: Reason[] = data.map((reason: any) => ({
					reason: reason.reason,
				  }));
				setReasonsData(data);
				setReasons(convertedData);
				setActiveTab(convertedData);
			  } catch (error) {
				console.error('Error fetching reasons:', error);
			  }
		} else if(activeKey === '3') {
			try {
				const response = await AxiosInstace.post('/buildings/search', {name: searchValue})
				const data = response.data.buildings

				//getting only the data we want
				const convertedData: Building[] = data.map((building: any) => ({
					name: building.name,
					roomNo: building.roomNo,
				}));
				setBuildingsData(data);
				setBuildings(convertedData);
				setActiveTab(convertedData);
			} catch (error) {
			console.error('Error fetching buildings:', error);
			}
		}
		
	}

	const edit = (record: any) => {
		setPageDetail(record);
		setOpenDetails(!openDetails);
	};

	const addNew = () => {
		setPageDetail(undefined);
		setOpenDetails(true);
	};
	
	const employeeColumns: ColumnsType<Employee> = [
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
				<Button onClick={addNew} className="w-[20%]" type="primary">
					Add
				</Button>
			),
			key: "action",
			width: "30%",
			render: (_, record) => (
				<>
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(employeesData[employees.indexOf(record)])}>
						View
					</Button>
					{/* _ is the column data */}
					<Button onClick={() => showDeleteConfirmEmployee(employeesData[employees.indexOf(record)])} danger>
						Delete
					</Button>
				</>
			),
		},
	];

	const buildingColumns: ColumnsType<Building> = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Number of Floors",
			dataIndex: "roomNo",
		},
		{
			title: (
				<Button onClick={addNew} className="w-[20%]" type="primary">
					Add
				</Button>
			),
			key: "action",
			width: "30%",
			render: (_, record) => (
				<>
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(buildingsData[buildings.indexOf(record)])}>
						View
					</Button>
					{/* _ is the column data */}
					<Button onClick={() => showDeleteConfirmBuilding(buildingsData[buildings.indexOf(record)])} danger>
						Delete
					</Button>
				</>
			),
		},
	];

	const reasonColumns: ColumnsType<Reason> = [
		{
			title: "Reason",
			dataIndex: "reason",
		},
		{
			title: (
				<Button onClick={addNew} className="w-[20%]" type="primary">
					Add
				</Button>
			),
			key: "action",
			width: "30%",
			render: (_, record) => (
				<>
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(reasonsData[reasons.indexOf(record)])}>
						View
					</Button>
					{/* _ is the column data */}
					<Button onClick={() => showDeleteConfirmReason(reasonsData[reasons.indexOf(record)])} danger>
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
					<div className="editor-item-tab">
						<Tabs defaultActiveKey={activeKey} items={items} onChange={onChange}/>
					</div>
				</div>
			)}
			<div className="mr-[50px]">
				{!openDetails && (
					<Table
						columns={columns}
						dataSource={activeTab}
						pagination={{ pageSize: 8 }}
					/>
				)}
				{openDetails && (
					activeKey === "1" ?
					<EmployeeDetails
					record={pageDetail}
					setOpenDetails={setOpenDetails}
					fetch={fetchAndSetEmployeesActive}
					/>
					: (activeKey === "2" ? 
					<ReasonDetails
					record={pageDetail}
					setOpenDetails={setOpenDetails}
					fetch={fetchAndSetReasonsActive}/> : 
					<BuildingDetails
					record={pageDetail}
					setOpenDetails={setOpenDetails}
					fetch={fetchAndSetBuildingsActive}
					/>)
				)}
			</div>
		</div>
	);
}

