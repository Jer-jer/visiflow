import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//Layouts
import LoggedIn from "./layouts/logged-in";

/* Pages */
import NotificationsPage from "./pages/notifications";
import Login from "./pages/login";
//Admin
import Dashboard from "./pages/admin/dashboard";
import Statistics from "./pages/admin/statistics";
import VisitorManagement from "./pages/admin/visitor-management";
import UserManagement from "./pages/admin/user-management";
import HomeEditor from "./pages/admin/home-editor";
import Schedules from "./pages/admin/schedules";
import UnknownPage from "./pages/404";

//Guard
import VisitorForm from "./pages/guard/visitor-form";
import QRScanner from "./pages/guard/qr-scanner";
import PreregisteredQR from "./pages/guard/preregistered-qr";
import VisitorStatus from "./pages/guard/visitor-status";

//Assets
import { LoadingOutlined } from "@ant-design/icons";

//Styles
import "./App.scss";
import VisitorSchedule from "./pages/guard/visitor-schedule";

function App() {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		token ? setIsLoggedIn(true) : setIsLoggedIn(false);

		setLoading(false);
	}, []);

	return (
		<div className="min-h-screen">
			{loading ? (
				<div className="flex h-[100vh] items-center justify-center">
					<LoadingOutlined className="text-[128px] text-primary-500" />
				</div>
			) : isLoggedIn ? (
				<LoggedIn>
					<Routes>
						<Route path="/notifications" element={<NotificationsPage />} />
						{localStorage.getItem("mode") === "admin" ? (
							<>
								<Route path="/" element={<Navigate to="/dashboard" />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/statistics" element={<Statistics />} />
								<Route path="/schedules" element={<Schedules />} />
								<Route
									path="/visitor-management"
									element={<VisitorManagement />}
								/>
								<Route path="/manage-users" element={<UserManagement />} />
								<Route path="/home-editor" element={<HomeEditor />} />
							</>
						) : (
							<>
								<Route path="/" element={<Navigate to="/qr-scanner" />} />
								<Route path="/qr-scanner" element={<QRScanner />} />
								<Route path="/visitor-form" element={<VisitorForm />} />
								<Route path="/preregistered-qr" element={<PreregisteredQR />} />
								<Route path="/visitor-status" element={<VisitorStatus />} />
								{/* <Route path="/visitor-schedule" element={<VisitorSchedule />} /> */}
								<Route path="/schedules" element={<Schedules />} />
							</>
						)}
						<Route path="*" element={<UnknownPage />} />
					</Routes>
				</LoggedIn>
			) : (
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
