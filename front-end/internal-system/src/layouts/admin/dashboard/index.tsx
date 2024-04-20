import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";

// Interfaces
import { VisitorStatus } from "../../../utils/enums";
import type { DatePickerProps } from "antd";

//Components
import { Modal } from "antd";
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";
import { VisitorDataType } from "../../../utils/interfaces";
import AxiosInstance from "../../../lib/axios";
import { fetchStats } from "../../../states/stats";
import { AppDispatch, RootState } from "../../../store";

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

export default function DashboardLayout() {
	const { data } = useSelector((state: any) => state.visitors);

	const visitorStatSummary = useSelector(
		(state: RootState) => state.visitorStatSummary,
	);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		AxiosInstance.post("/stats")
			.then((res: any) => {
				let currentTotal =
					localStorage.getItem("total-count") || visitorStatSummary.total;
				let currentPreReg =
					localStorage.getItem("pre-reg-count") ||
					visitorStatSummary.preRegCount;
				let currentWalkIn =
					localStorage.getItem("walk-in-count") ||
					visitorStatSummary.walkInCount;

				currentTotal =
					typeof currentTotal === "string"
						? parseInt(currentTotal)
						: currentTotal;
				currentPreReg =
					typeof currentPreReg === "string"
						? parseInt(currentPreReg)
						: currentPreReg;
				currentWalkIn =
					typeof currentWalkIn === "string"
						? parseInt(currentWalkIn)
						: currentWalkIn;

				dispatch(
					fetchStats({
						total: res.data.total,
						preRegCount: res.data.pre_reg,
						walkInCount: res.data.walk_in,
						majorityType: res.data.type,
						majorityTypePercent: res.data.percent,
						rise: res.data.total >= currentTotal ? true : false,
						walkInRise: res.data.walk_in >= currentWalkIn ? true : false,
						preRegRise: res.data.pre_reg >= currentPreReg ? true : false,
					}),
				);

				localStorage.setItem("total-count", res.data.total.toString());
				localStorage.setItem("pre-reg-count", res.data.pre_reg.toString());
				localStorage.setItem("walk-in-count", res.data.walk_in.toString());
			})
			.catch((err) => {
				if (err && err.response) {
					const message = err.response.data.error;
					error(message);
				}
			});
	}, []);

	const calculatePercentage = (part: number, total: number) => {
		return (part / total) * 100;
	};

	const formatDateStringToISO = (date: string) => {
		let dt = DateTime.fromFormat(date, "yyyy-MM-dd hh:mm a");

		let dtUTC = dt.setZone("utc");

		return dtUTC.toString();
	};

	const onChange: DatePickerProps["onChange"] = async (date, dateString) => {
		const startDate = dateString[0]
			? formatDateStringToISO(dateString[0])
			: undefined;
		const endDate = dateString[1]
			? formatDateStringToISO(dateString[1])
			: undefined;

		await AxiosInstance.post("/stats", {
			startDate,
			endDate,
		})
			.then((res: any) => {
				dispatch(
					fetchStats({
						total: res.data.total,
						preRegCount: res.data.pre_reg,
						walkInCount: res.data.walk_in,
						majorityType: res.data.type,
						majorityTypePercent: res.data.percent,
						rise: res.data.total >= visitorStatSummary.total ? true : false,
						walkInRise:
							res.data.walk_in >= visitorStatSummary.walkInCount ? true : false,
						preRegRise:
							res.data.pre_reg >= visitorStatSummary.preRegCount ? true : false,
					}),
				);
			})
			.catch((err) => {
				if (err && err.response) {
					const message = err.response.data.error;
					error(message);
				}
			});
	};

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
							bigNumber={visitorStatSummary.total.toString()}
							bigNumberStatus={`${visitorStatSummary.rise ? "text-primary-500" : "text-[#FD4A4A]"}`}
							withDateFilter={true}
							onChange={onChange}
							secondaryStatsProps={[
								{
									label: "Type",
									calculation: visitorStatSummary.majorityType,
								},
								{
									label: "Percentage",
									calculation: visitorStatSummary.majorityTypePercent,
								},
							]}
						/>
					</InnerContainer>
					<InnerContainer additionalStyles="mb-[50px] mt-[30px] flex items-center justify-center gap-10">
						<div className="w-[47.5%] rounded-[10px] border border-[#D0D2CC]">
							<StatisticsSummaryContent
								title="total walk-in visitors"
								bigNumber={visitorStatSummary.walkInCount.toString()}
								bigNumberStatus={`${visitorStatSummary.walkInRise ? "text-primary-500" : "text-[#FD4A4A]"} `}
								secondaryStatsProps={[
									{
										label: "Percentage",
										calculation: `${Math.round(calculatePercentage(visitorStatSummary.walkInCount, visitorStatSummary.total))}%`,
									},
								]}
							/>
						</div>
						<div className="w-[47.5%] rounded-[10px] border border-[#D0D2CC]">
							<StatisticsSummaryContent
								title="total registered visitorss"
								bigNumber={visitorStatSummary.preRegCount.toString()}
								bigNumberStatus={`${visitorStatSummary.preRegRise ? "text-primary-500" : "text-[#FD4A4A]"} `}
								secondaryStatsProps={[
									{
										label: "Percentage",
										calculation: `${Math.round(calculatePercentage(visitorStatSummary.preRegCount, visitorStatSummary.total))}%`,
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
