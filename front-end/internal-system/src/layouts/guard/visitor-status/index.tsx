import React from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";
import { Tabs, Button, Input, Image, Divider } from "antd";

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

export default function VisitorStatusLayout() {
    // const [items, setItems] = useState<TabItems[]>([]);

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="CURRENT VISITORS">
					<InnerContainer>
                    <div className="mb-[35px] ml-2 flex flex-col justify-center items-center gap-20 mr-[25px] mt-3 h-fit">
						<div className="flex flex-col justify-center items-start gap-[3px] w-[1450px]">
							<div className="flex">
                                <h1 className="mr-[100px]">ID</h1>
                                <h1 className="mr-[300px]">Full Name</h1>
                                <h1 className="mr-[300px]">Location</h1>
                                <h1 className="mr-[180px]">Time-in</h1>
                                <h1>Time-out</h1>
                            </div>
                            <Divider/>
                            <div className="flex">
                                <h1 className="mr-[100px]">12345</h1>
                                <h1 className="mr-[300px]">Janusz Nricke Lim Omamalin</h1>
                                <h1 className="mr-[300px]">Human Resources Department</h1>
                                <h1 className="mr-[180px]">02-03-2024 02:00 PM</h1>
                                <h1>02-03-2024 06:00 PM</h1>
                            </div>
                            <Divider/>
						</div>
					</div>
                    </InnerContainer>
                </OuterContainer>
            </div>
        </div>
    )
}