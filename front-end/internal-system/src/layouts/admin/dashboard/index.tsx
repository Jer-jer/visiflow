import React from "react";
import { useSelector } from "react-redux";

// Interfaces
import { VisitorStatus } from "../../../utils/enums";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";

//Assets

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";
import { VisitorDataType } from "../../../utils/interfaces";

export default function DashboardLayout() {
	const { data } = useSelector((state: any) => state.visitors);

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer
					containerStyling="overflow-auto h-[100dvh]"
					header="Summary"
				>
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
				<OuterContainer
					containerStyling="h-[100dvh]"
					header="Pending Appointments"
				>
					<PendingAppointments
						pendingAppointments={data.filter(
							(visitor: VisitorDataType) =>
								visitor.status === VisitorStatus.InProgress,
						)}
					/>
				</OuterContainer>
			</div>
		</div>
	);
}
