import React, { useRef, useState } from "react";

//Interfaces
import { VisitorDetailsProps } from "../../../utils";

//Components
import { Tabs, Button, Input } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import VisitorListTable from "../../../components/table/visitor-list";
import VisitorDetails from "./visitor-details";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface VisitorProps {
	addTab: () => void;
}

interface TabItems {
	key: TargetKey;
	visitorData?: VisitorDetailsProps;
	companionsDetails?: VisitorDetailsProps[];
}

const VisitorList = ({ addTab }: VisitorProps) => {
	return (
		<div className="ml-[45px] mt-[30px] flex flex-col gap-[50px]">
			<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
				<Input
					className="w-[366px]"
					size="large"
					placeholder="Search"
					prefix={<Search />}
				/>
				<DateTimePicker size="large" />
				<Button type="primary" className="search-button !bg-primary-500">
					Search
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

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	const add = (
		record?: VisitorDetailsProps,
		companionRecords?: VisitorDetailsProps[],
	) => {
		const newActiveKey = ++newTabIndex.current;

		setItems([
			...items,
			{
				key: newActiveKey,
				visitorData: record,
				companionsDetails: companionRecords,
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
							record={items.visitorData}
							companionRecords={items.companionsDetails}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
}
