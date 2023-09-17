import React from "react";

//Layouts
import LoggedIn from "./layouts/logged-in";

//Pages
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Statistics from "./pages/statistics";

//Styles
import "./App.scss";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="min-h-screen">
			<LoggedIn>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/statistics" element={<Statistics />} />
				</Routes>
			</LoggedIn>
		</div>
	);
}

export default App;
