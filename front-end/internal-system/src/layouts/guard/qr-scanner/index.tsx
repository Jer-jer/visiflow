import React from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";
import { Tabs, Button, Input, Image } from "antd";
import Scanner from "../../../components/scanner";

//Assets
import TheRock from "../../../assets/the_rock.jpg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

// interface TabItems {
// 	key: TargetKey;
// 	visitorData?: VisitorDetailsProps;
// 	companionsDetails?: VisitorDetailsProps[];
// }

export default function QrScannerLayout() {
	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[380px] flex-auto md:w-[761px]">
				<OuterContainer header="QR SCANNER">
					<InnerContainer>
						<div className="mb-[35px] ml-[25px] mr-[25px] mt-3 flex h-fit flex-col items-center justify-center gap-20">
							<div className="flex flex-col items-center justify-center gap-5">
								<Scanner />
								<h1>PLACE THE QR INSIDE THE BOX</h1>
								{/* <h1>INVALID QR</h1> */}
							</div>
						</div>
					</InnerContainer>
				</OuterContainer>
			</div>
		</div>
	);
}
