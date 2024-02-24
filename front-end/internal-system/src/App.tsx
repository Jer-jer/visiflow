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
