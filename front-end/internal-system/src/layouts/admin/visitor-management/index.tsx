import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { CSVLink } from "react-csv";

//Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
import type { Dayjs } from "dayjs";

//Components
import { Tabs, Input, Tooltip } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import VisitorListTable from "../../../components/table/visitor-list";
import VisitorDetails from "./visitor-details";

// Store
import { AppDispatch, RootState } from "../../../store";

// Reducers
import { fetchVisitors } from "../../../states/visitors";
import { addTab, removeTab } from "../../../states/visitors/tab";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface VisitorProps {
	addTab: (record: VisitorDataType) => void;
}

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const VisitorList = ({ addTab }: VisitorProps) => {
	const [search, setSearch] = useState<string>("");
	const [dateSearch, setDateSearch] = useState<string[]>([]);
	const [hideInOut, setHideInOut] = useState<boolean>(true);

	const { data } = useSelector((state: RootState) => state.visitors);

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
	};

	const visitorDetailsHeaders = [
		{ label: "First Name", key: "firstname" },
		{ label: "Middle Name", key: "middlename" },
		{ label: "Last Name", key: "lastname" },
		{ label: "Phone Number", key: "phone" },
		{ label: "Email", key: "email" },
		{ label: "House No.", key: "house" },
		{ label: "Street", key: "street" },
		{ label: "Barangay", key: "brgy" },
		{ label: "City", key: "city" },
		{ label: "Province", key: "province" },
		{ label: "Country", key: "country" },
		{ label: "Expected Check In", key: "check_in" },
		{ label: "Expected Check Out", key: "check_out" },
		{ label: "What", key: "what" },
		{ label: "When", key: "when" },
		{ label: "Where", key: "where" },
		{ label: "Who", key: "who" },
		{ label: "Plate Number", key: "plate_num" },
		{ label: "Visitor Type", key: "visitor_type" },
		{ label: "Status", key: "status" },
		{ label: "Created At", key: "created_at" },
	];

	const visitorDetailsData = data.map((visitor) => {
		return {
			firstname: visitor.visitor_details.name.first_name,
			middlename: visitor.visitor_details.name.middle_name,
			lastname: visitor.visitor_details.name.last_name,
			phone: visitor.visitor_details.phone,
			email: visitor.visitor_details.email,
			house: visitor.visitor_details.address.house,
			street: visitor.visitor_details.address.street,
			brgy: visitor.visitor_details.address.brgy,
			city: visitor.visitor_details.address.city,
			province: visitor.visitor_details.address.province,
			country: visitor.visitor_details.address.country,
			check_in: visitor.expected_time_in,
			check_out: visitor.expected_time_out,
			what: visitor.purpose.what.join(", "),
			when: visitor.purpose.when,
			where: visitor.purpose.where.join(", "),
			who: visitor.purpose.who.join(", "),
			plate_num: visitor.plate_num,
			visitor_type: visitor.visitor_type,
			status: visitor.status,
			created_at: visitor.created_at,
		};
	});

	return (
		<div className="ml-[45px] mt-[30px] flex flex-col gap-[50px]">
			<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
				<Input
					className="w-[366px]"
					size="large"
					placeholder="Search"
					prefix={<Search />}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Tooltip
					placement="top"
					title={
						hideInOut
							? "Filter Date Created"
							: "Filter Expected Time In and Out"
					}
					arrow={false}
				>
					<>
						<DateTimePicker size="large" onRangeChange={onRangeChange} />
					</>
				</Tooltip>
				<Tooltip placement="top" title="Export List" arrow={false}>
					<CSVLink
						className="ml-auto"
						filename={"Visitors_List.csv"}
						data={visitorDetailsData}
						headers={visitorDetailsHeaders}
					>
						<ExcelDownload />
					</CSVLink>
				</Tooltip>
			</div>
			<div className="mr-[50px]">
				<VisitorListTable
					search={search}
					dateSearch={dateSearch}
					hideInOut={hideInOut}
					setHideInOut={setHideInOut}
					addTab={addTab}
				/>
			</div>
		</div>
	);
};

export default function VisitorManagementLayout() {
	const [activeKey, setActiveKey]: any = useState(1);
	const newTabIndex = useRef(1);

	const { dashboardVisitor } = useSelector(
		(state: RootState) => state.visitors,
	);

	const tabs = useSelector((state: RootState) => state.visitorTabs);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchVisitors());
	}, [tabs]);

	useEffect(() => {
		if (dashboardVisitor) {
			add(dashboardVisitor);
		}
	}, []);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	const add = (record: VisitorDataType) => {
		const newActiveKey = ++newTabIndex.current;

		dispatch(addTab({ newActiveKey, visitor: record }));

		setActiveKey(newActiveKey);
	};

	const remove = (targetKey: TargetKey) => {
		const targetIndex = tabs.findIndex(
			(pane: any) => pane.key.toString() === targetKey,
		);
		const newPanes = tabs.filter(
			(pane: any) => pane.key.toString() !== targetKey,
		);

		if (newPanes.length && targetKey === activeKey.toString()) {
			const newActiveKey =
				newPanes[
					targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
				];

			setActiveKey(newActiveKey.key);
		} else setActiveKey(1);

		dispatch(removeTab(newPanes));
	};

	const onEdit = (
		targetKey: React.MouseEvent | React.KeyboardEvent | string | number,
		action: "add" | "remove",
	) => {
		if (action === "remove") remove(targetKey);
	};

	return (
		<div className="mb-[35px] ml-2 mr-[25px] mt-3 h-fit">
			<Tabs
				hideAdd
				className="h-full"
				type="editable-card"
				size="middle"
				onChange={onChange}
				activeKey={activeKey.toString()}
				onEdit={onEdit}
			>
				<Tabs.TabPane closable={false} tab="Visitor List" key="1">
					<VisitorList addTab={add} />
				</Tabs.TabPane>
				{tabs.map((tab: any) => (
					<Tabs.TabPane
						tab="Visitor Details"
						key={tab.key.toString()}
						closeIcon={<TabClose />}
					>
						<VisitorDetails
							record={tab.visitorData}
							setActiveKey={setActiveKey}
							newTabIndex={newTabIndex}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
}
