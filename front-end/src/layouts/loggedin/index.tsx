import React from "react";

//Components
import Navbar from "../../components/navbar";
import Sidebar, { SidebarItem } from "../../components/sidebar";

//Assets
import {
	Home,
	PieChart,
	Calendar,
	UserGroup,
	Users,
	Edit,
} from "../../assets/svg";

//Styles
import "./styles.scss";

function LoggedIn() {
	return (
		<div>
			{/* <Navbar /> */}
			<Sidebar>
				<SidebarItem icon={<Home />} text="Dashboard" />
				<SidebarItem icon={<PieChart />} text="Statistics" active />
				<SidebarItem icon={<Calendar />} text="Schedules" />
				<SidebarItem icon={<UserGroup />} text="Visitor Management" />
				<SidebarItem icon={<Users />} text="Manage Users" />
				<SidebarItem icon={<Edit />} text="Visitor Home Editor" />
			</Sidebar>
		</div>
	);
}

export default LoggedIn;
