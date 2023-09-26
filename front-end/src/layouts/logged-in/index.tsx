import React from "react";
import { NavLink } from "react-router-dom";

//Components
import Header from "../../components/header";
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

interface LoggedInProps {
	children: React.ReactNode;
}

function LoggedIn({ children }: LoggedInProps) {
	return (
		<div className="flex h-60">
			<Sidebar>
				<NavLink to="/">
					{({ isActive }) => (
						<SidebarItem icon={<Home />} text="Dashboard" active={isActive} />
					)}
				</NavLink>
				<NavLink to="/statistics">
					{({ isActive }) => (
						<SidebarItem
							icon={<PieChart />}
							text="Statistics"
							active={isActive}
						/>
					)}
				</NavLink>
				<NavLink to="/schedules">
					{({ isActive }) => (
						<SidebarItem
							icon={<Calendar />}
							text="Schedules"
							active={isActive}
						/>
					)}
				</NavLink>
				<NavLink to="/visitor-management">
					{({ isActive }) => (
						<SidebarItem
							icon={<UserGroup />}
							text="Visitor Management"
							active={isActive}
						/>
					)}
				</NavLink>
				<NavLink to="/manage-users">
					{({ isActive }) => (
						<SidebarItem
							icon={<Users />}
							text="Manage Users"
							active={isActive}
						/>
					)}
				</NavLink>
				<NavLink to="/home-editor">
					{({ isActive }) => (
						<SidebarItem
							icon={<Edit />}
							text="Visitor Home Editor"
							active={isActive}
						/>
					)}
				</NavLink>
			</Sidebar>
			<div className="h-fit min-w-0 flex-1">
				<div>
					<Header />
				</div>
				{/* Main content Here */}
				{children}
			</div>
		</div>
	);
}

export default LoggedIn;
