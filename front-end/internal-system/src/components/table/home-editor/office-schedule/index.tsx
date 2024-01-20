/* Built using Ant Design */
import React, { useState } from "react";

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

	const edit = (record: OfficeSchedule) => {
		setPageDetail(record);
		setOpenDetails(!openDetails);
	};

	const newEvent = () => {
		setPageDetail(undefined);
		setOpenDetails(!openDetails);
	};

	const data: OfficeSchedule[] = [
		{
			officeName: "Office of Human Resources",
			operatingHours: "9:00AM - 3:00PM M-F",
			inCharge: "Ms. John Doe",
			location: "Bldg. 1, 4th Floor, Rm 105",
			contact: "091234567891",
			availability: "Available",
		},
		{
			officeName: "Office of Dean",
			operatingHours: "9:00AM - 3:00PM M-F",
			inCharge: "Ms. John Doe",
			location: "Bldg. 1, 4th Floor, Rm 105",
			contact: "091234567891",
			availability: "Unvailable",
		},
		{
			officeName: "Office of Head Security",
			operatingHours: "9:00AM - 3:00PM M-F",
			inCharge: "Ms. John Doe",
			location: "Bldg. 1, 4th Floor, Rm 105",
			contact: "091234567891",
			availability: "Unvailable",
		},
		{
			officeName: "Office of Vice President",
			operatingHours: "9:00AM - 3:00PM M-F",
			inCharge: "Ms. John Doe",
			location: "Bldg. 1, 4th Floor, Rm 105",
			contact: "091234567891",
			availability: "Unvailable",
		},
		{
			officeName: "Office of President",
			operatingHours: "9:00AM - 3:00PM M-F",
			inCharge: "Ms. John Doe",
			location: "Bldg. 1, 4th Floor, Rm 105",
			contact: "091234567891",
			availability: "Unvailable",
		},
	];

	const columns: ColumnsType<OfficeSchedule> = [
		{
			title: "Offices",
			dataIndex: "officeName",
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
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(record)}>
						View
					</Button>
					<Button onClick={showDeleteConfirm} danger>
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
						prefix={<Search />}
					/>
					<Button type="primary" className="search-button !bg-primary-500">
						Search
					</Button>
				</div>
			)}
			<div className="mr-[50px]">
				{!openDetails && (
					<Table
						columns={columns}
						dataSource={data}
						pagination={{ pageSize: 5 }}
					/>
				)}
				{openDetails && (
					<OfficeSchedDetails
						record={pageDetail}
						setOpenDetails={setOpenDetails}
					/>
				)}
			</div>
		</div>
	);
}
