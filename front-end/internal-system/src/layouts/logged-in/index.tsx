import React, { useLayoutEffect, useRef, useState, createContext } from "react";
import { NavLink } from "react-router-dom";

//Components
import Header from "../../components/header";
import Sidebar, { SidebarItem } from "../../components/sidebar";

//Interfaces

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

export const WidthContext = createContext(0);

interface LoggedInProps {
	isAdmin: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export let expandedWidth: number;

function LoggedIn({
	isAdmin,
	setIsLoggedIn,
	setIsAdmin,
	children,
}: LoggedInProps) {
	const [expanded, setExpanded] = useState(false);
	const [width, setWidth] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (ref.current) {
			const { clientWidth } = ref.current;
			setWidth(clientWidth);
		}
	}, [width, expanded]);

	return (
		<WidthContext.Provider value={width}>
			<div className="flex h-60">
				<Sidebar expanded={expanded} setExpanded={setExpanded}>
					{isAdmin ? (
						<>
							<NavLink to="/">
								{({ isActive }) => (
									<SidebarItem
										icon={<Home />}
										text="Dashboard"
										active={isActive}
									/>
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
						</>
					) : (
						<></>
					)}
				</Sidebar>
				<div className="h-fit min-w-0 flex-1">
					<div>
						<Header setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
					</div>
					{/* Main content Here */}
					<div id="parentDiv" className="children" ref={ref}>
						{children}
					</div>
				</div>
			</div>
		</WidthContext.Provider>
	);
}

export default LoggedIn;
