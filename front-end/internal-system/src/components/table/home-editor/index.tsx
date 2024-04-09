/* Built using Ant Design */
import React, { useEffect, useState } from "react";

//Interfaces
import type { ColumnsType } from "antd/es/table";
import { HomeEditor } from "../../../utils/interfaces";

//Components
import { Table, Button, Modal, Input } from "antd";

//Layout
import PageDetails from "../../../layouts/admin/home-editor/page-details";

//Assets
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Search } from "../../../assets/svg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";
import { AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstace from "../../../lib/axios";
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
export default function HomeList() {
	
	const [pageDetail, setPageDetail] = useState<any>();
	const [openDetails, setOpenDetails] = useState(false);
	//stated variable for useEffect
	const [data, setData] = useState<any>([]);
	const [announcements, setAnnouncements] = useState<HomeEditor[]>([]);
	// const [users, setUsers] = useState<HomeEditor[]>([]);
	const [searchValue, setSearchValue] = useState("");

	// useEffect(() => {
	// 	  fetchAndSetAnnouncements();
	//   }, []);
	  useEffect(() => {
		if(searchValue == "") {
			fetchAndSetAnnouncements();
		}
	}, [searchValue])
//For getting announcements from back-end
	  //async is used for keyword await
	  const fetchAndSetAnnouncements = async () => {
		try {
			const response = await AxiosInstace.get('/announcements/')
			const data = response.data.announce
			// console.log(response)

			//getting only the data we want
			const convertedData: HomeEditor[] = data.map((announcement: any) => ({
				title: announcement.title,
				body: announcement.message,
				prio: announcement.prio,
				createdAt: new Date(announcement.updatedAt).toISOString().split('T')[0] 
			  }));
			setData(data);
			setAnnouncements(convertedData);
		  } catch (error) {
			console.error('Error fetching announcements:', error);
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
					await AxiosInstace.delete('/announcements/delete', { data: { _id: data._id } }); 
					fetchAndSetAnnouncements();
				  } catch (error) {
					console.error('Error deleting announcement:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const handleSearch = async() => {
		try {
			const response = await AxiosInstace.post('/announcements/search', {title: searchValue})
			const data = response.data.announce;
			const convertedData: HomeEditor[] = data.map((announcement: any) => ({
				title: announcement.title,
				body: announcement.message,
				prio: announcement.prio,
				createdAt: new Date(announcement.updatedAt).toISOString().split('T')[0] 
			  }));
			setData(data);
			setAnnouncements(convertedData);
		  } catch (error) {
			console.error('Error fetching announcements:', error);
		  }
	}

	const edit = (record: any) => {
		setPageDetail(record);
		setOpenDetails(!openDetails);
	};

	const newEvent = () => {
		setPageDetail(undefined);
		setOpenDetails(!openDetails);
	};
	
	const columns: ColumnsType<HomeEditor> = [
		{
			title: "Title",
			dataIndex: "title",
		},
		{
			title: "Priority Number",
			dataIndex: "prio",
			sorter: (a, b) => a.prio - b.prio,
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ,
		},
		{
			title: (
				<Button onClick={newEvent} className="w-[20%]" type="primary">
					Add
				</Button>
			),
			key: "action",
			width: "30%",
			render: (_, record) => (
				<>
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(data[announcements.indexOf(record)])}>
						View
					</Button>
					{/* _ is the column data */}
					<Button onClick={() => showDeleteConfirm(data[announcements.indexOf(record)])} danger>
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
						dataSource={announcements}
						pagination={{ pageSize: 8 }}
					/>
				)}
				{openDetails && (
					<PageDetails
					record={pageDetail}
					setOpenDetails={setOpenDetails}
					fetch={fetchAndSetAnnouncements}
					/>
				)}
			</div>
		</div>
	);
}

