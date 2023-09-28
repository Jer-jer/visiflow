import React from "react";

//Layouts
import LoggedIn from "./layouts/logged-in";

/* Pages */
import Login from "./pages/login";
//Admin
import Dashboard from "./pages/admin/dashboard";
import Statistics from "./pages/admin/statistics";
import VisitorManagement from "./pages/admin/visitor-management";
import UserManagement from "./layouts/admin/user-management";

//Guard

//Styles
import "./App.scss";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="min-h-screen">
			{/* Either <Login /> or <LoggedIn></LoggedIn> depending if the user is logged in or not */}
			{/* <Login /> */}
			<LoggedIn>
				{/* Add Routes here */}
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/statistics" element={<Statistics />} />
					<Route path="/visitor-management" element={<VisitorManagement />} />
					<Route path="/manage-users" element={<UserManagement />} />
				</Routes>
			</LoggedIn>
		</div>
	);
}

export default App;
