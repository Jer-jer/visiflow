import React, { useRef, useState } from "react";

//Interfaces
import { VisitorDetailsProps } from "../../../utils";

//Components
import { Tabs, Button } from "antd";
import SearchInput from "../../../components/fields/input/searchInput";
import DateTimePicker from "../../../components/datetime-picker";
import AdminTable from "../../../components/table";
import VisitorDetails from "../visitor-details";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface VisitorProps {
	addTab: () => void;
}

interface TabItems {
	key: TargetKey;
	visitorData?: VisitorDetailsProps;
}

const VisitorList = ({ addTab }: VisitorProps) => {
	return (
		<div className="ml-[45px] flex flex-col gap-[90px]">
			<div className="flex w-full items-center justify-end gap-[25px] pr-[65px]">
				<SearchInput placeHolder="Search" globalStyling="w-[366px]" />
				<DateTimePicker size="large" />
				<Button type="primary" className="search-button !bg-primary-500">
					Search
				</Button>
				<ExcelDownload />
			</div>
			<div className="mr-[50px]">
				<AdminTable addTab={addTab} />
			</div>
		</div>
	);
};

export default function VisitorManagementLayout() {
	const [items, setItems] = useState<TabItems[]>([]);
	const [activeKey, setActiveKey]: any = useState(1);
	const newTabIndex = useRef(1);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	const add = (record?: VisitorDetailsProps) => {
		const newActiveKey = ++newTabIndex.current;

		console.log(record);

		setItems([
			...items,
			{
				key: newActiveKey,
				visitorData: record,
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
				{items.map((items, key) => (
					<Tabs.TabPane
						tab="Visitor Details"
						key={items.key.toString()}
						closeIcon={<TabClose />}
					>
						<VisitorDetails
							fullName={items.visitorData?.fullName}
							mobile={items.visitorData?.mobile}
							email={items.visitorData?.email}
							houseNo={items.visitorData?.houseNo}
							city={items.visitorData?.city}
							street={items.visitorData?.street}
							province={items.visitorData?.province}
							brgy={items.visitorData?.brgy}
							country={items.visitorData?.country}
							timeIn={items.visitorData?.timeIn}
							timeOut={items.visitorData?.timeOut}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
}
