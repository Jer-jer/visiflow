import React, { useState } from "react";

// Layouts
import TodayEvents from "./today";
import UpcomingEvents from "./upcoming";

// Components
import { Input } from "antd";

// Styles
import "./styles.scss";

// Assets
import { SearchOutlined } from "@ant-design/icons";

export default function Events() {
	const [todayActive, setTodayActive] = useState(true);
	const [upcomingActive, setUpcomingActive] = useState(false);

	const switchToday = () => {
		if (!todayActive) {
			setTodayActive(!todayActive);
			setUpcomingActive(!upcomingActive);
		}
	};

	const switchUpcoming = () => {
		if (!upcomingActive) {
			setTodayActive(!todayActive);
			setUpcomingActive(!upcomingActive);
		}
	};

	return (
		<div className="flex flex-col gap-[50px] pb-[50px]">
			<div className="mt-[62px] flex flex-col justify-around gap-[30px] lg:flex-row">
				<div className="flex h-[55px] items-center justify-center gap-[23px] lg:justify-between">
					<span className="event-title font-[500] text-[#1B3B22] md:text-[36px]">
						Events
					</span>
					<div className="flex">
						<div
							className={`tab-size flex cursor-pointer items-center justify-center rounded-l-[5px] border border-[#808080] md:h-[40px] md:w-[170px] ${
								todayActive
									? "bg-primary-500 text-white"
									: "bg-transparent text-[#5e5e5e]"
							} text-[16px] font-[400]`}
							onClick={switchToday}
						>
							<span>Today</span>
						</div>
						<div
							className={`tab-size flex cursor-pointer items-center justify-center rounded-r-[5px] border border-[#808080] md:h-[40px] md:w-[170px] ${
								upcomingActive
									? "bg-primary-500 text-white"
									: "bg-transparent text-[#5e5e5e]"
							} text-[16px] font-[400]`}
							onClick={switchUpcoming}
						>
							<span>Upcoming</span>
						</div>
					</div>
				</div>
				<div className="flex w-full items-center justify-center lg:w-auto">
					<Input
						className="search-input md:w-[60%] lg:w-[350px]"
						size="large"
						placeholder="Search"
						prefix={<SearchOutlined />}
					/>
				</div>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-[25px]">
				{todayActive ? (
					<TodayEvents
						events={[
							{
								header: {
									title: "Charity Drive",
									startDate: new Date("2023-04-30T14:00:00Z"),
									endDate: new Date("2023-04-30T17:00:00Z"),
									loc: "Bldg. 1, 4th Floor, Rm 105",
								},
								desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
								img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
							},
							{
								header: {
									title: "President Speech",
									startDate: new Date("2023-04-30T14:00:00Z"),
									endDate: new Date("2023-04-31T17:00:00Z"),
									loc: "Bldg. 1, 4th Floor, Rm 105",
								},
								desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
								img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
							},
						]}
					/>
				) : (
					upcomingActive && (
						<UpcomingEvents
							events={[
								{
									header: {
										title: "President Speech",
										startDate: new Date("2023-04-30T14:00:00Z"),
										endDate: new Date("2023-04-30T17:00:00Z"),
										loc: "Bldg. 1, 4th Floor, Rm 105",
									},
									desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
									img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
								},
								{
									header: {
										title: "Charity Drive",
										startDate: new Date("2023-04-30T14:00:00Z"),
										endDate: new Date("2023-04-31T17:00:00Z"),
										loc: "Bldg. 1, 4th Floor, Rm 105",
									},
									desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
									img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
								},
							]}
						/>
					)
				)}
				{/* <EventCard
					header={{
						title: "Charity Drive",
						date: "April 30, 2023 | 2:00 PM to 5:00 PM",
						loc: "Bldg. 1, 4th Floor, Rm 105",
					}}
					desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur."
				>
					<img
						className="max-h-[233px]"
						alt="example"
						src="https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
					/>
				</EventCard>

				<EventCard
					header={{
						title: "President Speech",
						date: "April 30, 2023 | 2:00 PM to 5:00 PM",
						loc: "Bldg. 1, 4th Floor, Rm 105",
					}}
					desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur."
				>
					<img
						className="max-h-[233px]"
						alt="example"
						src="https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
					/>
				</EventCard> */}
			</div>
		</div>
	);
}
