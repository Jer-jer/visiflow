import React from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";

//Assets
import TheRock from "../../../assets/the_rock.jpg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function DashboardLayout() {
	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="Summary">
					<InnerContainer additionalStyles="rounded-[10px] border border-[#D0D2CC]">
						<StatisticsSummaryContent
							title="total visitors for today"
							bigNumber="50"
							bigNumberStatus="text-primary-500"
							secondaryStatsProps={[
								{
									label: "Percentage",
									calculation: "20%",
								},
								{
									label: "Type",
									calculation: "Walk-in",
								},
							]}
						/>
					</InnerContainer>
					<InnerContainer additionalStyles="mb-[50px] mt-[30px] flex items-center justify-center gap-10">
						<div className="w-[47.5%] rounded-[10px] border border-[#D0D2CC]">
							<StatisticsSummaryContent
								title="total walk-in visitors"
								bigNumber="50"
								bigNumberStatus="text-primary-500"
								secondaryStatsProps={[
									{
										label: "Percentage",
										calculation: "20%",
									},
									{
										label: "Average",
										calculation: "5",
									},
								]}
							/>
						</div>
						<div className="w-[47.5%] rounded-[10px] border border-[#D0D2CC]">
							<StatisticsSummaryContent
								title="total pre-registered visitorss"
								bigNumber="25"
								bigNumberStatus="text-primary-500"
								secondaryStatsProps={[
									{
										label: "Percentage",
										calculation: "15%",
									},
									{
										label: "Average",
										calculation: "10",
									},
								]}
							/>
						</div>
					</InnerContainer>
				</OuterContainer>
			</div>
			<div className="w-[485px] flex-auto">
				<OuterContainer header="Pending Appointments">
					<PendingAppointments
						pendingAppointmentDetails={[
							{
								imgSrc: TheRock,
								date: "April 16, 2023 2:00 PM",
								name: "Dwayne Johnson",
								desc: "Scheduled meeting with HR",
							},
							{
								imgSrc: RyanReynolds,
								date: "April 16, 2023 2:00 PM",
								name: "Ryan Reynolds",
								desc: "Daily meeting with Executive Vice-President on 5:00 PM",
							},
							{
								imgSrc: RyanReynolds,
								date: "April 16, 2023 2:00 PM",
								name: "Ryan Reynolds",
								desc: "Daily meeting with Executive Vice-President on 5:00 PM",
							},
							{
								imgSrc: RyanReynolds,
								date: "April 16, 2023 2:00 PM",
								name: "Ryan Reynolds",
								desc: "Daily meeting with Executive Vice-President on 5:00 PM",
							},
							{
								imgSrc: RyanReynolds,
								date: "April 16, 2023 2:00 PM",
								name: "Ryan Reynolds",
								desc: "Daily meeting with Executive Vice-President on 5:00 PM",
							},
							{
								imgSrc: RyanReynolds,
								date: "April 16, 2023 2:00 PM",
								name: "Ryan Reynolds",
								desc: "Daily meeting with Executive Vice-President on 5:00 PM",
							},
						]}
					/>
				</OuterContainer>
			</div>
		</div>
	);
}
