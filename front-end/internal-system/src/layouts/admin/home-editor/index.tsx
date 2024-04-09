import React, { useState } from "react";

//Interfaces

//Layouts

//Components
import { Tabs } from "antd";
import HomeList from "../../../components/table/home-editor";
import OfficeScheduleList from "../../../components/table/home-editor/office-schedule";
import EventsScheduleList from "../../../components/table/home-editor/events-schedule";
import EmployeeList from '../../../components/table/home-editor/employee-list';

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets

export default function HomeEditorLayout() {
	const [activeKey, setActiveKey]: any = useState(1);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
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
			>
				<Tabs.TabPane
					className="w-full"
					closable={false}
					tab="Home Editor"
					key="1"
				>
					<HomeList />
				</Tabs.TabPane>
				<Tabs.TabPane
					className="w-full"
					closable={false}
					tab="Office Schedules"
					key="2"
				>
					<OfficeScheduleList />
				</Tabs.TabPane>
				<Tabs.TabPane
					className="w-full"
					closable={false}
					tab="Events Schedules"
					key="3"
				>
					<EventsScheduleList />
				</Tabs.TabPane>
				<Tabs.TabPane
					className="w-full"
					closable={false}
					tab="Employee List"
					key="4"
				>
					<EmployeeList />
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
}
