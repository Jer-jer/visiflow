import React from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";
import { Tabs, Button, Input, Image, Select } from "antd";
import DateTimePicker from "../../../components/datetime-picker";
import Label from "../../../components/fields/input/label";

//Assets
import TheRock from "../../../assets/the_rock.jpg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

const whatOptions = [
	{ label: "Meeting", value: "Meeting" },
	{ label: "Interview", value: "Interview" },
	{ label: "School Activity", value: "School Activity" },
	{ label: "Intramurals", value: "Intramurals" },
	{ label: "Investigate", value: "Investigate" },
	{ label: "Relatives", value: "Relatives" },
	{ label: "Inquiries", value: "Inquiries" },
	{ label: "Others", value: "Others" },
];

const whoOptions = [
	{ label: "Janusz", value: "Janusz" },
	{ label: "Omamalin", value: "Omamalin" },
	{ label: "Todd", value: "Todd" },
	{ label: "Machacon", value: "Machacon" },
	{ label: "Neil", value: "Neil" },
	{ label: "Collado", value: "Collado" },
	{ label: "Allan", value: "Allan" },
	{ label: "Bargamento", value: "Bargamento" },
	{ label: "Atty. Flores", value: "Atty. Flores" },
];

const whereOptions = [
	{ label: "Guard House", value: "Guard House" },
	{ label: "HR", value: "HR" },
	{ label: "Lobby", value: "Lobby" },
	{ label: "Office 1", value: "Office 1" },
	{ label: "Office 2", value: "Office 2" },
	{ label: "Department 1", value: "Department 1" },
	{ label: "Department 2", value: "Department 2" },
];

export default function CaptureLayout() {
	// const [items, setItems] = useState<TabItems[]>([]);

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[380px] flex-auto md:w-[761px]">
				<OuterContainer header="VISITOR FORM">
					<InnerContainer>
						<div className="mb-[35px] ml-[20px] mr-[25px] flex h-fit flex-col items-center justify-center gap-[30px] lg:flex-row lg:gap-[15px]">
							<div className="flex flex-col items-center justify-center gap-[15px]">
								<div className="relative h-[245px] w-[330px] md:h-[265px] md:w-[350px]">
									<Image
										width="100%"
										height="100%"
										//src={RyanReynolds}
									/>
									<Button
										type="primary"
										className="absolute ml-[-240px] mt-[200px] h-[40px] w-[155px] !rounded-[10px] !bg-primary-500 text-xs shadow-lg md:ml-[-260px] md:mt-[210px] md:h-[46px] md:w-[175px] md:text-lg"
									>
										<b>SCAN ID</b>
									</Button>
								</div>
								<div className="relative h-[245px] w-[330px] md:h-[265px] md:w-[350px]">
									<Image
										width="100%"
										height="100%"
										//src={RyanReynolds}
									/>
									<Button
										type="primary"
										className="absolute ml-[-240px] mt-[200px] h-[40px] w-[155px] !rounded-[10px] !bg-primary-500 text-xs shadow-lg md:ml-[-260px] md:mt-[210px] md:h-[46px] md:w-[175px] md:text-sm"
									>
										<b>
											SCAN PLATE NUMBER <br /> (OPTIONAL)
										</b>
									</Button>
								</div>
							</div>

							<div className="flex flex-col items-center justify-center gap-[50px]">
								<div className="flex flex-col gap-7 lg:flex-row lg:gap-[20px]">
									<div className="flex flex-col items-center gap-7">
										<div className="flex flex-col md:flex-row md:items-center">
											<h1>First Name</h1>
											<Input
												className="h-[35px] w-[300px] md:ml-[30px]"
												size="large"
											/>
											{/* <Label spanStyling="text-black font-medium text-[16px]">
											First Name
										</Label>
										<Input
												className="vm-placeholder h-[38px] rounded-[5px] focus:border-primary-500 focus:outline-none focus:ring-0"
												placeholder={"first name"}
										/> */}
										</div>

										<div className="flex flex-col md:flex-row md:items-center">
											<h1>Last Name</h1>
											<Input
												className="h-[35px] w-[300px] md:ml-[30px]"
												size="large"
											/>
										</div>

										<div className="flex flex-col md:flex-row md:items-center">
											<h1>Middle Name</h1>
											<Input
												className="h-[35px] w-[300px] md:ml-[15px]"
												size="large"
											/>
										</div>

										<div className="flex flex-col md:flex-row md:items-center">
											<h1>Plate Number (Optional)</h1>
											<Input
												className="h-[35px] w-[300px] md:ml-[16px] md:w-[221.5px]"
												size="large"
											/>
										</div>
									</div>
									<div className="flex flex-col items-center gap-7">
										<div className="flex flex-col md:flex-row md:items-center">
											<h1>Mobile Number</h1>
											<Input
												className="h-[35px] w-[300px] md:ml-3"
												size="large"
											/>
										</div>

										<div className="flex flex-col md:flex-row md:items-center">
											<h1 className="mr-20">City</h1>
											<Input
												className="h-[35px] w-[300px] md:ml-3.5"
												size="large"
											/>
										</div>

										<div className="flex flex-col md:flex-row md:items-center">
											<h1 className="mr-10">Barangay</h1>
											<Input
												className="h-[35px] w-[300px] md:ml-3.5"
												size="large"
											/>
										</div>
									</div>
								</div>

								<div className="flex flex-col">
									<div className="flex gap-[41px]">
										<div className="flex flex-col gap-5 lg:gap-7">
											<span>Purpose</span>
											<div className="flex flex-col gap-5 lg:flex-row">
												<div>
													<Select
														className="w-[315px] md:w-[415px]"
														size="large"
														placement="bottomLeft"
														mode="multiple"
														allowClear
														showSearch
														placeholder="What"
														listHeight={150}
														options={whatOptions}
													></Select>
												</div>

												<div>
													<Select
														className="w-[315px] md:w-[415px]"
														size="large"
														placement="bottomLeft"
														mode="multiple"
														allowClear
														showSearch
														placeholder="Who"
														listHeight={150}
														options={whoOptions}
													></Select>
												</div>
											</div>
											<div className="flex flex-col gap-5 lg:flex-row">
												<div>
													<Select
														className="w-[315px] md:w-[415px]"
														size="large"
														placement="bottomLeft"
														mode="multiple"
														allowClear
														showSearch
														placeholder="Where"
														listHeight={150}
														options={whereOptions}
													></Select>
												</div>

												<div>
													<DateTimePicker
														globalStyling="w-[315px] md:w-[415px]"
														rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit]"
														size="large"
														visitorMngmnt
													/>
												</div>
											</div>
											<div className="flex justify-end gap-10">
												<Button
													type="primary"
													className="mt-5 w-[100px] !rounded-[10px] !bg-primary-500"
												>
													SUBMIT
												</Button>
												<Button
													type="primary"
													className="mt-5 w-[100px] !rounded-[10px] !bg-red-500"
												>
													CANCEL
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</InnerContainer>
				</OuterContainer>
			</div>
		</div>
	);
}
