import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/navbar";

// Layout
import Home from "./layouts/home";
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
									Office
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
					<Route path="/pre-register" element={<div>Pre-register</div>} />
					<Route path="/offices" element={<div>Offices</div>} />
					<Route path="/events" element={<Events />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
