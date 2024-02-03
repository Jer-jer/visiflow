import React from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import StatisticsSummaryContent from "../../../components/stats-smmry-ctnt";
import PendingAppointments from "../../../components/pending-appointments";
import { Tabs, Button, Input, Image, Select,  } from "antd";
import DateTimePicker from "../../../components/datetime-picker";

//Assets
import TheRock from "../../../assets/the_rock.jpg";
import RyanReynolds from "../../../assets/ryan_reynolds.jpg";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

const whatOptions = [
    {label: "Meeting", value: "Meeting"},
    {label: "Interview", value: "Interview"},
    {label: "School Activity", value: "School Activity"},
    {label: "Intramurals", value: "Intramurals"},
    {label: "Investigate", value: "Investigate"},
    {label: "Relatives", value: "Relatives"},
    {label: "Inquiries", value: "Inquiries"},
    {label: "Others", value: "Others"},
]

const whoOptions = [
    {label: "Janusz", value: "Janusz"},
    {label: "Omamalin", value: "Omamalin"},
    {label: "Todd", value: "Todd"},
    {label: "Machacon", value: "Machacon"},
    {label: "Neil", value: "Neil"},
    {label: "Collado", value: "Collado"},
    {label: "Allan", value: "Allan"},
    {label: "Bargamento", value: "Bargamento"},
    {label: "Atty. Flores", value: "Atty. Flores"},
]

const whereOptions = [
    {label: "Guard House", value: "Guard House"},
    {label: "HR", value: "HR"},
    {label: "Lobby", value: "Lobby"},
    {label: "Office 1", value: "Office 1"},
    {label: "Office 2", value: "Office 2"},
    {label: "Department 1", value: "Department 1"},
    {label: "Department 2", value: "Department 2"},
]

const whyOptions = [
    {label: "School related", value: "School related"},
    {label: "Personal reasons", value: "Personal reasons"},
    {label: "Work related", value: "Work related"},
    {label: "Family related", value: "Family related"},
    {label: "Friend related", value: "Friend related"},
    {label: "Inquiry reasons", value: "Inquiry reasons"},
    {label: "Others", value: "Others"},
]

export default function CaptureLayout() {
    // const [items, setItems] = useState<TabItems[]>([]);

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
			<div className="w-[761px] flex-auto">
				<OuterContainer header="VISITOR FORM">
					<InnerContainer>
                    <div className="mb-[35px] ml-2 flex flex-col justify-center items-center gap-5 mr-[25px] mt-[-30px] h-fit">
		
                        <div className="flex justify-center items-center gap-10">
                            <div className="flex flex-col gap-7">
                                <div className="flex items-center">
                                    <h1>First Name</h1>
                                    <Input
					                    className="w-[300px] h-[35px] ml-8 mr-10"
					                    size="large"
				                    />

                                    <h1>Mobile Number</h1>
                                    <Input
					                    className="w-[300px] h-[35px] ml-3"
					                    size="large"
				                    />
                                </div>
                                <div className="flex items-center">
                                    <h1>Last Name</h1>
                                    <Input
					                    className="w-[300px] h-[35px] ml-8 mr-10"
					                    size="large"
				                    />

                                    <h1 className="mr-20">City</h1>
                                    <Input
					                    className="w-[300px] h-[35px] ml-3.5"
					                    size="large"
				                    />
                                </div>
                                <div className="flex items-center">
                                    <h1>Middle Name</h1>
                                    <Input
					                    className="w-[300px] h-[35px] ml-3.5 mr-10"
					                    size="large"
				                    />

                                    <h1 className="mr-10">Barangay</h1>
                                    <Input
					                    className="w-[300px] h-[35px] ml-3.5"
					                    size="large"
				                    />
                                </div>
                                <div className="flex items-center">
                                    <h1>Plate Number (Optional)</h1>
                                    <Input
					                    className="w-[221.5px] h-[35px] ml-3.5"
					                    size="large"
				                    />
                                </div>
                            </div>
                            <div className="mt-[60px]">
                                <Image
    						        width={370}
                                    height={280}
    						        src={RyanReynolds}
  						        />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex gap-[41px]">
                                <div className="flex flex-col gap-7">
                                    <span>Purpose</span>
                                    <div className="flex gap-5">
                                        <div>
                                            <Select
                                                className="w-[425px]"
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
                                                className="w-[425px]"
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
                                    <div className="flex gap-5">
                                        <div>
                                            <Select
                                                className="w-[425px]"
                                                size="large"
                                                placement="bottomLeft"
                                                mode="multiple"
                                                allowClear
                                                showSearch
                                                placeholder="Why"
                                                listHeight={150}
                                                options={whyOptions}
                                            ></Select>
                                        </div>

                                        <div>
                                            <Select
                                                className="w-[425px]"
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
                                    </div>
                                    <div className="flex">
                                        <DateTimePicker
                                            globalStyling="w-[460px]"
                                            rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit]"
                                            size="large"
                                            visitorMngmnt
                                        />
                                    </div>
                                    <div className="flex">
                                        <Button
                                            type="primary"
                                            className="w-[100px] !rounded-[10px] !bg-primary-500 mt-3"
                                        >
                                            SUBMIT
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Image
                                        width={370}
                                        height={280}
                                        src={RyanReynolds}
                                    />
                                </div>
                            </div>
                        </div>
						
					</div>
                    </InnerContainer>
                </OuterContainer>
            </div>
        </div>
    )
}