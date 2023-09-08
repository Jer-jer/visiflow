import React from "react";
import "./App.scss";

//Components
import Button from "./components/button/button";
import Input from "./components/fields/input/input";
import Alert from "./components/alert/alert";
import Checkbox from "./components/fields/checkbox/checkbox";
import Dropdown from "./components/dropdown/dropdown";

function App() {
	return (
		// Component  List
		<div>
			<div className="m-8 flex max-w-fit items-center justify-center gap-4 align-middle">
				<div>
					<Button
						color="btn-primary"
						buttonStyling="btn rounded-3xl w-28 text-base normal-case font-medium"
						label="Log in"
					/>
				</div>
				<div>
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
				<div className="w-96">
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
				<div>
					<Checkbox
						globalStyling="form-control"
						labelStyling="label cursor-pointer"
						inputStyling="checkbox-primary checkbox focus:outline-none focus:ring-0"
						spanStyling="label-text pl-3"
						label="I have agreed to the terms and conditions"
					/>
				</div>
				<div>
					<Dropdown />
				</div>
			</div>
		</div>
	);
}

export default App;
