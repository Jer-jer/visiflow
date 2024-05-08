/* Components designed using Ant Design */
import React, { useEffect, useRef, useState } from "react";

import { VisitorDataType } from "../../../utils/interfaces";

//Components
import { Tabs, Button, Input, Tooltip, Checkbox } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import ScheduleListTable from "../../../components/table/schedule-list";
import ScheduleDetails from "./schedule-details";

// Store
import { AppDispatch, RootState } from "../../../store";
import type { Dayjs } from "dayjs";

// Reducers
import { fetchVisitors } from "../../../states/visitors";
import { fetchBadges } from "../../../states/badges";
import { addTab, removeTab } from "../../../states/badges/tab";

//Styles
import "./styles.scss";

//Assets
import { Search, TabClose } from "../../../assets/svg";
import { useDispatch, useSelector } from "react-redux";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface ScheduleProps {
	addTab: () => void;
	createSched: () => void;
}

interface TabItems {
	key: TargetKey;
	visitorData?: VisitorDataType;
}

const options = [
	{ label: "Past", value: "past" },
	{ label: "Current", value: "current" },
	{ label: "Upcoming", value: "upcoming" },
];

export default function ScheduleManagement() {
	const [search, setSearch] = useState<string>("");
	const [activeKey, setActiveKey]: any = useState(1);
	const newTabIndex = useRef(1);
	const [hideInOut, setHideInOut] = useState<boolean>(true);
	const [dateSearch, setDateSearch] = useState<string[]>([]);
	const [checkedList, setCheckedList] = useState<string[]>(["current"]);

	const tabs = useSelector((state: RootState) => state.badgesTab);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchVisitors());
		dispatch(fetchBadges());
	}, [tabs]);

	const { dashboardBadge } = useSelector((state: RootState) => state.badges);

	useEffect(() => {
		if (dashboardBadge) {
			add(dashboardBadge);
		}
	}, []);

	const add = (record: VisitorDataType) => {
		const newActiveKey = newTabIndex.current + 1;
		newTabIndex.current++;

		dispatch(addTab({ newActiveKey, visitor: record }));

		setActiveKey(newActiveKey);
	};

	const onChange = (newActiveKey: string) => {
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

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
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
				<Tabs.TabPane closable={false} tab="Schedule List" key="1">
					<div className="ml-[45px] mt-[30px] flex flex-col gap-[25px]">
						<div className="flex w-full flex-col items-center justify-start gap-[25px] pr-[65px] md:flex-row">
							<Input
								className="md:w-[366px]"
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
						</div>
						<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
							<Checkbox.Group
								options={options}
								value={checkedList}
								onChange={setCheckedList}
							/>
						</div>
						<div className="mr-[50px]">
							<ScheduleListTable
								addTab={add}
								dateSearch={dateSearch}
								hideInOut={hideInOut}
								setHideInOut={setHideInOut}
								search={search}
								checkedList={checkedList}
							/>
						</div>
					</div>
				</Tabs.TabPane>
				{tabs.map((tab, key) => (
					<Tabs.TabPane
						tab="Schedule Details"
						key={tab.key.toString()}
						closeIcon={<TabClose />}
					>
						<ScheduleDetails
							record={tab.visitorData}
							activeKey={activeKey}
							setActiveKey={setActiveKey}
							newTabIndex={newTabIndex}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
}
