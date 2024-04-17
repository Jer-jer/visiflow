import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";

// Interfaces
import type { CheckboxProps } from "antd";
import { RootState } from "../../../store";
import { AppDispatch } from "../../../store";
import type { DatePickerProps } from "antd";

//Components
import { Checkbox, Modal } from "antd";
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import StatisticsSummaryContentAlt from "../../../components/stats-smmry-ctnt/alternative";
import Select from "../../../components/select";

//Reducers
import { fetchStats } from "../../../states/stats";

//Libs
import AxiosInstance from "../../../lib/axios";

//Utils
import { formatDateString } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface MostCommonReasonProps {
	what: string;
	who: string;
	when: string;
	where: string;
}

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

export default function StatisticsLayout() {
	const [month, setMonth] = useState(false);
	const [year, setYear] = useState(false);

	const [months, setMonths] = useState<[{ value: string; label: string }]>();
	const [years, setYears] = useState<[{ value: string; label: string }]>();

	const [mostCommonReason, setMostCommonReason] =
		useState<MostCommonReasonProps>({
			what: "",
			who: "",
			when: "",
			where: "",
		});

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

	useEffect(() => {
		AxiosInstance.post("/stats/location")
			.then((res: any) => {
				setMostCommonReason({
					what: res.data.what._id,
					who: res.data.who._id,
					when: res.data.when._id,
					where: res.data.where._id,
				});
			})
			.catch((err) => {
				if (err && err.response) {
					const message = err.response.data.error;
					error(message);
				}
			});
	}, []);

	useEffect(() => {
		AxiosInstance.get("/stats/getYears").then((res: any) => {
			const months = res.data._months
				.sort((a: string, b: string) => parseInt(a) - parseInt(b))
				.map((month: string) => {
					switch (month) {
						case "01": {
							return { value: month, label: "January" };
						}
						case "02": {
							return { value: month, label: "Febuary" };
						}
						case "03": {
							return { value: month, label: "March" };
						}
						case "04": {
							return { value: month, label: "April" };
						}
						case "05": {
							return { value: month, label: "May" };
						}
						case "06": {
							return { value: month, label: "June" };
						}
						case "07": {
							return { value: month, label: "July" };
						}
						case "08": {
							return { value: month, label: "August" };
						}
						case "09": {
							return { value: month, label: "September" };
						}
						case "10": {
							return { value: month, label: "October" };
						}
						case "11": {
							return { value: month, label: "November" };
						}
						case "12": {
							return { value: month, label: "December" };
						}
						default: {
							return { value: "", label: "" };
						}
					}
				});
			const years = res.data._years
				.sort((a: string, b: string) => parseInt(a) - parseInt(b))
				.map((years: string) => ({ value: years, label: years }));

			setMonths(months);
			setYears(years);
		});
	}, []);

	useEffect(() => {
		AxiosInstance.post("/stats/getPerYear", { year: "2024" })
			.then((res: any) => {
				console.log(res.data);
			})
			.catch((err) => {
				if (err && err.response) {
					const message = err.response.data.error;
					error(message);
				}
			});
	}, []);

	const onChangeMonth: CheckboxProps["onChange"] = (e) => {
		setMonth(e.target.checked);
	};

	const onChangeYear: CheckboxProps["onChange"] = (e) => {
		setYear(e.target.checked);
	};

	const handleChangeMonth = async (value: string) => {
		console.log(`selected ${value}`);
	};

	const handleChangeYear = (value: string) => {
		console.log(`selected ${value}`);
	};

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

	const onChangeMostCommonReason: DatePickerProps["onChange"] = async (
		date,
		dateString,
	) => {
		const startDate = dateString[0]
			? formatDateStringToISO(dateString[0])
			: undefined;
		const endDate = dateString[1]
			? formatDateStringToISO(dateString[1])
			: undefined;

		await AxiosInstance.post("/stats/location", {
			startDate,
			endDate,
		})
			.then((res: any) => {
				console.log("Most common reason for visit", res.data);
				setMostCommonReason({
					what: res.data.what._id,
					who: res.data.who._id,
					when: res.data.when._id,
					where: res.data.where._id,
				});
			})
			.catch((err) => {
				if (err && err.response) {
					const message = err.response.data.error;
					error(message);
				}
			});
	};

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
				{/* Summary Statistics */}
				<OuterContainer header="Summary">
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
			<div className="w-full">
				{/* Most Visited Statistics */}
				<OuterContainer header="Summary">
					{/* <InnerContainer additionalStyles="rounded-[10px] border border-[#D0D2CC]">
						<StatisticsSummaryContentAlt
							title="most visited"
							statisticsAltDetails={[
								{
									label: "Location",
									input: mostCommonReason.where,
								},
								{
									label: "Date",
									input: formatDateString(mostCommonReason.when),
								},
								{
									label: "Person",
									input: mostCommonReason.who,
								},
							]}
						/>
					</InnerContainer> */}
					{/* Most common reasons */}
					<InnerContainer additionalStyles="mb-[50px] mt-[30px] rounded-[10px] border border-[#D0D2CC]">
						<StatisticsSummaryContentAlt
							title="most common reasons for visit"
							onChange={onChangeMostCommonReason}
							statisticsAltDetails={[
								{
									label: "What",
									input: mostCommonReason.what,
								},
								{
									label: "Who",
									input: mostCommonReason.who,
								},
								{
									label: "When",
									input: formatDateString(mostCommonReason.when),
								},
								{
									label: "Where",
									input: mostCommonReason.where,
								},
							]}
						/>
					</InnerContainer>
				</OuterContainer>
			</div>
			<div className="w-full">
				{/* WALK-IN VS REGISTERED */}
				<OuterContainer
					header={"WALK-IN VS REGISTERED VISITORS"}
					headerStyling="text-lg tracking-[1.47px]"
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
						<Checkbox
							className="statistics-checkbox flex items-center"
							onChange={onChangeMonth}
						>
							Month
						</Checkbox>

						<Checkbox
							className="statistics-checkbox flex items-center"
							onChange={onChangeYear}
						>
							Year
						</Checkbox>
						{month && (
							<Select
								options={months}
								label="Month"
								handleChange={handleChangeMonth}
							/>
						)}
						{year && (
							<Select
								options={years}
								label="Year"
								handleChange={handleChangeYear}
							/>
						)}

						{/* Alternative TBD */}
						{/* <DatePicker placeholder="Month" size={"middle"} picker="month" />
						<DatePicker placeholder="Year" size={"middle"} picker="year" /> */}
					</div>
				</OuterContainer>
			</div>
		</div>
	);
}
