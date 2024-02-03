import React from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";
import { Tabs, Button, Input, Image } from "antd";

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

export default function WalkinQrLayout() {
    // const [items, setItems] = useState<TabItems[]>([]);

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="WALK-IN QR TIME-IN & TIME-OUT">
					<InnerContainer>
                    <div className="mb-[35px] ml-2 flex flex-col justify-center items-center gap-20 mr-[25px] mt-3 h-fit">
						<div className="flex flex-col justify-center items-center gap-5">
							<Image
    							width={470}
								height={420}
    							src={RyanReynolds}
  							/>
							<h1>PLACE THE QR INSIDE THE BOX</h1>
							{/* <h1>INVALID QR</h1> */}
						</div>
					</div>
                    </InnerContainer>
                </OuterContainer>
            </div>
        </div>
    )
}