import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Layouts
import LoggedIn from "./layouts/logged-in";

/* Pages */
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

//Assets
import { LoadingOutlined } from "@ant-design/icons";

//Styles
import "./App.scss";

function App() {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const decoded: any = jwtDecode(token);
			setIsLoggedIn(true);

			if (decoded.role === "admin") {
				setIsAdmin(true);
			}
		}
		setLoading(false);
	}, []);

	return (
		<div className="min-h-screen">
			{loading ? (
				<div className="flex h-[100vh] items-center justify-center">
					<LoadingOutlined className="text-[128px] text-primary-500" />
				</div>
			) : isLoggedIn ? (
				<LoggedIn
					setIsLoggedIn={setIsLoggedIn}
					isAdmin={isAdmin}
					setIsAdmin={setIsAdmin}
				>
					<Routes>
						{isAdmin ? (
							<>
								<Route path="/" element={<Dashboard />} />
								<Route path="/statistics" element={<Statistics />} />
								<Route
									path="/visitor-management"
									element={<VisitorManagement />}
								/>
								<Route path="/manage-users" element={<UserManagement />} />
								<Route path="/home-editor" element={<HomeEditor />} />
								<Route path="/schedules" element={<Schedules />} />
							</>
						) : (
							<>
								<Route
									path="/"
									element={<span>Guard System Routes Here</span>}
								/>
							</>
						)}
						<Route path="*" element={<UnknownPage />} />
					</Routes>
				</LoggedIn>
			) : (
				<Routes>
					<Route
						path="/"
						element={
							<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
						}
					/>
					<Route path="*" element={<UnknownPage />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
