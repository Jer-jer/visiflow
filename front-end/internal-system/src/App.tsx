import React, { useState } from "react";
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

//Guard

//Styles
import "./App.scss";

function App() {
	const [isAdmin, setIsAdmin] = useState(false);

	const token = localStorage.getItem("token");
	// const decoded = jwtDecode(token!);

	return (
		<div className="min-h-screen">
			{/* Either <Login /> or <LoggedIn></LoggedIn> depending if the user is logged in or not */}
			{token ? (
				<LoggedIn>
					{/* Add Routes here */}
					<Routes>
						<Route path="/" element={<Dashboard />} />
						{/* <Route path="/statistics" element={<Statistics />} />
					<Route path="/visitor-management" element={<VisitorManagement />} />
					<Route path="/manage-users" element={<UserManagement />} />
					<Route path="/home-editor" element={<HomeEditor />} />
					<Route path="/schedules" element={<Schedules />} /> */}
					</Routes>
				</LoggedIn>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
