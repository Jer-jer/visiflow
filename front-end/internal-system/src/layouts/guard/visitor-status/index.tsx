import React, { useState } from "react";

//Interfaces
import type { Dayjs } from "dayjs";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import CurrentVisitorsTable from "../../../components/table/current-visitors";

//Assets

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function VisitorStatusLayout() {

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="CURRENT VISITORS">
					<InnerContainer>
						{/* <div className="mb-[50px] ml-[15px]">
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
						</div> */}
						<CurrentVisitorsTable />
					</InnerContainer>
				</OuterContainer>
			</div>
		</div>
	);
}
