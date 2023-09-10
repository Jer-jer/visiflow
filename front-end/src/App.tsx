import React from "react";

//Components
import Button from "./components/button/button";
import Input from "./components/fields/input/input";
import Alert from "./components/alert/alert";
import Checkbox from "./components/fields/checkbox/checkbox";
import DateTimePicker from "./components/datetimepicker/datetimepicker";
import SearchInput from "./components/fields/input/searchInput";
import Badge from "./components/badge/badge";
import Toast from "./components/toast/toast";

//Styles
import "./App.scss";

function App() {
	return (
		<div>
			{/* // Component List */}
			<div className="m-8 flex max-w-fit flex-wrap items-center justify-center align-middle">
				<div className="flex-item flex justify-center">
					<Button
						globalCustomStyling=""
						color="btn-primary"
						buttonStyling="btn rounded-3xl w-28 text-base normal-case font-medium"
						label="Log in"
					/>
				</div>
				<div className="flex-item flex justify-center">
					<Input
						inputType="text"
						formControlStyling="form-control w-full max-w-xs"
						leftLabelStyling="w-2/5 pr-3"
						leftLabel="No. of Visitors"
						topLeftLabel="&nbsp;"
						globalCustomStyling="flex items-center justify-center align-middle w-96"
						inputStyling="input bg-base-100 border-0 border-b-2 rounded-none border-neutral w-full max-w-xs focus:outline-none focus:ring-0 focus:border-primary"
						bottomLeftLabel="&nbsp;"
					/>
				</div>
				<div className="flex-item flex w-96 justify-center">
					<Alert
						globalCustomStyling="flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
						statusStyling="flex w-12 items-center justify-center"
						statusColor="bg-primary"
						spanStyling="font-semibold"
						statusTextHeaderColor="text-primary"
						descStyling="text-sm text-gray-600"
						header="Information Box"
						desc="Message successfully sent to Visitor via Email"
					/>
				</div>
				<div className="flex-item flex justify-center">
					<Checkbox
						globalStyling="form-control"
						labelStyling="label cursor-pointer"
						inputStyling="checkbox-primary checkbox focus:outline-none focus:ring-0"
						spanStyling="label-text pl-3"
						label="I have agreed to the terms and conditions"
					/>
				</div>
				<div className="flex-item flex justify-center">
					<DateTimePicker />
				</div>
				<div className="flex-item flex justify-center">
					<SearchInput globalStyling="mx-auto w-96" placeHolder="Search" />
				</div>
				<div className="flex-item flex justify-center gap-2">
					<Badge status="approved" textSize="text-base" />
					<Badge status="in-progress" textSize="text-base" />
					<Badge status="declined" textSize="text-base" />
				</div>
				<div className="flex-item flex justify-center gap-2">
					<Badge status="approved" textSize="text-base" />
					<Badge status="in-progress" textSize="text-base" />
					<Badge status="declined" textSize="text-base" />
				</div>
			</div>
			<div className="flex-item flex justify-center gap-2">
				<Toast status="info" toastInfo="Information Notification" />
				{/* <Toast status="success" toastInfo="Successful Notification" />
					<Toast status="error" toastInfo="Notification Error" /> */}
			</div>
		</div>
	);
}

export default App;
