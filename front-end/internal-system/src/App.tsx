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

//Guard
import VisitorForm from "./pages/guard/visitor-form";
import QRScanner from "./pages/guard/qr-scanner";
import PreregisteredQR from "./pages/guard/preregistered-qr";
import VisitorStatus from "./pages/guard/visitor-status";

//Styles
import "./App.scss";

function App() {
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
	}, []);

	return (
		<div className="min-h-screen">
			{isLoggedIn ? (
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
							</>
						) : (
							<>
								<Route path="/" element={<QRScanner />} />
								<Route path="/visitor-form" element={<VisitorForm />} />
								<Route path="/preregistered-qr" element={<PreregisteredQR />} />
								<Route path="/visitor-status" element={<VisitorStatus />} />
							</>
						)}
						{/*//TODO enchance error 404 page */}
						<Route path="*" element={<span>Error</span>} />
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
					<Route path="*" element={<span>Error</span>} />
				</Routes>
			)}
		</div>
	);
}

export default App;
