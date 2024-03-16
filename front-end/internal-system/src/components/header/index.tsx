import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

//Assets
import RyanReynolds from "../../assets/ryan_reynolds.jpg";
import TheRock from "../../assets/the_rock.jpg";

//Styles
import "./styles.scss";

interface HeaderProps {
	isAdmin: boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
	isAdmin,
	setIsLoggedIn,
	setIsAdmin,
}: HeaderProps) {
	const wasAdmin = localStorage.getItem("role");
	const navigate = useNavigate();

	const logout = () => {
		wasAdmin && localStorage.removeItem("role");
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a
					href="/"
					className="header-name btn btn-ghost text-base md:text-xl normal-case hover:bg-transparent"
				>
					Gullas Visitor Management System
				</a>
			</div>
			<div className="flex-none">
				<div className="mobile-dropdown dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-circle btn-ghost hover:bg-transparent hover:text-primary-500"
					>
						<div className="indicator">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
								/>
							</svg>
							<span className="badge indicator-item badge-sm bg-red-500"></span>
						</div>
					</label>
					<ul
						tabIndex={0}
						className="h-inherit menu dropdown-content menu-sm z-[1] mt-3 bg-white p-2 shadow md:w-96"
					>
						<li>
							<div className="notif flex flex-row hover:bg-primary-500">
								<div className="avatar">
									<div className="w-14 rounded-full">
										<img src={TheRock} alt="" />
									</div>
								</div>
								<div className="flex flex-col justify-center">
									<span className="header font-medium">Dwayne Johnson</span>
									<span className="desc">
										Hasn't checkout yet and is beyond estimated check out time:{" "}
										<span className="notice text-red-400">
											9:20 AM @ HR Office in Medicine Building
										</span>
									</span>
									<span className="time text-primary mt-3">10 mins ago</span>
								</div>
							</div>
						</li>
						<li>
							<div className="notif flex flex-row hover:bg-primary-500">
								<div className="avatar">
									<div className="w-14 rounded-full">
										<img src={TheRock} alt="" />
									</div>
								</div>
								<div className="flex flex-col justify-center">
									<span className="header font-medium">Dwayne Johnson</span>
									<span className="desc">Meeting with HR @ 9:00 AM</span>
									<span className="time text-primary mt-3">10 mins ago</span>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="avatar btn btn-circle btn-ghost hover:bg-transparent"
					>
						<div className="w-10 rounded-full">
							<img src={RyanReynolds} alt="Profile Picture" />
						</div>
					</label>
					<ul
						tabIndex={0}
						className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-white p-2 shadow"
					>
						<li>
							{wasAdmin && (
								<>
									<button
										className="hover:bg-primary-500 hover:text-white"
										onClick={() => setIsAdmin(true)}
									>
										Admin System
									</button>
									<button
										className="hover:bg-primary-500 hover:text-white"
										onClick={() => setIsAdmin(false)}
									>
										Guard System
									</button>
								</>
							)}
							<button
								className="hover:bg-primary-500 hover:text-white"
								onClick={logout}
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
