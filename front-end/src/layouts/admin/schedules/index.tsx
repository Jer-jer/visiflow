/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Components
import { Tabs, Button, Input } from "antd";
import DateTimePicker from "../../../components/datetime-picker";


//Styles
import "./styles.scss";

//Assets

/*interface VisitorLogsProps{
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}*/

export default function SchedulesLayout() {
	return (
        <div className="ml-[45px] mt-[30px] flex flex-col gap-[50px]">
<Tabs
				hideAdd
				className="h-full"
				type="editable-card"
				size="middle"
				onChange={onChange}
				activeKey={activeKey.toString()}
				onEdit={onEdit}
			>
				<Tabs.TabPane closable={false} tab="" key="1">
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
