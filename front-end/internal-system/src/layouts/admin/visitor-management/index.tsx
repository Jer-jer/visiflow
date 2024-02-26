import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

//Interfaces
import { VisitorDataType } from "../../../utils/interfaces";
import type { Dayjs } from "dayjs";

//Components
import { Tabs, Button, Input } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import VisitorListTable from "../../../components/table/visitor-list";
import VisitorDetails from "./visitor-details";

// Store
import { AppDispatch, RootState } from "../../../store";

// Reducers
import { fetchVisitors, searchVisitor } from "../../../states/visitors";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface VisitorProps {
	addTab: (record: VisitorDataType) => void;
}

export interface TabItems {
	key: TargetKey;
	visitorData: VisitorDataType;
}

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const VisitorList = ({ addTab }: VisitorProps) => {
	const [search, setSearch] = useState<string>("");
	const [dateSearch, setDateSearch] = useState<string[]>([]);

	const dispatch = useDispatch<AppDispatch>();

	const searchingVisitor = () => {
		dispatch(searchVisitor({ search: search, dateSearch: dateSearch }));
	};

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			console.log("Clear");
		}
	};

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
				<DateTimePicker size="large" onRangeChange={onRangeChange} />
				<Button
					type="primary"
					className="search-button !bg-primary-500"
					onClick={searchingVisitor}
				>
					Search
				</Button>
				<Button
					type="primary"
					className="search-button !bg-primary-500"
					onClick={() => dispatch(fetchVisitors())}
				>
					Reset
				</Button>
				<div className="ml-auto">
					<ExcelDownload />
				</div>
			</div>
			<div className="mr-[50px]">
				<VisitorListTable addTab={addTab} />
			</div>
		</div>
	);
};

export default function VisitorManagementLayout() {
	const [items, setItems] = useState<TabItems[]>([]);
	const [activeKey, setActiveKey]: any = useState(1);
	const newTabIndex = useRef(1);

	const { dashboardVisitor } = useSelector(
		(state: RootState) => state.visitors,
	);

	const dispatch = useDispatch<AppDispatch>();

	//TODO to change to real-time fetching soon
	useEffect(() => {
		dispatch(fetchVisitors());
	}, [items]);

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

		setItems((prevItems) => [
			...prevItems,
			{
				key: newActiveKey,
				visitorData: record!,
			},
		]);

		setActiveKey(newActiveKey);
	};

	const remove = (targetKey: TargetKey) => {
		const targetIndex = items.findIndex(
			(pane) => pane.key.toString() === targetKey,
		);
		const newPanes = items.filter((pane) => pane.key.toString() !== targetKey);

		if (newPanes.length && targetKey === activeKey.toString()) {
			const newActiveKey =
				newPanes[
					targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
				];

			setActiveKey(newActiveKey.key);
		} else setActiveKey(1);

		setItems(newPanes);
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
				{items.map((item) => (
					<Tabs.TabPane
						tab="Visitor Details"
						key={item.key.toString()}
						closeIcon={<TabClose />}
					>
						<VisitorDetails
							record={item.visitorData}
							items={items}
							setItems={setItems}
							setActiveKey={setActiveKey}
							newTabIndex={newTabIndex}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
}
