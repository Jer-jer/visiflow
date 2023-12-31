import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/navbar";

// Layout
import Home from "./layouts/home";
import Offices from "./layouts/offices";
import PreRegister from "./layouts/pre-register";
import Events from "./layouts/events";

// Styles
import "./App.scss";

function App() {
	return (
		<>
			{/* NAVBAR */}
			<div className="w-full shadow-lg lg:h-[100px]">
				<Navbar>
					<NavLink to="/">
						{({ isActive }) => (
							<button>
								<span className={`item ${isActive ? "active" : ""}`}>Home</span>
							</button>
						)}
					</NavLink>
					<NavLink to="/pre-register">
						{({ isActive }) => (
							<button>
								<span className={`item ${isActive ? "active" : ""}`}>
									Pre-Register
								</span>
							</button>
						)}
					</NavLink>
					<NavLink to="/offices">
						{({ isActive }) => (
							<button>
								<span className={`item ${isActive ? "active" : ""}`}>
									Offices
								</span>
							</button>
						)}
					</NavLink>
					<NavLink to="/events">
						{({ isActive }) => (
							<button>
								<span className={`item ${isActive ? "active" : ""}`}>
									Events
								</span>
							</button>
						)}
					</NavLink>
				</Navbar>
			</div>

			{/* MAIN CONTENT */}
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/pre-register" element={<PreRegister />} />
					<Route path="/offices" element={<Offices />} />
					<Route path="/events" element={<Events />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
