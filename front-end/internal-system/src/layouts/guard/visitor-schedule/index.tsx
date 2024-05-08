import React, { useState } from "react";

//Interfaces


//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import CurrentVisitorsTable from "../../../components/table/current-visitors";


//Assets


//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function VisitorScheduleLayout() {
	

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="CURRENT VISITORS">
					<InnerContainer>
						<CurrentVisitorsTable />
					</InnerContainer>
				</OuterContainer>
			</div>
		</div>
	);
}
