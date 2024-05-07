import React, { useState } from "react";

//Interfaces
import type { Dayjs } from "dayjs";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import CurrentVisitorsTable from "../../../components/table/current-visitors";
import { Input } from "antd";
import DateTimePicker from "../../../components/datetime-picker";

//Assets
import { Search } from "../../../assets/svg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function VisitorStatusLayout() {
	const desktopMedia = window.matchMedia("(min-width: 1024px)");

	const [search, setSearch] = useState<string>("");
	const [dateSearch, setDateSearch] = useState<string[]>([]);
	//const [hideInOut, setHideInOut] = useState<boolean>(true);

	const onRangeChange = (dates: Dayjs[], dateStrings: string[]) => {
		if (dates) {
			setDateSearch([dateStrings[0], dateStrings[1]]);
		} else {
			setDateSearch([]);
		}
	};

	return (
		<div className="mx-3 mb-[35px] mt-3 flex md:ml-2 md:mr-[25px]">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="CURRENT VISITORS">
					<InnerContainer>
						<div className="mb-[50px] ml-[15px]">
							<div className="flex w-full flex-col items-center justify-start gap-[25px] pr-[65px] md:flex-row">
								<Input
									className="w-[202.4px] md:w-[366px]"
									size={desktopMedia.matches ? "large" : "middle"}
									placeholder="Search"
									prefix={<Search />}
									onChange={(e) => setSearch(e.target.value)}
								/>

								<DateTimePicker
									size={desktopMedia.matches ? "large" : "middle"}
									onRangeChange={onRangeChange}
								/>
							</div>
						</div>
						<CurrentVisitorsTable search={search} dateSearch={dateSearch} />
					</InnerContainer>
				</OuterContainer>
			</div>
		</div>
	);
}
