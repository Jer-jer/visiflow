/* Built using Ant Design */
import React, { useEffect, useState } from "react";
import AxiosInstace from "../../../../lib/axios";

//Interfaces
import type { ColumnsType } from "antd/es/table";
import { EventsSchedule } from "../../../../utils/interfaces";
import type { Dayjs } from "dayjs";

//Components
import { Table, Button, Modal, Input, Checkbox} from "antd";
import DateTimePicker from "../../../../components/datetime-picker";

//Layout
import EventsSchedDetails from "../../../../layouts/admin/home-editor/events-details";

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

export default function EventsScheduleList() {
	const [pageDetail, setPageDetail] = useState<EventsSchedule | undefined>();
	const [openDetails, setOpenDetails] = useState(false);
	const [data, setData] = useState<any>([]);
	const [events, setEvents] = useState<EventsSchedule[]>([]);
	const [displayEvents, setDisplayEvents] = useState<EventsSchedule[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [checkedList, setCheckedList] = useState<string[]>([]);

	const token = localStorage.getItem("token");
	const decodedtoken = (jwtDecode (token as string));

	useEffect(() => {
		if(searchValue == "") {
			fetchAndSetEvents();
		}
	}, [searchValue])

	const fetchAndSetEvents = async () => {
		try {
			const response = await AxiosInstace.get('/events/')
			const data = response.data.event

			//getting only the data we want
			const convertedData: EventsSchedule[] = data.map((event: any) => {
				console.log('start ', new Date(event.startDate));
				console.log('end ', new Date(event.endDate));

				return {
					name: event.name,
					startDate: new Date(event.startDate).toLocaleDateString(),
					endDate: new Date(event.endDate).toLocaleDateString(),
					startTime: event.startTime,
					endTime: event.endTime,
				}
				
			  });
			setData(data);
			setEvents(convertedData);
			setDisplayEvents(convertedData);
		  } catch (error) {
			console.error('Error fetching events:', error);
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
					await AxiosInstace.delete('/events/delete', { data: { _id: data._id, userID: decodedtoken.sub } }); 
					fetchAndSetEvents();
				  } catch (error) {
					console.error('Error deleting event:', error);
				  }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const handleSearch = async() => {
		try {
			const response = await AxiosInstace.post('/events/search', {name: searchValue})
			const data = response.data.event;
			const convertedData: EventsSchedule[] = data.map((event: any) => ({
				name: event.name,
				startDate: new Date(event.startDate).toLocaleDateString(),
				endDate: new Date(event.endDate).toLocaleDateString(),
				startTime: event.startTime,
				endTime: event.endTime,
			  }));
			setData(data);
			setEvents(convertedData);
			setDisplayEvents(convertedData);
		  } catch (error) {
			console.error('Error fetching events:', error);
		  }
	}

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			let startDate = dateStrings[0];
			let endDate = dateStrings[1];
			const filteredEvents = events.filter((event) => {
			
				return new Date(event.startDate).getTime() >= new Date(startDate).getTime() && new Date(event.endDate).getTime() <= new Date(endDate).getTime();
			});
			setDisplayEvents(filteredEvents);
		} else {
			setDisplayEvents(events);
		}
	};

	const onCheckboxChange = (checkedValues: string[]) => {
		setCheckedList(checkedValues)
		let filteredEvents;
		if (checkedValues.length === 0) {
			filteredEvents = events; // Return unfiltered events
		  } else {
			filteredEvents = events.filter(event => {
				const currentDate = new Date().toISOString().slice(0, 10);
				if (checkedValues.includes('past')) {
				if (new Date(event.endDate) < new Date(currentDate)) {
					return true;
				}
				}
				if (checkedValues.includes('current')) {
				if (new Date(event.startDate) <= new Date(currentDate) && new Date(event.endDate) >= new Date(currentDate)) {
					return true;
				}
				}
				if (checkedValues.includes('upcoming')) {
				if (new Date(event.startDate) > new Date(currentDate)) {
					return true;
				}
				}
				return false;
			});
		}
		setDisplayEvents(filteredEvents);
	}

	const edit = (record: any) => {
		setPageDetail(record);
		setOpenDetails(!openDetails);
	};

	const newEvent = () => {
		setPageDetail(undefined);
		setOpenDetails(!openDetails);
	};

	const formatDate = (dateStr: string): string => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		const date: Date = new Date(dateStr);
		const formattedDate: string = date.toLocaleDateString(undefined, options);

		return formattedDate;
	};

	// const data: EventsSchedule[] = [
	// 	{
	// 		name: "Annual Conference",
	// 		date: "2023-09-22",
	// 		start: "09:00 AM",
	// 		end: "05:00 PM",
	// 		location: "Convention Center",
	// 		description: "A conference for industry professionals.",
	// 	},
	// 	{
	// 		name: "Product Launch",
	// 		date: "2023-10-15",
	// 		start: "02:30 PM",
	// 		end: "04:30 PM",
	// 		location: "Company Headquarters",
	// 		description: "Introducing our latest products to the market.",
	// 	},
	// 	{
	// 		name: "Team Building",
	// 		date: "2023-11-05",
	// 		start: "10:00 AM",
	// 		end: "03:00 PM",
	// 		location: "Adventure Park",
	// 		description: "A day of team-building activities and fun.",
	// 	},
	// 	{
	// 		name: "Seminar on Technology Trends",
	// 		date: "2023-12-12",
	// 		start: "09:30 AM",
	// 		end: "01:00 PM",
	// 		location: "Conference Hall",
	// 		description: "Exploring the latest trends in technology.",
	// 	},
	// 	{
	// 		name: "Holiday Party",
	// 		date: "2023-12-23",
	// 		start: "07:00 PM",
	// 		end: "11:00 PM",
	// 		location: "Grand Hotel",
	// 		description: "A festive celebration of the holiday season.",
	// 	},
	// ];

	const columns: ColumnsType<EventsSchedule> = [
		{
			title: "Events",
			dataIndex: "name",
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
			sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
		},
		{
			title: "End Date",
			dataIndex: "endDate",
			sorter: (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
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
					<Button className="mr-[3%] w-[20%]" onClick={() => edit(data[events.indexOf(record)])}>
						View
					</Button>
					<Button onClick={() => showDeleteConfirm(data[events.indexOf(record)])} danger>
						Delete
					</Button>
				</>
			),
		},
	];

	const options = [
		{ label: 'Past', value: 'past' },
		{ label: 'Current', value: 'current' },
		{ label: 'Upcoming', value: 'upcoming' },
	  ];

	return (
		<div className="ml-[45px] mt-[30px] flex flex-col gap-[50px]">
			{!openDetails && (
				<>
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
						<Button type="primary" className="search-button !bg-primary-500">
							Search
						</Button>
						<DateTimePicker size="large" onRangeChange={onRangeChange} />
					</div>
					<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
						<Checkbox.Group options={options} value={checkedList} onChange={onCheckboxChange}/>
					</div>
				</>
				
			)}
			<div className="mr-[50px]">
				{!openDetails && (
					<Table
						columns={columns}
						dataSource={displayEvents}
						pagination={{ pageSize: 8 }}
					/>
				)}
				{openDetails && (
					<EventsSchedDetails
						record={pageDetail}
						setOpenDetails={setOpenDetails}
						fetch={fetchAndSetEvents}
					/>
				)}
			</div>
		</div>
	);
}
