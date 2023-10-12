/* Components designed using Ant Design */
import React, { useRef, useState } from "react";

import { ScheduleDetailsProps } from "../../../utils";

//Components
import { Tabs, Button, Input } from "antd";
import ScheduleListTable from "../../../components/table/schedule-list";
import ScheduleDetails from "./schedule-details";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface ScheduleProps {
	addTab: () => void;
}

interface TabItems {
	key: TargetKey;
	scheduleData?:ScheduleDetailsProps;
	companionionsDetails?: ScheduleDetailsProps[];
}

//Functions
const createSched = () => {
	// const newActiveKey = ++newTabIndex.current;

	// setItems([
	// 	...items,
	// 	{
	// 		key: newActiveKey,
	// 		tabName: "New User",
	// 		userData: {
	// 			userId: 12345,
	// 			officeId: 54321,
	// 			fullName: {
	// 				firstName: "",
	// 				middleName: "",
	// 				lastName: "",
	// 			},
	// 			username: "12345",
	// 			email: "",
	// 			password: "12345",
	// 			mobile: "",
	// 			role: UserRole.Security,
	// 		},
	// 	},
	// ]);

	// setActiveKey(newActiveKey);
};

const SchedulesList = ({ addTab }: ScheduleProps) => {
	return (
		<div className="mb-[35px] ml-2 mr-[25px] mt-3 h-fit">
			<Tabs hideAdd className="h-full" type="editable-card" size="middle">
				<Tabs.TabPane closable={false} tab="User List" key="1">
					<div className="ml-[45px] mt-[30px] flex flex-col gap-[50px]">
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
							<Button
								type="primary"
								onClick={createSched}
								className="search-button !bg-primary-500"
							>
								Add Schedule
							</Button>
							<div className="ml-auto">
								<ExcelDownload />
							</div>
						</div>
						<div className="mr-[50px]">
							<ScheduleListTable addTab={addTab} />
						</div>
					</div>
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
}

export default function ScheduleManagement() {
	const [items, setItems] = useState<TabItems[]>([]);
	const [activeKey, setActiveKey]: any = useState(1);
	const newTabIndex = useRef(1);

	const add = (
		record?: ScheduleDetailsProps,
		companionRecords?: ScheduleDetailsProps[],
	) => { return null };

	return (
		<div className="mb-[35px] ml-2 mr-[25px] mt-3 h-fit">
			<Tabs
				hideAdd
				className="h-full"
				type="editable-card"
				size="middle"
				// onChange={onChange}
				// activeKey={activeKey.toString()}
				// onEdit={onEdit}
			>
				<Tabs.TabPane closable={false} tab="" key="1">
					<SchedulesList addTab={add} />
				</Tabs.TabPane>
				{items.map((items, key) => (
					<Tabs.TabPane
						tab="Schedule Details"
						key={items.key.toString()}
						closeIcon={<TabClose />}
					>
						<ScheduleDetails
							// record={items.visitorData}
							// companionRecords={items.companionsDetails}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
};


