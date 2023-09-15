import React, { useState, createContext, useContext } from "react";

//Assets
import { Hamburger, ArrowLeft } from "../../assets/svg";

interface SidebarProps {
	children?: React.ReactNode;
}

interface SidebarItemProps {
	icon?: React.ReactNode;
	text?: React.ReactNode;
	active?: React.ReactNode;
}

const SideBarContext = createContext<any>(undefined);

export default function Sidebar({ children }: SidebarProps) {
	const [expanded, setExpanded] = useState(true);

	return (
		<div
			className={`h-screen  ${expanded ? "w-1/5" : "w-fit overflow-hidden"}`}
		>
			<nav className="flex h-full flex-col">
				<div className="flex items-center justify-between p-4 pb-2">
					&nbsp;
					<button
						onClick={() => setExpanded((curr) => !curr)}
						className="hover:text-primary-500 rounded-lg p-1.5"
					>
						{expanded ? <ArrowLeft /> : <Hamburger />}
					</button>
				</div>

				<SideBarContext.Provider value={{ expanded }}>
					<ul className="flex-1 px-3">{children}</ul>
				</SideBarContext.Provider>
			</nav>
		</div>
	);
}

export function SidebarItem({ icon, text, active }: SidebarItemProps) {
	const { expanded } = useContext(SideBarContext);
	return (
		<li
			className={`items center group relative my-5 flex cursor-pointer rounded-md px-3 py-2 font-medium transition-colors ${
				active
					? "from-primary-200  to-primary-100 text-primary-800 bg-gradient-to-tr"
					: "hover:bg-primary-50 text-gray-600"
			}`}
		>
			{icon}
			<span
				className={`overflow-hidden transition-all ${
					expanded ? "ml-3 w-52" : "w-0"
				}`}
			>
				{expanded ? text : null}
			</span>
		</li>
	);
}
