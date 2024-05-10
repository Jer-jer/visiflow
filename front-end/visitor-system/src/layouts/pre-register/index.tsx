import React, { useState } from "react";

// Components
import { Button } from "antd";
import NewVisitor from "../../components/new-visitor";
import RecurringVisitor from "../../components/recurring-visitor";

// Styles
import "./styles.scss";

export default function PreRegister() {
	const [isNew, setIsNew] = useState(false);
	const [isRecurring, setIsRecurring] = useState(false);

	const isNewOrRecurring = (newVisitor: boolean, recurringVisitor: boolean) => {
		setIsNew(newVisitor);
		setIsRecurring(recurringVisitor);
	};

	return (
		<div className="max-h-min">
			{!isNew && !isRecurring && (
				<div className="flex flex-col items-center justify-start w-full gap-y-12 pt-20">
					<span className="text-3xl font-semibold text-center uppercase">Are you new here?</span>
					<div className="flex flex-row gap-x-8">
						<div className="w-[30vw] h-[40vh] overflow-hidden rounded-lg hover:rounded-lg">
							<Button
								className="new-photo w-[30vw] h-[40vh] text-3xl uppercase flex items-center justify-center "
								onClick={(e) => isNewOrRecurring(true, false)}
							>
								<span className="z-50 relative text-white">New Visitor</span>
							</Button>
						</div>
						<div className="w-[30vw] h-[40vh] overflow-hidden rounded-lg hover:rounded-lg">
							<Button
								className="recurring-photo w-[30vw] h-[40vh] text-3xl uppercase flex items-center justify-center "
								onClick={(e) => isNewOrRecurring(false, true)}
							>
								<span className="z-50 relative text-white">Recurring Visitor</span>
							</Button>
						</div>
					</div>
				</div>
			)}
			{isRecurring && <RecurringVisitor />}
			{isNew && <NewVisitor />}
		</div>
	);
}
