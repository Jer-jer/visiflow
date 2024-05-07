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

//Assets
import { LoadingOutlined } from "@ant-design/icons";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

interface MostCommonReasonProps {
	what: string;
	who: string;
	when: string;
	where: string;
}

interface MonthDeterminerProps {
	value: string;
	label: string;
}

interface WalkInVsRegisteredProps {
	name: MonthDeterminerProps;
	"Walk-in": number;
	"Pre-registered": number;
}

const error = (message: string) => {
	Modal.error({
		title: `Error`,
		content: message,
		className: "error-modal",
	});
};

const monthDeterminer = (month: string) => {
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
};

export default function StatisticsLayout() {
	const [month, setMonth] = useState(false);
	const [year, setYear] = useState(false);

	const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
		undefined,
	);
	const [selectedYear, setSelectedYear] = useState<string | undefined>(
		undefined,
	);

	const [months, setMonths] = useState<[{ value: string; label: string }]>();
	const [years, setYears] = useState<[{ value: string; label: string }]>();

	const [daysOfMonth, setDaysOfMonth] = useState<
		{
			day: string;
			walkin: number;
			preregistered: number;
		}[]
	>([]);

	const [loading, setLoading] = useState(false);

	const [data, setData] = useState<WalkInVsRegisteredProps[]>([
		{
			name: monthDeterminer("01"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("02"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("03"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("04"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("05"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("06"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("07"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("08"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("09"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("10"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("11"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
		{
			name: monthDeterminer("12"),
			"Walk-in": 0,
			"Pre-registered": 0,
		},
	]);

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

	const fetchYears = async () => {
		await AxiosInstance.get("/stats/getYears").then((res: any) => {
			const months = res.data._months
				.sort((a: string, b: string) => parseInt(a) - parseInt(b))
				.map((month: string) => monthDeterminer(month));
			const years = res.data._years
				.sort((a: string, b: string) => parseInt(a) - parseInt(b))
				.map((years: string) => ({ value: years, label: years }));

			setMonths(months);
			setYears(years);
		});
	};

	const fetchTotal = async () => {
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
	};

	const fetchLocations = async (startDate?: string, endDate?: string) => {
		await AxiosInstance.post("/stats/location", {
			startDate: startDate ? startDate : undefined,
			endDate: endDate ? endDate : undefined,
		})
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
	};

	const fetchGraph = async (month?: string, year?: string) => {
		await AxiosInstance.post("/stats/graph", {
			month: month ? month : undefined,
			year: year ? year : undefined,
		})
			.then((res: any) => {
				if (res.data.data.length === 0) throw new Error("No data found");

				const graphData: WalkInVsRegisteredProps[] = res.data.data.map(
					(data: any) => {
						if (data.visitor_types.length === 1) {
							if (data.visitor_types[0].visitor_type === "Walk-In") {
								return {
									name: monthDeterminer(data._id),
									"Walk-in": data.visitor_types[0].count,
									"Pre-registered": 0,
								};
							}

							return {
								name: monthDeterminer(data._id),
								"Walk-in": 0,
								"Pre-registered": data.visitor_types[0].count,
							};
						} else if (data.visitor_types.length === 2) {
							if (data.visitor_types[0].visitor_type === "Walk-In") {
								return {
									name: monthDeterminer(data._id),
									"Walk-in": data.visitor_types[0].count,
									"Pre-registered": data.visitor_types[1].count,
								};
							} else if (
								data.visitor_types[0].visitor_type === "Pre-Registered"
							) {
								return {
									name: monthDeterminer(data._id),
									"Walk-in": data.visitor_types[1].count,
									"Pre-registered": data.visitor_types[0].count,
								};
							}
						}

						return {
							name: monthDeterminer(data._id).label,
							"Walk-in": 0,
							"Pre-registered": 0,
						};
					},
				);

				setData(
					graphData.sort(
						(a: WalkInVsRegisteredProps, b: WalkInVsRegisteredProps) =>
							parseInt(a.name.value) - parseInt(b.name.value),
					),
				);
			})
			.catch((err) => {
				if (err && err.response) {
					const message = err.response.data.error;
					error(message);
				}
			});
	};

	useEffect(() => {
		fetchYears();
		fetchTotal();
		fetchLocations();
		fetchGraph();
	}, []);

	const getDaysInMonth = async (month: string, year: string) => {
		return new Array(31)
			.fill("")
			.map((v, i) => new Date(parseInt(year), parseInt(month) - 1, i + 1))
			.filter((v) => v.getMonth() === parseInt(month) - 1)
			.map((v) => ({
				day: v.getDate().toString(),
				walkin: 0,
				preregistered: 0,
			}));
	};

	const onChangeMonth: CheckboxProps["onChange"] = async (e) => {
		setMonth(e.target.checked);

		if (e.target.checked === false) {
			setLoading(true);
			await fetchGraph(undefined, selectedYear);
			setLoading(false);
		}
	};

	const onChangeYear: CheckboxProps["onChange"] = async (e) => {
		setYear(e.target.checked);

		if (e.target.checked === false) {
			setLoading(true);
			await fetchGraph(selectedMonth, undefined);
			setLoading(false);
		}
	};

	const handleChangeMonth = async (value: string) => {
		console.log(`selected ${value}`);
		setSelectedMonth(value);

		console.log(
			getDaysInMonth(
				value,
				selectedYear !== undefined && selectedYear
					? selectedYear
					: new Date().getFullYear().toString(),
			),
		);

		const allDays = await getDaysInMonth(
			value,
			selectedYear !== undefined && selectedYear
				? selectedYear
				: new Date().getFullYear().toString(),
		);

		await AxiosInstance.post("/stats/getDays", {
			month: parseInt(value),
		}).then((res: any) => {
			const days = allDays.map((d: any) => {
				const day = res.data.grouped.find((day: any) => {
					return d.day.padStart(2, "0") === day.day;
				});

				if (day) {
					return {
						day: day.day,
						walkin: day.walkin,
						preregistered: day.preregistered,
					};
				}

				return {
					day: d.day.padStart(2, "0"),
					walkin: 0,
					preregistered: 0,
				};
			});

			setDaysOfMonth(days);
		});

		setLoading(true);
		await fetchGraph(value);
		setLoading(false);
	};

	const handleChangeYear = async (value: string) => {
		console.log(`selected ${value}`);
		setSelectedYear(value);

		setLoading(true);
		await fetchGraph(value);
		setLoading(false);
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
										calculation: `${visitorStatSummary.walkInCount ? Math.round(calculatePercentage(visitorStatSummary.walkInCount, visitorStatSummary.total)) : 0}%`,
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
										calculation: `${visitorStatSummary.preRegCount ? Math.round(calculatePercentage(visitorStatSummary.preRegCount, visitorStatSummary.total)) : 0}%`,
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
									input: mostCommonReason.when
										? formatDateString(mostCommonReason.when)
										: "",
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
						{loading ? (
							<div className="flex items-center justify-center">
								<LoadingOutlined className="text-[128px] text-primary-500" />
							</div>
						) : (
							<ResponsiveContainer aspect={2}>
								{daysOfMonth && daysOfMonth.length > 0 ? (
									<LineChart
										data={daysOfMonth}
										margin={{
											top: 5,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="day" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="walkin" stroke="#E88B23" />
										<Line
											type="monotone"
											dataKey="preregistered"
											stroke="#82ca9d"
										/>
									</LineChart>
								) : (
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
										<XAxis dataKey="name.label" />
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
								)}
							</ResponsiveContainer>
						)}
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
							<>
								{months && months.length > 1 ? (
									<Select
										options={months}
										label="Month"
										placeholder="Select Month"
										handleChange={handleChangeMonth}
									/>
								) : (
									<span className="text-xl font-semibold text-primary-500">
										{months ? months[0].label : "None"}
									</span>
								)}
							</>
						)}
						{year && (
							<>
								{years && years.length > 1 ? (
									<Select
										options={years}
										label="Year"
										placeholder="Select Year"
										handleChange={handleChangeYear}
									/>
								) : (
									<span className="text-xl font-semibold text-primary-500">
										{years ? years[0].label : "None"}
									</span>
								)}
							</>
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
