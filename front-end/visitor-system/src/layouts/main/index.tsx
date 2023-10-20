import React from "react";

// Layouts
import Navbar from "../navbar";

// Styles
import "./styles.scss";

function MainLayout() {
	return (
		<div>
			{/* NAVBAR */}
			<div className="w-full shadow-lg lg:h-[100px]">
				<Navbar />
			</div>
			{/* MAIN CONTENT */}
			<div className="">
				<h1>Main Content</h1>
			</div>
		</div>
	);
}

export default MainLayout;
