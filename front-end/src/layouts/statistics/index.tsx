import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

//Components
import OuterContainer from "../../components/container";
import InnerContainer from "../../components/container/inner-container";
import StatisticsSummaryContent from "../../components/stats-smmry-ctnt";
import StatisticsSummaryContentAlt from "../../components/stats-smmry-ctnt/alternative";
import Select from "../../components/select";
import { DatePicker } from "antd";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

export default function Statistics() {
	const data = [
		{
			name: "January",
			"Walk-in": 55,
			"Pre-registered": 10,
		},
		{
			name: "Febuary",
			"Walk-in": 20,
			"Pre-registered": 30,
		},
		{
			name: "March",
			"Walk-in": 0,
			"Pre-registered": 5,
		},
		{
			name: "April",
			"Walk-in": 15,
			"Pre-registered": 15,
		},
		{
			name: "May",
			"Walk-in": 6,
			"Pre-registered": 2,
		},
		{
			name: "June",
			"Walk-in": 80,
			"Pre-registered": 48,
		},
		{
			name: "July",
			"Walk-in": 20,
			"Pre-registered": 60,
		},
		{
			name: "August",
			"Walk-in": 21,
			"Pre-registered": 35,
		},
		{
			name: "September",
			"Walk-in": 42,
			"Pre-registered": 5,
		},
		{
			name: "October",
			"Walk-in": 11,
			"Pre-registered": 9,
		},
		{
			name: "November",
			"Walk-in": 22,
			"Pre-registered": 21,
		},
		{
			name: "December",
			"Walk-in": 22,
			"Pre-registered": 44,
		},
	];

	return (
		<div className="mb-[35px] ml-2 mt-3 flex flex-col gap-[35px]">
			<div className="w-full">
				<OuterContainer header="Summary" exportFile>
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
								bigNumberStatus="text-[#FD4A4A]"
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
			<div className="w-full">
				<OuterContainer header="Summary" exportFile>
					<InnerContainer additionalStyles="rounded-[10px] border border-[#D0D2CC]">
						<StatisticsSummaryContentAlt
							title="most visited"
							statisticsAltDetails={[
								{
									label: "Building",
									input: "Medicine Building",
								},
								{
									label: "Office",
									input: "Human Resources",
								},
								{
									label: "Person",
									input: "Raymond Reddington",
								},
							]}
						/>
					</InnerContainer>
					<InnerContainer additionalStyles="mb-[50px] mt-[30px] rounded-[10px] border border-[#D0D2CC]">
						<StatisticsSummaryContentAlt
							title="most common reason for visit"
							statisticsAltDetails={[
								{
									label: "What",
									input: "Meeting",
								},
								{
									label: "Who",
									input: "Raymond Reddington",
								},
								{
									label: "When",
									input: "December 12, 2023 9:55AM",
								},
								{
									label: "Where",
									input: "Medicine Building",
								},
							]}
						/>
					</InnerContainer>
				</OuterContainer>
			</div>
			<div className="w-full">
				<OuterContainer
					header={"WALK-IN VS PRE-REGISTERED VISITORS PER YEAR"}
					headerStyling="text-lg tracking-[1.47px]"
					exportFile
				>
					<div className="mb-[10px] w-[95%]">
						<ResponsiveContainer aspect={2}>
							<LineChart
								data={data}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="Walk-in" stroke="#E88B23" />
								<Line
									type="monotone"
									dataKey="Pre-registered"
									stroke="#82ca9d"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="mb-[15px]">
						<Select options="years" />
						{/* Alternative TBD */}
						{/* <DatePicker placeholder="Year" size={"middle"} picker="year" /> */}
					</div>
				</OuterContainer>
			</div>
			<div className="w-full">
				<OuterContainer
					header={"WALK-IN VS PRE-REGISTERED VISITORS PER MONTH"}
					headerStyling="text-lg tracking-[1.47px]"
					exportFile
				>
					<div className="mb-[10px] w-[95%]">
						<ResponsiveContainer aspect={2}>
							<LineChart
								data={data}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="Walk-in" stroke="#E88B23" />
								<Line
									type="monotone"
									dataKey="Pre-registered"
									stroke="#82ca9d"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="mb-[15px] flex gap-[10px]">
						<Select options="months" />
						<Select options="years" />
						{/* Alternative TBD */}
						{/* <DatePicker placeholder="Month" size={"middle"} picker="month" />
						<DatePicker placeholder="Year" size={"middle"} picker="year" /> */}
					</div>
				</OuterContainer>
			</div>
		</div>
	);
}
