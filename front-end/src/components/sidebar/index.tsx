import React, { useState, createContext, useContext } from "react";

//Assets
import { Hamburger, ArrowLeft } from "../../assets/svg";

//Styles
import "./styles.scss";

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
		<div className={`h-screen  ${expanded ? "sb" : "w-fit overflow-hidden"}`}>
			<nav className="flex h-full flex-col">
				<div
					className={`flex items-center p-4 pb-2 ${
						expanded ? "justify-end transition-all" : "justify-center"
					}`}
				>
					<button
						onClick={() => setExpanded((curr) => !curr)}
						className="py-1.5 hover:text-primary-500"
					>
						{expanded ? <ArrowLeft /> : <Hamburger />}
					</button>
				</div>

				<SideBarContext.Provider value={{ expanded }}>
					<ul
						className={`sb-children flex-1 px-3 ${
							expanded ? "sb-children-expanded transition-all" : null
						}`}
					>
						{children}
					</ul>
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
				expanded
					? active
						? "bg-gradient-to-tr from-primary-200 to-primary-100 text-primary-800"
						: "text-gray-60 hover:bg-primary-100"
					: "sb-item-active"
			}`}
		>
			{icon}
			<span
				className={`sb-item overflow-hidden text-base transition-all ${
					expanded ? "ml-3 w-52" : "w-0"
				}`}
			>
				{expanded ? text : null}
			</span>
		</li>
	);
}
