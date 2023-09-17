import React from "react";

//Layouts
import Dashboard from "../dashboard";

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
import "../../utils/variables.scss";
import "./styles.scss";

function LoggedIn() {
	return (
		<div className="flex h-60">
			<Sidebar>
				<SidebarItem icon={<Home />} text="Dashboard" />
				<SidebarItem icon={<PieChart />} text="Statistics" active />
				<SidebarItem icon={<Calendar />} text="Schedules" />
				<SidebarItem icon={<UserGroup />} text="Visitor Management" />
				<SidebarItem icon={<Users />} text="Manage Users" />
				<SidebarItem icon={<Edit />} text="Visitor Home Editor" />
			</Sidebar>
			<div className="h-fit min-w-0 flex-1">
				<div>
					<Navbar />
				</div>
				{/* Main content Here */}
				<Dashboard />
			</div>
		</div>
	);
}

export default LoggedIn;
