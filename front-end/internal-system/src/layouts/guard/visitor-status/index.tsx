import React, { useState } from "react";

//Interfaces
import type { Dayjs } from "dayjs";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import CurrentVisitorsTable from "../../../components/table/current-visitors";
import { Input, Tooltip } from "antd";
import DateTimePicker from "../../../components/datetime-picker";

//Assets
import { Search } from "../../../assets/svg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function VisitorStatusLayout() {
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
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="CURRENT VISITORS">
					<InnerContainer>
						<div className="mb-[50px] ml-[15px]">
							<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
								<Input
									className="w-[366px]"
									size="large"
									placeholder="Search"
									prefix={<Search />}
									onChange={(e) => setSearch(e.target.value)}
								/>

								<DateTimePicker size="large" onRangeChange={onRangeChange} />
							</div>
						</div>
						<CurrentVisitorsTable search={search} dateSearch={dateSearch} />
					</InnerContainer>
				</OuterContainer>
			</div>
		</div>
	);
}
