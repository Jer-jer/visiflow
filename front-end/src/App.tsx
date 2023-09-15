import React from "react";

//Pages
import LoggedIn from "./layouts/loggedin";
import Login from "./pages/login";

//Styles
import "./App.scss";

function App() {
	return (
		<div className="min-h-screen">
			<LoggedIn />
		</div>
	);
}

export default App;
