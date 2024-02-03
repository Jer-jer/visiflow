import React from "react";

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
import Schedules from './pages/admin/schedules';

//Guard
import Capture from "./pages/guard/capture";
import VisitorForm from "./pages/guard/visitor-form";
import WalkinQR from "./pages/guard/walkin-qr";
import PreregisteredQR from "./pages/guard/preregistered-qr";
import VisitorStatus from "./pages/guard/visitor-status";

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
					<Route path="/home-editor" element={<HomeEditor />} />
					<Route path="/capture" element={<Capture />} />
					<Route path="/visitor-form" element={<VisitorForm />} />
					<Route path="/walkin-qr" element={<WalkinQR />} />
					<Route path="/preregistered-qr" element={<PreregisteredQR />} />
					<Route path="/visitor-status" element={<VisitorStatus />} />
				</Routes>
			</LoggedIn>
		</div>
	);
}

export default App;
