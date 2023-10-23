import React from "react";

// Layouts
import Navbar from "../../components/navbar";
import Home from "../home";

// Components

// Styles
import "./styles.scss";

// Assets

function MainLayout() {
	return (
		<div>
			{/* NAVBAR */}
			<div className="w-full shadow-lg lg:h-[100px]">
				<Navbar />
			</div>

			{/* MAIN CONTENT */}
			<div className="">
				<Home />
			</div>
		</div>
	);
}

export default MainLayout;
