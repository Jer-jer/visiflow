import React, { useState } from "react";

// Styles
import "./styles.scss";
import "hamburgers/dist/hamburgers.css";

// Assets
import LogoImage from "../../assets/logo.png";

export default function Navbar() {
	const [expand, setExpand] = useState(false);

	return (
		<div
			className={`main-nav h-[inherit] items-center justify-around lg:ml-[200px] lg:mr-[300px] lg:flex lg:justify-between ${
				expand && "!shadow-transparent"
			}`}
		>
			<div className="logo ml-[30px] pb-[20px] pt-[15px] lg:ml-0 lg:pb-0 lg:pt-0">
				<img src={LogoImage} alt="Logo" className="logo-img md:h-[60px]" />
			</div>
			<div className="nav-icon absolute right-8 top-5 lg:hidden">
				<button
					className={`hamburger hamburger--squeeze ${expand && "is-active"}`}
					onClick={() => setExpand(!expand)}
					type="button"
					title="button"
				>
					<span className="hamburger-box">
						<span className="hamburger-inner"></span>
					</span>
				</button>
			</div>
			<div
				className={`nav-links absolute left-0 flex w-full flex-col gap-[10px] bg-white pb-[15px] pl-[40px] shadow-lg transition-all duration-500 ease-in-out sm:items-start lg:static lg:w-auto lg:flex-row lg:gap-[100px] lg:pb-0 lg:pl-0 lg:opacity-100 lg:shadow-transparent ${
					expand ? "nav-links-expanded sm:top-20" : "-top-[490px]"
				}`}
			>
				<button>
					<span className="item">Home</span>
				</button>
				<button>
					<span className="item">Pre-Register</span>
				</button>
				<button>
					<span className="item">Office</span>
				</button>
				<button>
					<span className="item">Events</span>
				</button>
			</div>
		</div>
	);
}
