/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Components
import { Tabs, Button, Input } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import ScheduleListTable from "../../../components/table/schedule-list";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

/*interface VisitorLogsProps{
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}*/

interface UserListProps {
	addTab: () => void;
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

export default function SchedulesLayout() {
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
							<ScheduleListTable addTab={() => null} editSched={() => null} />
						</div>
					</div>
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
}
