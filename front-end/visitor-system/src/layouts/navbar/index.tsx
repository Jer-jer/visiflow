import React from "react";

// Styles
import "./styles.scss";

// Assets
import LogoImage from "../../assets/logo.png";

export default function Navbar() {
	return (
		<div className="ml-[200px] mr-[300px] flex h-[inherit] items-center justify-between">
			<div className="h-[60px]">
				<img src={LogoImage} alt="Logo" className="h-[inherit]" />
			</div>
			<div className="flex gap-[100px]">
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
