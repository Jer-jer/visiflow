import React, { useRef, useState, Dispatch } from "react";

//Interfaces
import { DataType } from "../../../utils";

//Components
import { Tabs, Button } from "antd";
import TabPane from "rc-tabs";
import SearchInput from "../../../components/fields/input/searchInput";
import DateTimePicker from "../../../components/datetime-picker";
import AdminTable from "../../../components/table";
import VisitorDetails from "../visitor-details";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface VisitorProps {
	addTab?: () => void;
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

const initialItems = [
	{
		label: "Visitor List",
		children: <VisitorList />,
		key: "1",
		closable: false,
		closeIcon: <TabClose />,
	},
];

export default function VisitorManagementLayout() {
	const [items, setItems] = useState(initialItems);
	const [activeKey, setActiveKey]: any = useState(initialItems[0].key);
	const newTabIndex = useRef(0);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	const add = () => {
		const newActiveKey = `newTab${newTabIndex.current++}`;
		setItems([
			...items,
			{
				label: "Visitor Details",
				children: <span>Children</span>,
				key: newActiveKey,
				closable: true,
				closeIcon: <TabClose />,
			},
		]);

		setActiveKey(newActiveKey);
	};

	// let updatedItems = [...items];
	// // Find the index of the item you want to update (e.g., based on key)
	// const itemIndexToUpdate = updatedItems.findIndex((item) => item.key === "1");

	// // Check if the item was found
	// if (itemIndexToUpdate !== -1) {
	// 	// Update the 'children' property of the found item
	// 	updatedItems[itemIndexToUpdate].children = <span>Updated</span>;

	// 	// Set the updated array as the new state
	// 	setItems(updatedItems);
	// }

	const remove = (targetKey: TargetKey) => {
		const targetIndex = items.findIndex((pane) => pane.key === targetKey);
		const newPanes = items.filter((pane) => pane.key !== targetKey);
		if (newPanes.length && targetKey === activeKey) {
			const { key } =
				newPanes[
					targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
				];
			setActiveKey(key);
		}
		setItems(newPanes);
	};

	const onEdit = (
		targetKey: React.MouseEvent | React.KeyboardEvent | string,
		action: "add" | "remove",
	) => {
		if (action === "remove") {
			remove(targetKey);
		}
	};

	return (
		<div className="mb-[35px] ml-2 mr-[25px] mt-3 h-fit">
			<Tabs
				hideAdd
				className="h-full"
				type="editable-card"
				size="middle"
				defaultActiveKey="1"
				// onChange={onChange}
				// activeKey={activeKey}
				// onEdit={onEdit}
				// items={items}
			>
				<Tabs.TabPane closable={false} tab="Visitor List" key="1">
					<VisitorList />
				</Tabs.TabPane>
				<Tabs.TabPane closable={false} tab="Visitor Details" key="2">
					<VisitorList />
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
}
