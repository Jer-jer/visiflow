import React from "react";

//Layouts
import LoggedIn from "./layouts/logged-in";

//Pages
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Statistics from "./pages/statistics";

//Styles
import "./App.scss";

function App() {
	return (
		<div className="min-h-screen">
			<LoggedIn>
				{/* <Dashboard /> */}
				<Statistics />
			</LoggedIn>
		</div>
	);
}

export default App;
