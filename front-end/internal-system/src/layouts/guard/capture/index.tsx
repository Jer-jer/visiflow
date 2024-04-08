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

export default function CaptureLayout() {
    // const [items, setItems] = useState<TabItems[]>([]);

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="ID SCAN">
					<InnerContainer>
                    <div className="mb-[35px] ml-2 flex flex-col justify-center items-center gap-20 mr-[25px] mt-3 h-fit">
						<div className="flex flex-col justify-center items-center gap-5">
							<Image
    							width={470}
								height={420}
    							src={RyanReynolds}
  							/>
							<h1>ID</h1>
							<Button
								type="primary"
								className="w-fit !rounded-[10px] !bg-primary-500"
							>
								Capture Photo
							</Button>
						</div>
						

						<div className="flex flex-col justify-center items-center gap-5">
							<Image
    							width={470}
								height={420}
    							src={RyanReynolds}
  							/>
							<h1>PLATE NUMBER (OPTIONAL)</h1>
							<Button
								type="primary"
								className="w-fit !rounded-[10px] !bg-primary-500"
							>
								Capture Photo
							</Button>
						</div>
					</div>
                    </InnerContainer>
                </OuterContainer>
            </div>
        </div>
    )
}