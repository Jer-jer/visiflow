import React, {
	useLayoutEffect,
	useRef,
	useState,
	createContext,
	useEffect,
} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

//Components
import Header from "../../components/header";
import Sidebar, { SidebarItem } from "../../components/sidebar";

// Store
import { AppDispatch } from "../../store";

// Actions
import { fetchVisitors } from "../../states/visitors";

//Assets
import {
	Home,
	PieChart,
	Calendar,
	UserGroup,
	Users,
	Edit,
	QRScanner,
	Form,
} from "../../assets/svg";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

export const WidthContext = createContext(0);

interface LoggedInProps {
	children: React.ReactNode;
}

export let expandedWidth: number;

function LoggedIn({ children }: LoggedInProps) {
	// Checks if its Desktop Or not
	const desktopMedia = window.matchMedia("(min-width: 1024px)");

	const [expanded, setExpanded] = useState(false);
	const [width, setWidth] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchVisitors());
	}, []);

	useLayoutEffect(() => {
		if (ref.current) {
			const { clientWidth } = ref.current;
			setWidth(clientWidth);
		}
	}, [width, expanded]);

	return (
		<WidthContext.Provider value={width}>
			{desktopMedia.matches ? (
				<>
					<div className="flex">
						<Sidebar expanded={expanded} setExpanded={setExpanded}>
							{localStorage.getItem("mode") === "admin" ? (
								<>
									<NavLink to="/dashboard">
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
												text="Visitor System Editor"
												active={isActive}
											/>
										)}
									</NavLink>
								</>
							) : (
								<>
									<NavLink to="/qr-scanner">
										{({ isActive }) => (
											<SidebarItem
												icon={<QRScanner />}
												text="QR Scanner"
												active={isActive}
											/>
										)}
									</NavLink>
									<NavLink to={"/visitor-form"}>
										{({ isActive }) => (
											<SidebarItem
												icon={<Form />}
												text="Visitor Form"
												active={isActive}
											/>
										)}
									</NavLink>
									<NavLink to="/visitor-status">
										{({ isActive }) => (
											<SidebarItem
												icon={<UserGroup />}
												text="Visitor Status"
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
								</>
							)}
						</Sidebar>
						<div className="flex w-full flex-col">
							<Header />
							{/* Main content Here */}
							<div id="parentDiv" className="children" ref={ref}>
								{children}
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="flex flex-col">
						<div className="flex">
							<Sidebar expanded={expanded} setExpanded={setExpanded}>
								{localStorage.getItem("mode") === "admin" ? (
									<>
										<NavLink to="/dashboard">
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
													text="Visitor System Editor"
													active={isActive}
												/>
											)}
										</NavLink>
									</>
								) : (
									<>
										<NavLink to="/qr-scanner">
											{({ isActive }) => (
												<SidebarItem
													icon={<QRScanner />}
													text="QR Scanner"
													active={isActive}
												/>
											)}
										</NavLink>
										<NavLink to={"/visitor-form"}>
											{({ isActive }) => (
												<SidebarItem
													icon={<Form />}
													text="Visitor Form"
													active={isActive}
												/>
											)}
										</NavLink>
										<NavLink to="/visitor-status">
											{({ isActive }) => (
												<SidebarItem
													icon={<UserGroup />}
													text="Visitor Status"
													active={isActive}
												/>
											)}
										</NavLink>
									</>
								)}
							</Sidebar>
							<Header expanded={expanded} />
						</div>

						{/* Main content Here */}
						<div
							id="parentDiv"
							className={`children ${expanded && "hidden"}`}
							ref={ref}
						>
							{children}
						</div>
					</div>
				</>
			)}
		</WidthContext.Provider>
	);
}

export default LoggedIn;
